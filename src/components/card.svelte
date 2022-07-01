<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Todo } from '../models/todo';

	export let todo: Todo;
</script>

<div class="card {todo.isDone ? 'bg-green-100' : 'bg-yellow-50'} mb-2 shadow-xl" in:fade out:fade>
	<div class="card-body">
		<div class="grid grid-cols-6">
			<div class="col-end2 col-start-1 flex items-center ">
				<slot name="checkbox" />
			</div>
			<div class="col-span-1 col-end-7 ml-1">
				<slot name="deleteButton" />
			</div>
		</div>
		<slot name="textarea" />
	</div>
</div>
