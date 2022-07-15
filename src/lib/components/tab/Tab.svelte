<script lang="ts">
	export let selectedCategory: string;
	export let name: string;
</script>

<button
	class="tab {selectedCategory === name
		? 'tab-active '
		: ''} font-semibold normal-case text-accent-content"
	on:click
	>{name}
</button>
