<script lang="ts">
	export let add: () => void;
	export let description: string;
</script>

<input
	aria-label="Todo input"
	placeholder="Todo..."
	type="text"
	class="input w-80 border-primary"
	on:keyup={(e) => e.key === 'Enter' && add()}
	bind:value={description}
/>
