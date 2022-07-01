<script lang="ts">
	export let checked: boolean;
	export let description: string;
	export let save: () => void;
</script>

{#if checked}
	<textarea class="textarea line-through" disabled bind:value={description} />
{:else}
	<textarea class="textarea" bind:value={description} on:change={save} />
{/if}
