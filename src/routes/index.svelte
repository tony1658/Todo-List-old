<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { browser } from '$app/env';
	import type { Todo } from '../models/todo';

	import Card from '../components/card.svelte';
	import CardContainer from '../components/cardContainer.svelte';
	import Divider from '../components/divider.svelte';
	import Header from '../components/header.svelte';
	import Input from '../components/input.svelte';
	import InputGroup from '../components/inputGroup.svelte';
	import SaveButton from '../components/saveButton.svelte';
	import PageContainer from '../components/pageContainer.svelte';

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

<PageContainer>
	<h5 class="flex justify-center py-4 text-4xl">Todo List</h5>
	<InputGroup>
		<Input {add} bind:description />
		<SaveButton on:click={add} />
	</InputGroup>
	<CardContainer>
		<Divider>
			<div class="w-64">
				<Header title="Todo" />
				{#each todoList.filter((t) => !t.isDone) as todo (todo.uuid)}
					<Card {todo} />
				{/each}
			</div>
			<div class="w-64">
				<Header title="Done" />
				{#each todoList.filter((t) => t.isDone) as todo (todo.uuid)}
					<Card {todo} />
				{/each}
			</div>
		</Divider>
	</CardContainer>
</PageContainer>
