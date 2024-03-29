/** @format */
/**
 app.js La función de es modulo es :
 Mostrar El HTML usando el estado de la app (los todos class)
 todo.store.js se dedica a gestionar el estado independiente de el render en HTML
 usando la clase Todos de todo.models.js
 Esta app de nivel superio usa todo.store y modulos segun la necesidad (use-cases) 
 * 
 *  */

import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderPending, renderTodos } from './use-cases';

const ElementIDs = {
	TodoList: '.todo-list',
	newTodoInput: '#new-todo-input',
	clearCompleted: '.clear-completed',
	todoFilters: '.filtro',
	pendienteDisplay: '#pending-count',
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
	const displayTodos = () => {
		const todos = todoStore.getTodos(todoStore.getCurrentFilter());
		renderTodos(ElementIDs.TodoList, todos);
		updatePendingCount();
	};

	const updatePendingCount = () => {
		console.log(ElementIDs.pendienteDisplay);
		renderPending(ElementIDs.pendienteDisplay);
	};

	//Cuando la funcion App se llama
	(() => {
		const app = document.createElement('div');
		app.innerHTML = html;
		document.querySelector(elementId).append(app);
		displayTodos();
	})();

	// Referencias Html
	const newDescriptionInput = document.querySelector(ElementIDs.newTodoInput);
	const todoListUL = document.querySelector(ElementIDs.TodoList);
	const clearCompletedButton = document.querySelector(ElementIDs.clearCompleted);
	const filterLIs = document.querySelectorAll(ElementIDs.todoFilters);

	//Listeners
	// add todo-------------------
	newDescriptionInput.addEventListener('keyup', (event) => {
		if (event.keyCode !== 13) return;
		if (event.target.value.trim().length === 0) return;

		todoStore.addTodo(event.target.value);
		displayTodos();
		event.target.value = '';
	});

	// toggle todo-------------------
	// aunque hagamos click el <checkbox> dentro o <label>
	todoListUL.addEventListener('click', (event) => {
		const element = event.target.closest('li'); // o (.'class-li' ) o ('.class-label') o ('[data-id]')

		todoStore.toggleTodo(element.getAttribute('data-id')); // <li data-id= "...">
		displayTodos();
	});

	// Eliminar todo
	todoListUL.addEventListener('click', (event) => {
		if (!event.target.matches('.destroy')) return;
		const element = event.target.closest('[data-id]');

		todoStore.deleteTodo(element.getAttribute('data-id'));
		displayTodos();
	});

	// Eliminar completados
	clearCompletedButton.addEventListener('click', () => {
		todoStore.deleteCompleted();
		displayTodos();
	});

	// cambiar filtros para mostrar todos (solo render) Todos || pendientes || completados
	filterLIs.forEach((element) => {
		element.addEventListener('click', (element) => {
			filterLIs.forEach((el) => el.classList.remove('selected'));
			element.target.classList.add('selected');

			const TRAD_FILTER = {
				Todos: 'All',
				Pendientes: 'Pending',
				Completados: 'Completed',
			};
			const filter = TRAD_FILTER[element.target.textContent];
			todoStore.setFilter(todoStore.Filter[filter]);
			displayTodos();
		});
	});
};
