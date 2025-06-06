// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
/// <reference types="svelte" />

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	namespace svelte.JSX {
		interface HTMLAttributes {
			[key: string]: unknown;
		}
	}
}

export {};
