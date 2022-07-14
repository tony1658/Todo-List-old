<script lang="ts">
	import MoonIcon from '$assets/MoonIcon.svelte';
	import SunIcon from '$assets/SunIcon.svelte';

	export let theme = 'light';
</script>

<button aria-label="Theme button" class="btn btn-outline btn-square btn-sm">
	{#if theme === 'light'}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>
