<script lang="ts">
	import { goto } from '$app/navigation';
	import { Sparkles, Heart, Info } from 'lucide-svelte';
	import Card from '$lib/components/Card.svelte';
	import ActionTile from '$lib/components/ActionTile.svelte';
	import Button from '$lib/components/Button.svelte';

	// Function to navigate to the selected session type
	function startSession(type: 'reflection' | 'hrv') {
		if (type === 'reflection') {
			goto('/reflect');
		} else {
			goto('/hrv-session');
		}
	}
</script>

<div class="sessions-container">
	<p class="section-description">
		Choose a session type to improve your well-being and track your progress.
	</p>

	<div class="action-tiles">
		<ActionTile
			title="New Reflection"
			description="Record your thoughts and feelings"
			icon={Sparkles}
			ariaLabel="Start a new reflection session"
			onClick={() => startSession('reflection')}
		/>

		<ActionTile
			title="HRV Session"
			description="Measure your heart rate variability"
			icon={Heart}
			ariaLabel="Start a new HRV session"
			onClick={() => startSession('hrv')}
		/>
	</div>

	<div class="section-divider">
		<div class="gradient-line"></div>
	</div>

	<Card title="Benefits of Regular Sessions">
		<ul class="benefits-list">
			<li>Improve self-awareness and emotional regulation</li>
			<li>Track physiological balance and stress levels</li>
			<li>Develop mindfulness and presence</li>
			<li>Build resilience and adaptability</li>
		</ul>

		<div class="card-actions">
			<Button variant="outline" icon={Info} size="sm">Learn more</Button>
		</div>
	</Card>
</div>

<style>
	.sessions-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	.section-description {
		color: var(--color-text-secondary);
		margin-bottom: 1.5rem;
		font-size: 1rem;
		line-height: 1.5;
	}

	.section-divider {
		margin: 1.5rem 0;
		position: relative;
		height: 1px;
	}

	.gradient-line {
		height: 2px;
		background: linear-gradient(
			90deg,
			var(--color-primary, #4d44b3),
			var(--color-secondary, #bf469a)
		);
		border-radius: 1px;
		opacity: 0.7;
	}

	.action-tiles {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.benefits-list {
		padding-left: 1.5rem;
		margin: 0;
	}

	.benefits-list li {
		margin-bottom: 0.5rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	.card-actions {
		margin-top: 1.5rem;
		display: flex;
		justify-content: flex-end;
	}

	@media (min-width: 768px) {
		.action-tiles {
			grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		}
	}
</style>
