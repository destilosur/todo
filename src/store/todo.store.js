/**
 * En todo.store.js Tenemos el manejador de los estados de los todos
 *  Se encarga de realizar  todos los cambios que tenemos en el estado global de nuestra app
 *  Aquí tenemos todos nuestras funciones separadas de nuestro HTML
 * Esto es muy bueno por que es agnostico a cualquier proyecto
 */

import { Todo } from '../todos/models/todo.models.js';

const Filter = {
	All: 'All',
	Completed: 'Completed',
	Pending: 'Pending',
};

const state = {
	todos: [],
};

const initStore = () => {
	loadStore();
	console.log('InitStore 🔶▶');
};

const loadStore = () => {
	if (!localStorage.getItem('todosStates')) return;

	const { todos = [], filter = Filter.All } = JSON.parse(
		localStorage.getItem('todosStates'),
	);

	state.todos = todos;
	state.filter = filter;
};

const saveStateToLocalStorage = () => {
	localStorage.setItem('todosStates', JSON.stringify(state));
};

/**
 *
 * @param { Filter } filter Object de todo.steore
 */

const getTodos = (filter = Filter.All) => {
	switch (filter) {
		case Filter.All:
			return [...state.todos];

		case Filter.Completed:
			return state.todos.filter((todo) => todo.done);

		case Filter.Pending:
			return state.todos.filter((todo) => !todo.done);

		default:
			throw new Error(`Option ${filter} is not valid.`);
	}
};

/**
 *
 * @param {String} descripcion
 */

const addTodo = (description) => {
	if (!description) throw new Error('Description is requerided');
	state.todos.push(new Todo(description));
	saveStateToLocalStorage();
};

/**
 * Cambia estado de completado (done)
 * @param {String} todoId : identificador todo
 */
const toggleTodo = (todoId) => {
	state.todos = state.todos.map((todo) => {
		if (todo.id === todoId) {
			todo.done = !todo.done;
		}
		return todo;
	});

	saveStateToLocalStorage();
};
/**
 *
 * @param {String} todoId : identificador todo
 */
const deleteTodo = (todoId) => {
	console.log(todoId);
	state.todos = state.todos.filter((todo) => todo.id != todoId);
	saveStateToLocalStorage();
};

const deleteCompleted = () => {
	state.todos = state.todos.filter((todo) => !todo.done);
	saveStateToLocalStorage();
};

/**
 *
 * @param {Filter} newFilter type Filter
 */
const setFilter = (newFilter = Filter.All) => {
	if (!Object.keys(Filter).includes(newFilter)) throw new Error('The Filter is no valid'); //All, Pending, Completed

	state.filter = newFilter;
	saveStateToLocalStorage();
};

const getCurrentFilter = () => {
	return state.filter;
};

export default {
	addTodo,
	deleteCompleted,
	deleteTodo,
	getCurrentFilter,
	initStore,
	loadStore,
	setFilter,
	toggleTodo,
	getTodos,
	Filter,
};
