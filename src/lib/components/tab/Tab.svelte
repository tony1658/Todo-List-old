<script lang="ts">
	export let active = false;
	export let body: string;
</script>

<button
	class="tab {active ? 'tab-active ' : ''} font-semibold normal-case text-accent-content"
	on:click
	>{body}
</button>
