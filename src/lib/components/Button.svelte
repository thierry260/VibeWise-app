<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let disabled: boolean = false;
	export let fullWidth: boolean = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let icon: any = null; // Optional Lucide icon component
</script>

<button
	{type}
	class="btn btn-{variant} btn-{size} {fullWidth ? 'full-width' : ''}"
	{disabled}
	on:click
>
	{#if icon}
		<span class="btn-icon">
			<svelte:component this={icon} size={size === 'sm' ? 16 : size === 'md' ? 18 : 20} strokeWidth={1.5} />
		</span>
	{/if}
	<slot />
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		outline: none;
		gap: 0.5rem;
	}
	
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.btn:active:not(:disabled) {
		transform: translateY(1px);
	}
	
	/* Variants */
	.btn-primary {
		background: linear-gradient(135deg, var(--color-primary, #4D44B3), var(--color-secondary, #BF469A));
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	
	.btn-primary:hover:not(:disabled) {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
		transform: translateY(-1px);
	}
	
	.btn-secondary {
		background-color: var(--color-bg-elevated);
		color: var(--color-text);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
	
	.btn-secondary:hover:not(:disabled) {
		background-color: var(--color-bg-hover);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	}
	
	.btn-outline {
		background-color: transparent;
		color: var(--color-primary);
		border: 1px solid var(--color-primary);
	}
	
	.btn-outline:hover:not(:disabled) {
		background-color: rgba(77, 68, 179, 0.05);
	}
	
	/* Sizes */
	.btn-sm {
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
	}
	
	.btn-md {
		padding: 0.75rem 1.25rem;
		font-size: 1rem;
	}
	
	.btn-lg {
		padding: 1rem 1.5rem;
		font-size: 1.125rem;
	}
	
	.full-width {
		width: 100%;
	}
	
	.btn-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
