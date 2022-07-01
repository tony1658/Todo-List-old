<script type="ts">
	export let checked: boolean;
	export let mark: () => void;
</script>

<input
	aria-label="Todo checkbox"
	type="checkbox"
	class="checkbox checkbox-accent bg-white hover:bg-accent"
	bind:checked
	on:change={mark}
/>
