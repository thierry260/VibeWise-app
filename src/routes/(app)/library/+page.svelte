<script lang="ts">
	// Library categories
	const categories = [
		{
			title: 'Practices',
			icon: '🧘',
			description: 'Guided meditations, breathing techniques, and mindfulness exercises',
			comingSoon: false
		},
		{
			title: 'Insights',
			icon: '💡',
			description: 'Personalized insights based on your reflections and HRV data',
			comingSoon: true
		},
		{
			title: 'Resources',
			icon: '📚',
			description: 'Articles, videos, and tools for personal growth',
			comingSoon: false
		},
		{
			title: 'Spiral Dynamics',
			icon: '🌀',
			description: 'Learn about the Spiral Dynamics model and its applications',
			comingSoon: false
		}
	];

	// Placeholder practices
	const practices = [
		{
			title: 'Box Breathing',
			duration: '5 min',
			description: 'A simple breathing technique to reduce stress and improve focus',
			icon: '🫁'
		},
		{
			title: 'Body Scan',
			duration: '10 min',
			description: 'A mindfulness practice to connect with your body and release tension',
			icon: '👤'
		},
		{
			title: 'Loving-Kindness',
			duration: '15 min',
			description: 'Cultivate compassion for yourself and others',
			icon: '❤️'
		}
	];

	// Placeholder resources
	const resources = [
		{
			title: 'Understanding HRV',
			type: 'Article',
			description: 'Learn how Heart Rate Variability reflects your nervous system state',
			icon: '📝'
		},
		{
			title: 'Spiral Dynamics Introduction',
			type: 'Video',
			description: 'A beginner-friendly overview of the Spiral Dynamics model',
			icon: '🎬'
		},
		{
			title: 'Emotional Regulation Guide',
			type: 'PDF',
			description: 'Practical techniques for managing difficult emotions',
			icon: '📄'
		}
	];

	// Active tab state
	let activeTab = 'Practices';

	// Function to change active tab
	function setActiveTab(tab: string) {
		activeTab = tab;
	}
</script>

