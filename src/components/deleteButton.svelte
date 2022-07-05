<script lang="ts">
	import DeleteIcon from './icons/DeleteIcon.svelte';
</script>

<button
	aria-label="Delete todo button"
	class="btn btn-outline btn-square btn-sm text-error hover:bg-error"
	on:click
>
	<DeleteIcon />
</button>
