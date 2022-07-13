<script lang="ts">
	import MoonIcon from './icons/MoonIcon.svelte';
	import SunIcon from './icons/SunIcon.svelte';

	export let theme = 'light';
</script>

<button class="btn btn-outline btn-square btn-sm">
	{#if theme === 'light'}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>