<div class="library-container">
	<header class="library-header">
		<p>Tools and resources for your personal growth journey</p>
	</header>

	<div class="category-tabs">
		{#each categories as category}
			<button
				class="tab-button"
				class:active={activeTab === category.title}
				on:click={() => setActiveTab(category.title)}
				disabled={category.comingSoon}
			>
				{#if category.comingSoon}
					<span class="coming-soon-badge z-1000">Soon</span>
				{/if}
				<span class="tab-icon">{category.icon}</span>
				<span class="tab-title">{category.title}</span>
			</button>
		{/each}
	</div>

	<div class="tab-content">
		{#if activeTab === 'Practices'}
			<div class="practices-list">
				{#each practices as practice}
					<div class="practice-card">
						<div class="practice-icon">{practice.icon}</div>
						<div class="practice-details">
							<h3>{practice.title}</h3>
							<span class="practice-duration">{practice.duration}</span>
							<p>{practice.description}</p>
						</div>
						<button class="start-button">Start</button>
					</div>
				{/each}
			</div>
		{:else if activeTab === 'Resources'}
			<div class="resources-list">
				{#each resources as resource}
					<div class="resource-card">
						<div class="resource-icon">{resource.icon}</div>
						<div class="resource-details">
							<span class="resource-type">{resource.type}</span>
							<h3>{resource.title}</h3>
							<p>{resource.description}</p>
						</div>
						<button class="view-button">View</button>
					</div>
				{/each}
			</div>
		{:else if activeTab === 'Spiral Dynamics'}
			<div class="spiral-content">
				<div class="spiral-intro">
					<h2>Spiral Dynamics Model</h2>
					<p>
						Spiral Dynamics is a model of human development that describes how worldviews, value
						systems, and ways of thinking evolve in individuals and societies.
					</p>
					<p>
						The model is represented as a spiral with different colors representing different stages
						or "memes" of development.
					</p>
				</div>

				<div class="spiral-levels">
					<div class="level-card beige">
						<h3>Beige - Survival</h3>
						<p>Basic survival needs, instinctive responses</p>
					</div>
					<div class="level-card purple">
						<h3>Purple - Tribal</h3>
						<p>Magical thinking, traditions, rituals</p>
					</div>
					<div class="level-card red">
						<h3>Red - Power</h3>
						<p>Impulsive, egocentric, power-seeking</p>
					</div>
					<div class="level-card blue">
						<h3>Blue - Order</h3>
						<p>Purpose, discipline, moral codes</p>
					</div>
					<div class="level-card orange">
						<h3>Orange - Achievement</h3>
						<p>Strategic, scientific, goal-oriented</p>
					</div>
					<div class="level-card green">
						<h3>Green - Community</h3>
						<p>Egalitarian, ecological, pluralistic</p>
					</div>
					<div class="level-card yellow">
						<h3>Yellow - Integrative</h3>
						<p>Systemic thinking, adaptive, flexible</p>
					</div>
					<div class="level-card turquoise">
						<h3>Turquoise - Holistic</h3>
						<p>Global view, interconnected, spiritual</p>
					</div>
				</div>
			</div>
		{:else}
			<div class="coming-soon">
				<div class="coming-soon-message">
					<h2>Coming Soon</h2>
					<p>This feature is currently in development and will be available in a future update.</p>
					<p>Continue using VibeWise to track your reflections and HRV sessions!</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.library-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 800px;
		margin: 0 auto;
		padding: 1rem;
	}

	.library-header {
		text-align: center;
		margin-bottom: 1rem;
	}

	.library-header h1 {
		font-size: 1.8rem;
		margin-bottom: 0.5rem;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-weight: 700;
	}

	.library-header p {
		color: var(--color-text-secondary, #666666);
		font-size: 1rem;
	}

	.category-tabs {
		display: flex;
		overflow-x: auto;
		gap: 0.5rem;
		padding-bottom: 0.5rem;
		scrollbar-width: none; /* Firefox */
	}

	.category-tabs::-webkit-scrollbar {
		display: none; /* Chrome, Safari, Edge */
	}

	.tab-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.75rem 1rem;
		background-color: var(--color-bg-elevated);
		border: none;
		border-radius: 0.75rem;
		min-width: 80px;
		color: var(--color-text);
		position: relative;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.tab-button.active {
		background: linear-gradient(135deg, rgba(77, 68, 179, 0.1), rgba(191, 70, 154, 0.1));
		color: var(--color-primary);
		font-weight: 500;
	}

	.tab-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.tab-icon {
		font-size: 1.5rem;
		margin-bottom: 0.25rem;
	}

	.tab-title {
		font-size: 0.8rem;
	}

	.coming-soon-badge {
		position: absolute;
		top: -0.5rem;
		right: -0.5rem;
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
		font-size: 0.6rem;
		padding: 0.2rem 0.4rem;
		border-radius: 1rem;
		font-weight: 600;
	}

	.tab-content {
		background-color: var(--color-bg-elevated);
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		min-height: 400px;
	}

	.practices-list,
	.resources-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.practice-card,
	.resource-card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--color-bg);
		border-radius: 0.75rem;
		transition: transform 0.2s ease;
	}

	.practice-card:hover,
	.resource-card:hover {
		transform: translateY(-2px);
	}

	.practice-icon,
	.resource-icon {
		font-size: 1.5rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(77, 68, 179, 0.1), rgba(191, 70, 154, 0.1));
		border-radius: 0.75rem;
		flex-shrink: 0;
	}

	.practice-details,
	.resource-details {
		flex: 1;
	}

	.practice-details h3,
	.resource-details h3 {
		margin: 0 0 0.25rem 0;
		font-size: 1.1rem;
	}

	.practice-details p,
	.resource-details p {
		margin: 0.25rem 0 0 0;
		font-size: 0.9rem;
		color: var(--color-text-secondary, #666666);
	}

	.practice-duration {
		font-size: 0.8rem;
		background-color: rgba(77, 68, 179, 0.1);
		color: var(--color-primary);
		padding: 0.2rem 0.5rem;
		border-radius: 1rem;
		font-weight: 500;
	}

	.resource-type {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-secondary);
		font-weight: 600;
	}

	.start-button,
	.view-button {
		background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
		color: white;
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-weight: 600;
		font-size: 0.9rem;
		cursor: pointer;
		transition: opacity 0.2s;
		flex-shrink: 0;
	}

	.start-button:hover,
	.view-button:hover {
		opacity: 0.9;
	}

	.coming-soon {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 300px;
	}

	.coming-soon-message {
		text-align: center;
		max-width: 80%;
	}

	.coming-soon-message h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	.spiral-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.spiral-intro {
		margin-bottom: 1rem;
	}

	.spiral-intro h2 {
		font-size: 1.4rem;
		margin-bottom: 0.75rem;
		color: var(--color-primary);
	}

	.spiral-intro p {
		line-height: 1.6;
		margin-bottom: 0.5rem;
	}

	.spiral-levels {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1rem;
	}

	.level-card {
		padding: 1rem;
		border-radius: 0.75rem;
		background-color: var(--color-bg);
		border-left: 4px solid;
	}

	.level-card h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1rem;
	}

	.level-card p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--color-text-secondary, #666666);
	}

	.level-card.beige {
		border-color: #e8ddcb;
	}
	.level-card.purple {
		border-color: #9b59b6;
	}
	.level-card.red {
		border-color: #e74c3c;
	}
	.level-card.blue {
		border-color: #3498db;
	}
	.level-card.orange {
		border-color: #e67e22;
	}
	.level-card.green {
		border-color: #2ecc71;
	}
	.level-card.yellow {
		border-color: #f1c40f;
	}
	.level-card.turquoise {
		border-color: #1abc9c;
	}

	@media (min-width: 768px) {
		.library-container {
			padding: 2rem;
		}

		.library-header h1 {
			font-size: 2.2rem;
		}

		.tab-button {
			min-width: 100px;
		}
	}
</style>
