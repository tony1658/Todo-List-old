<script lang="ts">
	import DeleteIcon from '$assets/DeleteIcon.svelte';
</script>

<button
	aria-label="Delete todo button"
	class="btn btn-ghost btn-square btn-xs text-base-200"
	on:click
>
	<DeleteIcon />
</button>
