import type { Todo } from '$models/todo';

export default function getSelectedTodos(selectedCategory: string, todoList: Todo[]) {
	if (selectedCategory === 'Todo') {
		return todoList.filter((t) => t.isDone === false);
	}

	if (selectedCategory === 'Done') {
		return todoList.filter((t) => t.isDone === true);
	}
	return todoList;
}
