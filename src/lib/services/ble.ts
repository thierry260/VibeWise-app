import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

// Check if we're running in Capacitor environment
const isCapacitorApp = (): boolean => {
  return browser && typeof (window as any).Capacitor !== 'undefined';
};

// Log environment info for debugging
if (browser) {
  console.log('Environment check:', {
    isCapacitor: isCapacitorApp(),
    hasWebBluetooth: typeof navigator !== 'undefined' && 'bluetooth' in navigator
  });
}

// BLE connection status store
export const bleConnectionStatus = writable({
  connected: false,
  deviceName: '',
  deviceId: '',
  error: null as Error | null,
  scanning: false
});

// HRV data store
export const hrvData = writable({
  heartRate: 0,
  rmssd: 0,
  vibeScore: 0,
  rrIntervals: [] as number[],
  chartData: [] as Array<{
    timestamp: string;
    hr: number;
    rmssd: number;
    vibe: number;
  }>
});

// Session timer store
export const sessionTimer = writable({
  startTime: 0,
  currentTime: 0,
  elapsedSeconds: 0,
  isRunning: false
});

// Check if Bluetooth is supported (either Web Bluetooth or Capacitor BLE)
export const isBluetoothSupported = (): boolean => {
  // Check for Capacitor BLE plugin
  if (isCapacitorApp()) {
    return true; // Capacitor apps should have BLE support through the plugin
  }
  
  // Fall back to Web Bluetooth API check
  return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
};

// Start scanning for BLE devices
export const startScan = async (): Promise<{ success: boolean; error?: Error }> => {
  try {
    // Check if Bluetooth is supported
    if (!isBluetoothSupported()) {
      throw new Error('Bluetooth is not supported on this device');
    }

    bleConnectionStatus.update(state => ({ ...state, scanning: true, error: null }));
    console.log('Starting BLE scan...');

    // Different implementation based on environment
    if (isCapacitorApp()) {
      console.log('Using Capacitor BLE implementation');
      // Capacitor implementation
      try {
        // Dynamically import Capacitor plugins to avoid issues in web environments
        const { BleClient } = await import('@capacitor-community/bluetooth-le');
        
        // Initialize BLE
        console.log('Initializing BLE client...');
        await BleClient.initialize();
        
        // Check if Bluetooth is enabled
        const isEnabled = await BleClient.isEnabled();
        console.log('Bluetooth enabled:', isEnabled);
        
        if (!isEnabled) {
          // Try to enable Bluetooth
          try {
            await BleClient.enable();
            console.log('Bluetooth enabled successfully');
          } catch (enableError) {
            console.error('Failed to enable Bluetooth:', enableError);
            throw new Error('Please enable Bluetooth to connect to your device');
          }
        }
        
        // Show device selection dialog
        console.log('Requesting device...');
        const device = await BleClient.requestDevice({
          services: ['0000180d-0000-1000-8000-00805f9b34fb'], // Heart Rate Service UUID
          namePrefix: 'Polar'
        });
        
        console.log('Device selected:', device);
        
        // Connect to the selected device
        await connectToCapacitorDevice(device.deviceId, device.name || 'Polar Device');
        
        return { success: true };
      } catch (capacitorError) {
        console.error('Capacitor BLE error:', capacitorError);
        throw capacitorError;
      }
    } else {
      console.log('Using Web Bluetooth API implementation');
      // Web Bluetooth API implementation
      if (!('bluetooth' in navigator)) {
        throw new Error('Web Bluetooth is not supported in this browser');
      }
      
      // Request device with heart rate service
      console.log('Requesting device...');
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['heart_rate'] },
          { namePrefix: 'Polar' }
        ],
        optionalServices: ['heart_rate']
      });

      console.log('Device selected:', device.name);
      bleConnectionStatus.update(state => ({
        ...state,
        deviceName: device.name || 'Unknown Device',
        deviceId: device.id
      }));

      // Connect to the device
      console.log('Connecting to GATT server...');
      const server = await device.gatt?.connect();
      if (!server) {
        throw new Error('Failed to connect to GATT server');
      }

      // Get the Heart Rate service
      console.log('Getting Heart Rate service...');
      const service = await server.getPrimaryService('heart_rate');
      
      // Get the Heart Rate Measurement characteristic
      console.log('Getting Heart Rate Measurement characteristic...');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      
      // Start notifications
      console.log('Starting notifications...');
      await characteristic.startNotifications();
      
      // Listen for notifications
      console.log('Adding event listener for heart rate measurements...');
      characteristic.addEventListener('characteristicvaluechanged', handleHeartRateMeasurement);
      
      // Update connection status
      bleConnectionStatus.update(state => ({
        ...state,
        connected: true,
        scanning: false
      }));

      // Set up disconnect listener
      device.addEventListener('gattserverdisconnected', () => {
        console.log('Device disconnected');
        bleConnectionStatus.update(state => ({
          ...state,
          connected: false,
          error: new Error('Device disconnected')
        }));
        
        // Stop the session timer if it's running
        const timerState = get(sessionTimer);
        if (timerState.isRunning) {
          stopSessionTimer();
        }
      });

      return { success: true };
    }
  } catch (error) {
    console.error('BLE scan error:', error);
    bleConnectionStatus.update(state => ({
      ...state,
      scanning: false,
      error: error instanceof Error ? error : new Error('Unknown BLE error')
    }));
    return { success: false, error: error instanceof Error ? error : new Error('Unknown BLE error') };
  }
};

