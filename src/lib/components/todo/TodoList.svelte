<script lang="ts">
	import type { Todo } from '$models/todo';

	import Container from '$layouts/Container.svelte';
	import TodoItem from '$components/todo/TodoItem.svelte';

	export let todoList: Todo[];
	export let todoGroup: boolean;
</script>

<Container>
	{#each todoList.filter((t) => t.isDone === todoGroup) as todo (todo.uuid)}
		<TodoItem {todo} />
	{/each}
</Container>
