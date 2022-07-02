<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	import type { Todo } from '../models/todo';

	import Checkbox from './checkbox.svelte';
	import Textarea from './textarea.svelte';
	import DeleteButton from './deleteButton.svelte';

	export let todo: Todo;
	const mark: (todo: Todo, isDone: boolean) => void = getContext('mark');
	const remove: (todo: Todo) => void = getContext('remove');
</script>

<div class="card {todo.isDone ? 'bg-green-100' : 'bg-yellow-50'} mb-2 shadow-xl" in:fade out:fade>
	<div class="card-body">
		<div class="grid grid-cols-6">
			<div class="col-end2 col-start-1 flex items-center ">
				<Checkbox bind:checked={todo.isDone} on:change={() => mark(todo, todo.isDone)} />
			</div>
			<div class="col-span-1 col-end-7 ml-1">
				<DeleteButton on:click={() => remove(todo)} />
			</div>
		</div>
		<Textarea bind:checked={todo.isDone} bind:description={todo.description} />
	</div>
</div>
