<script type="ts">
	export let checked: boolean;
</script>

<input
	aria-label="Todo checkbox"
	type="checkbox"
	class="checkbox checkbox-sm bg-neutral-content"
	bind:checked
	on:change
/>
