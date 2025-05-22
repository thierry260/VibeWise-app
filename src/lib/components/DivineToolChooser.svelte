<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { divineToolChooserStore, type DivineTool } from '$lib/stores/divineTools';
	import { authStore } from '$lib/stores/auth';

	// Props
	export let onClose = () => {}; // Callback when modal is closed

	// Local state
	let selectedTool: DivineTool | null = null;
	let visible = false;

	// Subscribe to store
	const unsubscribe = divineToolChooserStore.subscribe((state) => {
		visible = state.isVisible;
		selectedTool = state.selectedTool;
	});

	// Handle action button click
	async function handleActionClick() {
		if (!selectedTool) return;

		// Log the interaction if user is logged in
		if ($authStore.user) {
			await divineToolChooserStore.logToolInteraction($authStore.user, selectedTool.id, 'clicked');
		}

		// Navigate to the tool's route
		divineToolChooserStore.hide();
		onClose();
		goto(selectedTool.route);
	}

	// Handle dismiss
	async function handleDismiss() {
		if (selectedTool && $authStore.user) {
			await divineToolChooserStore.logToolInteraction(
				$authStore.user,
				selectedTool.id,
				'dismissed'
			);
		}

		divineToolChooserStore.hide();
		onClose();
	}

	// Clean up subscription on component destroy
	onDestroy(() => {
		unsubscribe();
	});
</script>

{#if visible && selectedTool}
	<div class="divine-tool-overlay" transition:fade={{ duration: 200 }}>
		<div
			class="divine-tool-modal bg-white shadow-md dark:bg-gray-800"
			transition:fly={{ y: 100, duration: 300 }}
		>
			<div class="modal-header">
				<h3>✨ A tool chose you</h3>
				<button class="close-button" on:click={handleDismiss} aria-label="Close">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>
			</div>

			<div class="tool-content">
				<h2>{selectedTool.title}</h2>
				<p>{selectedTool.description}</p>

				<div class="action-buttons">
					<button class="action-button" on:click={handleActionClick}>
						{selectedTool.actionLabel}
					</button>
					<button class="dismiss-button" on:click={handleDismiss}> Go to History </button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.divine-tool-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		z-index: 1000;
		padding: 1rem 1rem 0rem 1rem;
	}

	.divine-tool-modal {
		border-radius: 16px 16px 0 0;
		width: 100%;
		max-width: 500px;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		color: var(--color-text);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
	}

	.modal-header h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: 500;
	}

	.close-button {
		background: none;
		border: none;
		color: white;
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tool-content {
		padding: 1.5rem;
	}

	.tool-content h2 {
		margin: 0 0 1rem 0;
		color: var(--color-primary);
		font-size: 1.5rem;
	}

	.tool-content p {
		margin: 0 0 1.5rem 0;
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.action-button {
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
		border: none;
		border-radius: 8px;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.action-button:hover {
		opacity: 0.9;
	}

	.dismiss-button {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		color: var(--color-text);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		cursor: pointer;
		text-align: center;
		transition: background-color 0.2s;
	}

	.dismiss-button:hover {
		background-color: var(--color-border);
	}

	@media (min-width: 768px) {
		.divine-tool-overlay {
			align-items: center;
		}

		.divine-tool-modal {
			border-radius: 16px;
			max-width: 450px;
		}
	}
</style>
