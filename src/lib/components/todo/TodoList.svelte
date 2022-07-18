<script lang="ts">
	import type { Todo } from '$models/todo';
	import getSelectedTodos from '$utils/getSelectedTodos';

	import Container from '$layouts/Container.svelte';
	import TodoItem from '$components/todo/TodoItem.svelte';

	export let todoList: Todo[];
	export let selectedCategory: string;
</script>

<Container>
	{#each getSelectedTodos(selectedCategory, todoList) as todo (todo.uuid)}
		<TodoItem {todo} />
	{/each}
</Container>
