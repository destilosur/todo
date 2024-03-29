import { Todo } from '../models/todo.models';

/**
 *
 * @param {Todo} todo
 */

export const createTodoHtml = (todo) => {
	if (!todo) throw new Error('Arg Todo object is requerided');

	const { done, description, id } = todo;
	const html = /*html*/ `
	
	<div class="view">
		<input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
		<label>${description}</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="Create a TodoMVC template">
    `;

	const liElement = document.createElement('li');
	liElement.setAttribute('data-id', id);
	liElement.innerHTML = html;
	if (done) liElement.classList.add('completed');

	return liElement;
};
