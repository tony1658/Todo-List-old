<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import { browser } from '$app/env';

	import type { Todo } from '../models/todo';

	import Card from '../components/card.svelte';
	import CardContainer from '../components/cardContainer.svelte';
	import Divider from '../components/divider.svelte';
	import Title from '../components/title.svelte';
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

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
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
	<Title title="Todo List" isPageTitle={true} />
	<InputGroup>
		<Input {add} bind:description />
		<SaveButton on:click={add} />
	</InputGroup>
	<CardContainer>
		<Divider>
			<div>
				<Title title="Todo" />
				{#each todoList.filter((t) => !t.isDone) as todo (todo.uuid)}
					<div animate:flip in:receive={{ key: todo.uuid }} out:send={{ key: todo.uuid }}>
						<Card {todo} />
					</div>
				{/each}
			</div>
			<div>
				<Title title="Done" />
				{#each todoList.filter((t) => t.isDone) as todo (todo.uuid)}
					<div animate:flip in:receive={{ key: todo.uuid }} out:send={{ key: todo.uuid }}>
						<Card {todo} />
					</div>
				{/each}
			</div>
		</Divider>
	</CardContainer>
</PageContainer>
