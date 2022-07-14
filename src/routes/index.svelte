<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { browser } from '$app/env';
	import type { Todo } from '$models/todo';

	import Container from '$layouts/Container.svelte';
	import Input from '$components/form/Input.svelte';
	import InputGroup from '$components/form/InputGroup.svelte';
	import NavBar from '$layouts/NavBar.svelte';
	import SaveButton from '$components/form/SaveButton.svelte';
	import Tab from '$components/tab/Tab.svelte';
	import TabGroup from '$components/tab/TabGroup.svelte';
	import TodoItem from '$components/todo/TodoItem.svelte';

	let description = '';
	let todoList: Todo[] = [];
	let todoGroup = false;

	onMount(() => {
		if (!browser) {
			return;
		}
		const savedTodoList = localStorage.getItem('todoList');
		todoList = savedTodoList !== null ? JSON.parse(savedTodoList) : [];
	});

	onDestroy(() => {
		if (!browser) {
			return;
		}
		if (localStorage.getItem('todoList') === null) {
			localStorage.removeItem('todoList');
		}
	});

	function save() {
		if (!browser) {
			return;
		}
		localStorage.setItem('todoList', JSON.stringify(todoList));
	}

	function isValidInput(input: string): boolean {
		// Checks for if the input only contains spaces
		const regex = /^\s*$/;
		return !regex.test(input);
	}

	function add() {
		if (!description || !isValidInput(description)) {
			return;
		}

		const todo: Todo = {
			uuid: crypto.randomUUID(),
			isDone: false,
			description: description
		};

		todoList = [...todoList, todo];
		save();
		description = '';
	}

	function remove(todo: Todo) {
		todoList = todoList.filter((t) => t !== todo);
		save();
	}

	function mark(todo: Todo, isDone: boolean) {
		todo.isDone = isDone;
		remove(todo);
		todoList = todoList.concat(todo);
		save();
	}

	setContext('save', save);
	setContext('remove', remove);
	setContext('mark', mark);
</script>

<svelte:head>
	<title>Todo List</title>
	<html lang="en" />
	<meta name="description" content="A simple todo list build with Svelte" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<NavBar />
<InputGroup>
	<Input {add} bind:description />
	<SaveButton on:click={add} />
</InputGroup>
<TabGroup>
	<Tab active={!todoGroup} body="Todo" on:click={() => (todoGroup = !todoGroup)} />
	<Tab active={todoGroup} body="Done" on:click={() => (todoGroup = !todoGroup)} />
</TabGroup>
<Container>
	{#each todoList.filter((t) => t.isDone === todoGroup) as todo (todo.uuid)}
		<TodoItem {todo} />
	{/each}
</Container>
