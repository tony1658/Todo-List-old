<script lang="ts">
	import SaveButton from './saveButton.svelte';

	export let add: () => void;
	export let description: string;
</script>

<div class="input-group">
	<input
		placeholder="Todo..."
		class="input input-bordered w-80"
		on:keyup={(e) => e.key === 'Enter' && add()}
		bind:value={description}
	/>
	<SaveButton {add} />
</div>
