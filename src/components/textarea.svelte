<script lang="ts">
	import { getContext } from 'svelte';

	export let checked: boolean;
	export let description: string;

	const save: () => void = getContext('save');
</script>

<textarea
	aria-label="Todo description"
	class="textarea {checked ? 'line-through' : ''}"
	disabled={checked}
	bind:value={description}
	on:change={save}
/>
