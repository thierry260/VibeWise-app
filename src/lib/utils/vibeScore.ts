/**
 * VibeWise Score Calculation Utility
 * 
 * This utility calculates a user's Vibe Score (0-100) based on HRV data from the Polar H10.
 * The score represents a person's current state of inner calm, emotional openness, and biological balance.
 */

/**
 * Calculate the Vibe Score on a scale of 0-100
 * 
 * @param rmssd - Root Mean Square of Successive Differences (ms)
 * @param rrIntervals - Array of recent RR intervals (ms)
 * @param breathingRate - Current breathing rate (breaths per minute), if available
 * @returns Vibe Score from 0-100
 */
export function calculateVibeScore(
  rmssd: number,
  rrIntervals: number[],
  breathingRate?: number
): number {
  // Ensure we have enough data to calculate
  if (!rmssd || rrIntervals.length < 10) {
    return 0;
  }

  // 1. Normalize RMSSD (50% of score)
  const normalizedRMSSD = normalizeRMSSD(rmssd);
  
  // 2. Calculate breathing alignment score (30% of score)
  const breathingAlignmentScore = calculateBreathingAlignmentScore(rrIntervals, breathingRate);
  
  // 3. Calculate pattern smoothness score (20% of score)
  const patternSmoothnessScore = calculatePatternSmoothnessScore(rrIntervals);
  
  // Calculate final score
  const vibeScore = (
    normalizedRMSSD * 0.5 +
    breathingAlignmentScore * 0.3 +
    patternSmoothnessScore * 0.2
  ) * 100;
  
  // Ensure score is between 0-100
  return Math.min(Math.max(Math.round(vibeScore), 0), 100);
}

/**
 * Normalize RMSSD within expected healthy range (10-150ms)
 * 
 * @param rmssd - Root Mean Square of Successive Differences (ms)
 * @returns Normalized value between 0-1
 */
function normalizeRMSSD(rmssd: number): number {
  const min = 10;
  const max = 150;
  return Math.min(Math.max((rmssd - min) / (max - min), 0), 1);
}

/**
 * Calculate how well the HRV pattern follows a smooth rhythmic frequency
 * Optimal breathing is around 6 breaths per minute (10 seconds per breath cycle)
 * 
 * @param rrIntervals - Array of recent RR intervals (ms)
 * @param breathingRate - Current breathing rate (breaths per minute), if available
 * @returns Score between 0-1
 */
function calculateBreathingAlignmentScore(
  rrIntervals: number[],
  breathingRate?: number
): number {
  // If we have fewer than 20 RR intervals, return a lower score
  if (rrIntervals.length < 20) {
    return 0.3; // Default moderate score with insufficient data
  }
  
  // Convert RR intervals to instantaneous heart rate
  const heartRates = rrIntervals.map(rr => 60000 / rr);
  
  // If we know the actual breathing rate, use it; otherwise assume 6 BPM (optimal)
  const breathsPerMinute = breathingRate || 6;
  const secondsPerBreathCycle = 60 / breathsPerMinute;
  
  // Calculate expected sine wave pattern for ideal breathing at the given rate
  const idealPattern = generateIdealBreathingPattern(heartRates.length, secondsPerBreathCycle);
  
  // Calculate correlation between actual heart rate pattern and ideal pattern
  const correlation = calculatePatternCorrelation(heartRates, idealPattern);
  
  // Scale correlation to 0-1 range (correlation ranges from -1 to 1)
  return (correlation + 1) / 2;
}

/**
 * Generate an ideal breathing pattern (sine wave) for comparison
 * 
 * @param length - Number of data points to generate
 * @param secondsPerCycle - Seconds per breath cycle
 * @returns Array of values representing ideal pattern
 */
function generateIdealBreathingPattern(length: number, secondsPerCycle: number): number[] {
  // Assume average RR interval is about 800ms (75 BPM)
  // So each data point represents roughly 800ms
  const pointsPerCycle = (secondsPerCycle * 1000) / 800;
  
  return Array(length).fill(0).map((_, i) => {
    // Generate sine wave with appropriate frequency
    return Math.sin((i / pointsPerCycle) * 2 * Math.PI);
  });
}

/**
 * Calculate correlation between two patterns
 * 
 * @param actual - Actual heart rate pattern
 * @param ideal - Ideal pattern
 * @returns Correlation coefficient (-1 to 1)
 */
function calculatePatternCorrelation(actual: number[], ideal: number[]): number {
  // Normalize both arrays
  const normalizedActual = normalizeArray(actual);
  const normalizedIdeal = normalizeArray(ideal);
  
  // Calculate correlation
  let sum = 0;
  const length = Math.min(normalizedActual.length, normalizedIdeal.length);
  
  for (let i = 0; i < length; i++) {
    sum += normalizedActual[i] * normalizedIdeal[i];
  }
  
  return sum / length;
}

/**
 * Normalize an array to have mean 0 and standard deviation 1
 * 
 * @param arr - Array to normalize
 * @returns Normalized array
 */
function normalizeArray(arr: number[]): number[] {
  // Calculate mean
  const mean = arr.reduce((sum, val) => sum + val, 0) / arr.length;
  
  // Calculate standard deviation
  const squaredDiffs = arr.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / arr.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize
  return stdDev === 0 
    ? arr.map(() => 0) 
    : arr.map(val => (val - mean) / stdDev);
}

/**
 * Calculate how stable and predictable recent HRV changes are
 * 
 * @param rrIntervals - Array of recent RR intervals (ms)
 * @returns Score between 0-1
 */
function calculatePatternSmoothnessScore(rrIntervals: number[]): number {
  if (rrIntervals.length < 10) {
    return 0.5; // Default moderate score with insufficient data
  }
  
  // Calculate successive differences
  const successiveDiffs = [];
  for (let i = 1; i < rrIntervals.length; i++) {
    successiveDiffs.push(Math.abs(rrIntervals[i] - rrIntervals[i - 1]));
  }
  
  // Calculate coefficient of variation (CV) of successive differences
  // Lower CV means more consistent/smooth pattern
  const mean = successiveDiffs.reduce((sum, val) => sum + val, 0) / successiveDiffs.length;
  
  if (mean === 0) return 1; // Perfect smoothness (unlikely in real data)
  
  const squaredDiffs = successiveDiffs.map(val => Math.pow(val - mean, 2));
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / successiveDiffs.length;
  const stdDev = Math.sqrt(variance);
  const cv = stdDev / mean;
  
  // Convert CV to score (0-1)
  // Lower CV = higher score, with diminishing returns
  // CV of 0.5 or less is considered very good
  return Math.min(Math.max(1 - (cv / 2), 0), 1);
}

/**
 * Get interpretation label based on Vibe Score
 * 
 * @param score - Vibe Score (0-100)
 * @returns Object with label and emoji
 */
export function getVibeScoreInterpretation(score: number): { label: string; emoji: string } {
  if (score >= 85) return { label: "You're glowing", emoji: "💫" };
  if (score >= 70) return { label: "Open and steady", emoji: "💜" };
  if (score >= 50) return { label: "Coming into sync", emoji: "🌱" };
  if (score >= 30) return { label: "Breathe and soften", emoji: "🫁" };
  return { label: "Pause. Feel. Breathe.", emoji: "🧘" };
}
