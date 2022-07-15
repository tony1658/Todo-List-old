<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { browser } from '$app/env';

	import type { Todo } from '$models/todo';
	import isEmpty from '$utils/isEmpty';

	import Input from '$components/form/Input.svelte';
	import InputGroup from '$components/form/InputGroup.svelte';
	import NavBar from '$layouts/NavBar.svelte';
	import SaveButton from '$components/form/SaveButton.svelte';
	import Tab from '$components/tab/Tab.svelte';
	import TabGroup from '$components/tab/TabGroup.svelte';
	import TodoList from '$components/todo/TodoList.svelte';

	let description = '';
	let selectedCategory = 'Todo';
	let todoList: Todo[] = [];

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

	function add() {
		if (isEmpty(description)) {
			return;
		}

		const todo: Todo = {
			uuid: crypto.randomUUID(),
			isDone: false,
			description: description.trim()
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
	<Tab name="Todo" {selectedCategory} on:click={() => (selectedCategory = 'Todo')} />
	<Tab name="Done" {selectedCategory} on:click={() => (selectedCategory = 'Done')} />
	<Tab name="All" {selectedCategory} on:click={() => (selectedCategory = 'All')} />
</TabGroup>
<TodoList {selectedCategory} {todoList} />