// Connect to a device using Capacitor BLE
async function connectToCapacitorDevice(deviceId: string, deviceName: string) {
  try {
    console.log('Connecting to Capacitor device:', deviceId, deviceName);
    // Dynamically import Capacitor plugins
    const { BleClient } = await import('@capacitor-community/bluetooth-le');
    
    // Connect to the device
    console.log('Establishing connection...');
    await BleClient.connect(deviceId);
    console.log('Connected successfully');
    
    // Update connection status
    bleConnectionStatus.update(state => ({
      ...state,
      deviceName: deviceName,
      deviceId: deviceId,
      connected: true,
      scanning: false
    }));
    
    // Get the Heart Rate service (full 128-bit UUIDs required for Capacitor)
    const HEART_RATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
    const HEART_RATE_MEASUREMENT_CHARACTERISTIC = '00002a37-0000-1000-8000-00805f9b34fb';
    
    // Start notifications for heart rate
    console.log('Starting notifications for heart rate...');
    await BleClient.startNotifications(
      deviceId,
      HEART_RATE_SERVICE,
      HEART_RATE_MEASUREMENT_CHARACTERISTIC,
      (data) => {
        // Process the heart rate data
        const dataView = new DataView(data.buffer);
        handleCapacitorHeartRateData(dataView);
      }
    );
    console.log('Notifications started successfully');
    
    // Start session timer
    startSessionTimer();
    
  } catch (error) {
    console.error('Error connecting to Capacitor device:', error);
    bleConnectionStatus.update(state => ({
      ...state,
      connected: false,
      scanning: false,
      error: error instanceof Error ? error : new Error('Failed to connect to device')
    }));
  }
}

// Handle heart rate data from Capacitor
function handleCapacitorHeartRateData(dataView: DataView) {
  // Extract heart rate using the same logic as Web Bluetooth
  const flags = dataView.getUint8(0);
  const rate16Bits = flags & 0x1;
  const heartRate = rate16Bits ? dataView.getUint16(1, true) : dataView.getUint8(1);

  // Extract RR intervals if present (for HRV calculation)
  const rrIntervals: number[] = [];
  if (flags & 0x10) {
    const offset = rate16Bits ? 3 : 2;
    for (let i = offset; i < dataView.byteLength; i += 2) {
      // RR intervals are in 1/1024 second format
      const rrInterval = dataView.getUint16(i, true) / 1024 * 1000; // Convert to ms
      rrIntervals.push(rrInterval);
    }
  }

  // Update HRV data using the same function
  updateHRVData(heartRate, rrIntervals);
};

// Handle heart rate measurement data
const handleHeartRateMeasurement = (event: Event) => {
  const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
  if (!value) return;

  // Extract heart rate
  const flags = value.getUint8(0);
  const rate16Bits = flags & 0x1;
  const heartRate = rate16Bits ? value.getUint16(1, true) : value.getUint8(1);

  // Extract RR intervals if present (for HRV calculation)
  const rrIntervals: number[] = [];
  if (flags & 0x10) {
    const offset = rate16Bits ? 3 : 2;
    for (let i = offset; i < value.byteLength; i += 2) {
      // RR intervals are in 1/1024 second format
      const rrInterval = value.getUint16(i, true) / 1024 * 1000; // Convert to ms
      rrIntervals.push(rrInterval);
    }
  }

  // Update HRV data
  updateHRVData(heartRate, rrIntervals);
};

