(function () {
	const t = document.createElement('link').relList;
	if (t && t.supports && t.supports('modulepreload')) return;
	for (const o of document.querySelectorAll('link[rel="modulepreload"]')) d(o);
	new MutationObserver((o) => {
		for (const n of o)
			if (n.type === 'childList')
				for (const p of n.addedNodes)
					p.tagName === 'LINK' && p.rel === 'modulepreload' && d(p);
	}).observe(document, { childList: !0, subtree: !0 });
	function i(o) {
		const n = {};
		return (
			o.integrity && (n.integrity = o.integrity),
			o.referrerPolicy && (n.referrerPolicy = o.referrerPolicy),
			o.crossOrigin === 'use-credentials'
				? (n.credentials = 'include')
				: o.crossOrigin === 'anonymous'
				? (n.credentials = 'omit')
				: (n.credentials = 'same-origin'),
			n
		);
	}
	function d(o) {
		if (o.ep) return;
		o.ep = !0;
		const n = i(o);
		fetch(o.href, n);
	}
})();
let f;
const S = new Uint8Array(16);
function E() {
	if (
		!f &&
		((f =
			typeof crypto < 'u' &&
			crypto.getRandomValues &&
			crypto.getRandomValues.bind(crypto)),
		!f)
	)
		throw new Error(
			'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported',
		);
	return f(S);
}
const r = [];
for (let e = 0; e < 256; ++e) r.push((e + 256).toString(16).slice(1));
function L(e, t = 0) {
	return (
		r[e[t + 0]] +
		r[e[t + 1]] +
		r[e[t + 2]] +
		r[e[t + 3]] +
		'-' +
		r[e[t + 4]] +
		r[e[t + 5]] +
		'-' +
		r[e[t + 6]] +
		r[e[t + 7]] +
		'-' +
		r[e[t + 8]] +
		r[e[t + 9]] +
		'-' +
		r[e[t + 10]] +
		r[e[t + 11]] +
		r[e[t + 12]] +
		r[e[t + 13]] +
		r[e[t + 14]] +
		r[e[t + 15]]
	);
}
const C = typeof crypto < 'u' && crypto.randomUUID && crypto.randomUUID.bind(crypto),
	T = { randomUUID: C };
function A(e, t, i) {
	if (T.randomUUID && !t && !e) return T.randomUUID();
	e = e || {};
	const d = e.random || (e.rng || E)();
	if (((d[6] = (d[6] & 15) | 64), (d[8] = (d[8] & 63) | 128), t)) {
		i = i || 0;
		for (let o = 0; o < 16; ++o) t[i + o] = d[o];
		return t;
	}
	return L(d);
}
class D {
	constructor(t) {
		(this.id = A()),
			(this.description = t),
			(this.done = !1),
			(this.createdAt = new Date());
	}
}
const a = { All: 'All', Completed: 'Completed', Pending: 'Pending' },
	l = { todos: [] },
	I = () => {
		b(), console.log('InitStore 🔶▶');
	},
	b = () => {
		if (!localStorage.getItem('todosStates')) return;
		const { todos: e = [], filter: t = a.All } = JSON.parse(
			localStorage.getItem('todosStates'),
		);
		(l.todos = e), (l.filter = t);
	},
	h = () => {
		localStorage.setItem('todosStates', JSON.stringify(l));
	},
	P = (e = a.All) => {
		switch (e) {
			case a.All:
				return [...l.todos];
			case a.Completed:
				return l.todos.filter((t) => t.done);
			case a.Pending:
				return l.todos.filter((t) => !t.done);
			default:
				throw new Error(`Option ${e} is not valid.`);
		}
	},
	O = (e) => {
		if (!e) throw new Error('Description is requerided');
		l.todos.push(new D(e)), h();
	},
	F = (e) => {
		(l.todos = l.todos.map((t) => (t.id === e && (t.done = !t.done), t))), h();
	},
	U = (e) => {
		console.log(e), (l.todos = l.todos.filter((t) => t.id != e)), h();
	},
	q = () => {
		(l.todos = l.todos.filter((e) => !e.done)), h();
	},
	x = (e = a.All) => {
		if (!Object.keys(a).includes(e)) throw new Error('The Filter is no valid');
		(l.filter = e), h();
	},
	k = () => l.filter,
	c = {
		addTodo: O,
		deleteCompleted: q,
		deleteTodo: U,
		getCurrentFilter: k,
		initStore: I,
		loadStore: b,
		setFilter: x,
		toggleTodo: F,
		getTodos: P,
		Filter: a,
	},
	M = `<section class="todoapp">\r
    <header class="header">\r
        <h1>Tareas</h1>\r
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
    </header>\r
    \r
    <!-- This section should be hidden by default and shown when there are todos -->\r
    <section class="main">\r
        <input id="toggle-all" class="toggle-all" type="checkbox">\r
        <label for="toggle-all">Mark all as complete</label>\r
        <ul class="todo-list">\r
            <!-- These are here just to show the structure of the list items -->\r
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
            <!-- <li class="completed" data-id="abc">\r
                <div class="view">\r
                    <input class="toggle" type="checkbox" checked>\r
                    <label>Probar JavaScript</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Create a TodoMVC template">\r
            </li> -->\r
            <!-- <li>\r
                <div class="view">\r
                    <input class="toggle" type="checkbox">\r
                    <label>Comprar un unicornio</label>\r
                    <button class="destroy"></button>\r
                </div>\r
                <input class="edit" value="Rule the web">\r
            </li> -->\r
        </ul>\r
    </section>\r
\r
    <!-- Este pie de página debe ocultarse de forma predeterminada y mostrarse cuando hay TODOs -->\r
    <footer class="footer">\r
        <!-- Esto debería ser "0 elementos dejados" de forma predeterminada-->\r
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
        <!-- Eliminar esto si no implementa el enrutamiento -->\r
        <ul class="filters">\r
            <li>\r
                <!-- selected -->\r
                <a class=" filtro selected" class="selected" href="#/">Todos</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/active">Pendientes</a>\r
            </li>\r
            <li>\r
                <a class="filtro" href="#/completed">Completados</a>\r
            </li>\r
        </ul>\r
        <!-- Oculto si no quedan artículos completos↓ -->\r
        <button class="clear-completed">Borrar completados</button>\r
    </footer>\r
</section>\r
\r
\r
<footer class="info">\r
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
    <!-- Change this out with your name and url ↓ -->\r
    <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`,
	R = (e) => {
		if (!e) throw new Error('Arg Todo object is requerided');
		const { done: t, description: i, id: d } = e,
			o = `
	
	<div class="view">
		<input class="toggle" type="checkbox" ${t ? 'checked' : ''}>
		<label>${i}</label>
		<button class="destroy"></button>
	</div>
	<input class="edit" value="Create a TodoMVC template">
    `,
			n = document.createElement('li');
		return (
			n.setAttribute('data-id', d),
			(n.innerHTML = o),
			t && n.classList.add('completed'),
			n
		);
	};
