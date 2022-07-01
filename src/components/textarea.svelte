<script lang="ts">
	export let checked: boolean;
	export let description: string;
	export let save: () => void;
</script>

<textarea
	aria-label="Todo description"
	class="textarea {checked ? 'line-through' : ''}"
	disabled={checked}
	bind:value={description}
	on:change={save}
/>
