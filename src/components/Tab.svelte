<script lang="ts">
	export let active = false;
	export let body: string;
</script>

<button class="tab {active ? 'tab-active ' : ''} normal-case" on:click>{body}</button>
