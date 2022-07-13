<script lang="ts">
	export let add: () => void;
	export let description: string;
</script>

<input
	aria-label="Todo input"
	placeholder="Todo..."
	class="input input-bordered w-80"
	on:keyup={(e) => e.key === 'Enter' && add()}
	bind:value={description}
/>
