import { createTodoHtml } from './';

let element;

/**
 *
 * @param {String} elementId un atributo id de un HTMLElement
 * @param {[Todo]} todos Array de type Todo
 */
export const renderTodos = (elementId, todos = []) => {
	if (!element) element = document.querySelector(elementId);
	if (!element) throw new Error(`Element ${element} not found`);

	element.innerHTML = '';

	todos.forEach((todo) => {
		element.append(createTodoHtml(todo));
	});
};
