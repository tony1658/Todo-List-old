<script lang="ts">
	import { fade } from 'svelte/transition';

	import Checkbox from './checkbox.svelte';
	import Textarea from './textarea.svelte';
	import DeleteButton from './deleteButton.svelte';

	interface Todo {
		id: Number;
		isDone: boolean;
		description: string;
	}

	export let todo: Todo;
	export let remove: () => void;
	export let mark: () => void;
</script>

<div class="card {todo.isDone ? 'bg-green-100' : 'bg-yellow-50'} mb-2 shadow-xl" in:fade out:fade>
	<div class="card-body">
		<div class="grid grid-cols-6">
			<div class="col-end2 col-start-1 flex items-center ">
				<Checkbox bind:checked={todo.isDone} {mark} />
			</div>
			<div class="col-span-1 col-end-7 ml-1">
				<DeleteButton {remove} />
			</div>
		</div>
		<Textarea bind:checked={todo.isDone} bind:description={todo.description} />
	</div>
</div>
