<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	
	export let title: string;
	export let description: string = '';
	export let icon: any; // Lucide icon component
	export let onClick: () => void = () => {};
	export let ariaLabel: string = title;
	export let color: 'primary' | 'secondary' | 'neutral' = 'primary';
</script>

<button 
	class="action-tile" 
	on:click={() => onClick()}
	aria-label={ariaLabel}
>
	<div class="tile-icon {color}">
		<svelte:component this={icon} size={28} strokeWidth={1.5} />
	</div>
	<div class="tile-content">
		<h3>{title}</h3>
		{#if description}
			<p>{description}</p>
		{/if}
	</div>
	<div class="tile-arrow">
		<ArrowRight size={20} strokeWidth={1.5} />
	</div>
</button>

<style>
	.action-tile {
		display: flex;
		align-items: center;
		background-color: var(--color-card-bg);
		border-radius: 12px;
		padding: 1.25rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		border: none;
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
		text-align: left;
		width: 100%;
	}
	
	.action-tile:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}
	
	.tile-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		margin-right: 1rem;
	}
	
	.tile-icon.primary {
		background: linear-gradient(135deg, rgba(77, 68, 179, 0.1), rgba(191, 70, 154, 0.1));
		color: var(--color-primary);
	}
	
	.tile-icon.secondary {
		background: linear-gradient(135deg, rgba(191, 70, 154, 0.1), rgba(77, 68, 179, 0.1));
		color: var(--color-secondary);
	}
	
	.tile-icon.neutral {
		background: rgba(100, 100, 100, 0.1);
		color: var(--color-text-secondary);
	}
	
	.tile-content {
		flex: 1;
	}
	
	.tile-content h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-text);
	}
	
	.tile-content p {
		margin: 0;
		font-size: 0.85rem;
		color: var(--color-text-secondary);
	}
	
	.tile-arrow {
		color: var(--color-primary);
		opacity: 0.7;
		transition: opacity 0.2s, transform 0.2s;
	}
	
	.action-tile:hover .tile-arrow {
		opacity: 1;
		transform: translateX(2px);
	}
</style>
