<script type="ts">
	export let checked: boolean;
</script>

<input
	aria-label="Todo checkbox"
	type="checkbox"
	class="checkbox checkbox-accent bg-white hover:bg-accent"
	bind:checked
	on:change
/>
