<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { browser } from '$app/env';
	import type { Todo } from '$models/todo';

	import Card from '$components/Card.svelte';
	import Container from '$layouts/Container.svelte';
	import Divider from '$components/Divider.svelte';
	import Header from '$components/Header.svelte';
	import Input from '$components/Input.svelte';
	import InputGroup from '$components/InputGroup.svelte';
	import NavBar from '$layouts/NavBar.svelte';
	import SaveButton from '$components/SaveButton.svelte';

	let todoList: Todo[] = [];
	let description = '';

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
		if (description || description.length > 0) {
			const todo: Todo = {
				uuid: crypto.randomUUID(),
				isDone: false,
				description: description
			};

			todoList = [...todoList, todo];
			save();
			description = '';
		}
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
<Container>
	<Divider>
		<div>
			<Header title="Todo" />
			{#each todoList.filter((t) => !t.isDone) as todo (todo.uuid)}
				<Card {todo} />
			{/each}
		</div>
		<div>
			<Header title="Done" />
			{#each todoList.filter((t) => t.isDone) as todo (todo.uuid)}
				<Card {todo} />
			{/each}
		</div>
	</Divider>
</Container>