// Process HRV data
const updateHRVData = (heartRate: number, newRRIntervals: number[]) => {
  hrvData.update(state => {
    // Add new RR intervals to the array
    const rrIntervals = [...state.rrIntervals, ...newRRIntervals];
    
    // Keep only the last 64 intervals for RMSSD calculation (about 1 minute of data)
    const recentIntervals = rrIntervals.slice(-64);
    
    // Calculate RMSSD (Root Mean Square of Successive Differences)
    let rmssd = 0;
    if (recentIntervals.length > 1) {
      let sumSquaredDiff = 0;
      for (let i = 1; i < recentIntervals.length; i++) {
        const diff = recentIntervals[i] - recentIntervals[i - 1];
        sumSquaredDiff += diff * diff;
      }
      rmssd = Math.sqrt(sumSquaredDiff / (recentIntervals.length - 1));
    }
    
    // Calculate Vibe Score (simplified version)
    // In a real implementation, this would be more sophisticated
    // Normalize RMSSD to a 0-100 scale
    // Typical RMSSD values range from 10-100, with higher being better
    const normalizedRMSSD = Math.min(100, Math.max(0, rmssd / 100 * 100));
    
    // For now, our vibe score is just the normalized RMSSD
    const vibeScore = Math.round(normalizedRMSSD);
    
    // Add data point to chart data
    const timestamp = new Date().toISOString();
    const chartData = [
      ...state.chartData,
      { timestamp, hr: heartRate, rmssd, vibe: vibeScore }
    ];
    
    // Keep only the last 300 data points (5 minutes at 1Hz)
    const trimmedChartData = chartData.slice(-300);
    
    return {
      heartRate,
      rmssd,
      vibeScore,
      rrIntervals: recentIntervals,
      chartData: trimmedChartData
    };
  });
};

// Disconnect from BLE device
export const disconnect = async (): Promise<{ success: boolean; error?: Error }> => {
  try {
    const deviceId = get(bleConnectionStatus).deviceId;
    
    if (deviceId && isCapacitorApp()) {
      try {
        // Disconnect using Capacitor BLE
        const { BleClient } = await import('@capacitor-community/bluetooth-le');
        await BleClient.disconnect(deviceId);
      } catch (capacitorError) {
        console.error('Error disconnecting from Capacitor device:', capacitorError);
      }
    }
    
    // For Web Bluetooth, we don't have a direct way to disconnect
    // The device will disconnect when it goes out of range or the page is closed
    
    // Reset the stores
    bleConnectionStatus.set({
      connected: false,
      deviceName: '',
      deviceId: '',
      error: null,
      scanning: false
    });
    
    resetHRVData();
    stopSessionTimer();
    
    return { success: true };
  } catch (error) {
    console.error('BLE disconnect error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown BLE error') 
    };
  }
};

// Reset HRV data
export const resetHRVData = () => {
  hrvData.set({
    heartRate: 0,
    rmssd: 0,
    vibeScore: 0,
    rrIntervals: [],
    chartData: []
  });
};

// Start session timer
export const startSessionTimer = () => {
  const startTime = Date.now();
  sessionTimer.set({
    startTime,
    currentTime: startTime,
    elapsedSeconds: 0,
    isRunning: true
  });
  
  // Update timer every second
  const timerInterval = setInterval(() => {
    sessionTimer.update(state => {
      if (!state.isRunning) {
        clearInterval(timerInterval);
        return state;
      }
      
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - state.startTime) / 1000);
      
      return {
        ...state,
        currentTime,
        elapsedSeconds
      };
    });
  }, 1000);
};

// Stop session timer
export const stopSessionTimer = () => {
  sessionTimer.update(state => ({
    ...state,
    isRunning: false
  }));
};

// Get session summary
export const getSessionSummary = () => {
  const data = get(hrvData);
  const timer = get(sessionTimer);
  
  // Calculate averages
  const chartData = data.chartData;
  let totalHR = 0;
  let totalRMSSD = 0;
  let totalVibe = 0;
  
  chartData.forEach(point => {
    totalHR += point.hr;
    totalRMSSD += point.rmssd;
    totalVibe += point.vibe;
  });
  
  const avgHR = chartData.length ? Math.round(totalHR / chartData.length) : 0;
  const avgRMSSD = chartData.length ? Math.round(totalRMSSD / chartData.length * 10) / 10 : 0;
  const avgVibe = chartData.length ? Math.round(totalVibe / chartData.length) : 0;
  
  return {
    startTime: new Date(timer.startTime).toISOString(),
    endTime: new Date(timer.currentTime).toISOString(),
    durationSeconds: timer.elapsedSeconds,
    avgHR,
    avgRMSSD,
    avgVibe,
    chartData,
    rrIntervals: data.rrIntervals
  };
};
