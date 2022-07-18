<script lang="ts">
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	import type { Todo } from '$models/todo';

	import Button from '$components/ui/Button.svelte';
	import Checkbox from '$components/ui/Checkbox.svelte';
	import DeleteIcon from '$assets/DeleteIcon.svelte';
	import EditIcon from '$lib/assets/EditIcon.svelte';

	export let todo: Todo;
	const mark: (todo: Todo, isDone: boolean) => void = getContext('mark');
	const remove: (todo: Todo) => void = getContext('remove');
</script>

<div
	class="mb-1 grid w-64 grid-cols-10 gap-2 rounded-md bg-primary p-2 md:w-96"
	transition:fly={{ x: 100 }}
>
	<div class="col-start-1 col-end-2 grid items-center">
		<Checkbox bind:checked={todo.isDone} on:change={() => mark(todo, todo.isDone)} />
	</div>
	<div class="col-span-7 col-start-2 flex items-center">
		<p class="truncate text-secondary-content {todo.isDone ? 'line-through' : ''}">
			{todo.description}
		</p>
	</div>
	<div class="col-span-2 col-end-11 flex items-center justify-center gap-x-2">
		<Button ariaLabel="Edit todo">
			<EditIcon />
		</Button>
		<Button ariaLabel="Delete todo" on:click={() => remove(todo)}>
			<DeleteIcon />
		</Button>
	</div>
</div>