let g;
const V = (e, t = []) => {
	if ((g || (g = document.querySelector(e)), !g))
		throw new Error(`Element ${g} not found`);
	(g.innerHTML = ''),
		t.forEach((i) => {
			g.append(R(i));
		});
};
let y;
const H = (e) => {
		if ((y || (y = document.querySelector(e)), !y))
			throw new Error(`Element ${e} not found`);
		y.innerHTML = c.getTodos(c.Filter.Pending).length;
	},
	u = {
		TodoList: '.todo-list',
		newTodoInput: '#new-todo-input',
		clearCompleted: '.clear-completed',
		todoFilters: '.filtro',
		pendienteDisplay: '#pending-count',
	},
	$ = (e) => {
		const t = () => {
				const s = c.getTodos(c.getCurrentFilter());
				V(u.TodoList, s), i();
			},
			i = () => {
				console.log(u.pendienteDisplay), H(u.pendienteDisplay);
			};
		(() => {
			const s = document.createElement('div');
			(s.innerHTML = M), document.querySelector(e).append(s), t();
		})();
		const d = document.querySelector(u.newTodoInput),
			o = document.querySelector(u.TodoList),
			n = document.querySelector(u.clearCompleted),
			p = document.querySelectorAll(u.todoFilters);
		d.addEventListener('keyup', (s) => {
			s.keyCode === 13 &&
				s.target.value.trim().length !== 0 &&
				(c.addTodo(s.target.value), t(), (s.target.value = ''));
		}),
			o.addEventListener('click', (s) => {
				const m = s.target.closest('li');
				c.toggleTodo(m.getAttribute('data-id')), t();
			}),
			o.addEventListener('click', (s) => {
				if (!s.target.matches('.destroy')) return;
				const m = s.target.closest('[data-id]');
				c.deleteTodo(m.getAttribute('data-id')), t();
			}),
			n.addEventListener('click', () => {
				c.deleteCompleted(), t();
			}),
			p.forEach((s) => {
				s.addEventListener('click', (m) => {
					p.forEach((v) => v.classList.remove('selected')),
						m.target.classList.add('selected');
					const w = { Todos: 'All', Pendientes: 'Pending', Completados: 'Completed' }[
						m.target.textContent
					];
					c.setFilter(c.Filter[w]), t();
				});
			});
	};
c.initStore();
$('#app');
