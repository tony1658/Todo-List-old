<script lang="ts">
	import NavBar from '../components/navbar.svelte';
	import Card from '../components/card.svelte';
	import Container from '../components/container.svelte';
	import Header from '../components/header.svelte';
	import InputGroup from '../components/inputGroup.svelte';

	interface Todo {
		id: Number;
		isDone: boolean;
		description: string;
	}

	let todoList: Todo[] = [];
	let id = 0;
	let description: string = '';

	function add() {
		if (description || description.length > 0) {
			const todo: Todo = {
				id: id++,
				isDone: false,
				description: description
			};

			todoList = [...todoList, todo];
			description = '';
		}
	}

	function remove(todo: Todo) {
		todoList = todoList.filter((t) => t !== todo);
	}

	function mark(todo: Todo, isDone: boolean) {
		todo.isDone = isDone;
		todo.description = todo.description;
		remove(todo);
		todoList = todoList.concat(todo);
	}
</script>

<svelte:head>
	<title>Todo List</title>
	<html lang="en" />
	<meta name="description" content="A simple todo list build with Svelte" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<NavBar />
<Container>
	<InputGroup {add} bind:description />
	<div class="grid grid-cols-1 gap-3 px-2 md:grid-cols-2">
		<div>
			<Header title="Todo" />
			{#each todoList.filter((t) => !t.isDone) as todo (todo.id)}
				<Card {todo} remove={() => remove(todo)} mark={() => mark(todo, true)} />
			{/each}
		</div>
		<div>
			<Header title="Done" />
			{#each todoList.filter((t) => t.isDone) as todo (todo.id)}
				<Card {todo} remove={() => remove(todo)} mark={() => mark(todo, false)} />
			{/each}
		</div>
	</div>
</Container>
