<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	export let prominent: boolean = false;
	export let className: string = '';
</script>

<div class="card {prominent ? 'prominent' : ''} {className}">
	{#if title}
		<div class="card-header">
			<h2 class="card-title">{title}</h2>
			{#if subtitle}
				<p class="card-subtitle">{subtitle}</p>
			{/if}
		</div>
		<div class="section-divider">
			<div class="gradient-line"></div>
		</div>
	{/if}
	
	<div class="card-content">
		<slot />
	</div>
</div>

<style>
	.card {
		background-color: var(--color-card-bg);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		transition: transform 0.2s, box-shadow 0.2s;
	}
	
	.card.prominent {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	}
	
	.card-header {
		margin-bottom: 0.75rem;
	}
	
	.card-title {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-text);
		margin: 0 0 0.25rem 0;
	}
	
	.card-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0;
	}
	
	.section-divider {
		margin: 0.75rem 0 1.25rem 0;
		position: relative;
		height: 1px;
	}
	
	.gradient-line {
		height: 2px;
		background: linear-gradient(90deg, var(--color-primary, #4D44B3), var(--color-secondary, #BF469A));
		border-radius: 1px;
		opacity: 0.7;
	}
	
	.card-content {
		width: 100%;
	}
</style>
