<script lang="ts">
	export let title: string;
	export let isPageTitle: boolean = false;
</script>

{#if isPageTitle}
	<h1 class="py-4 text-center text-4xl">{title}</h1>
{:else}
	<h1 class="my-1 text-center font-bold underline">{title}</h1>
{/if}
