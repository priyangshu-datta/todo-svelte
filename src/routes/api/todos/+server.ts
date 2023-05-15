import { db } from '$lib/db'
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types.js'
import type { response, todo } from '$lib/types.js'

export const GET: RequestHandler = async ({ url }) => {
	let todos: todo[]

	db.subscribe((ts) => {
		todos = ts.todos
	})

	const start = parseInt(url.searchParams.get('start') ?? '0')
	let take = parseInt(url.searchParams.get('take'))
	take = isNaN(take) ? todos.length - start + 1 : take
	const completed =
		url.searchParams.get('completed')?.toString() === undefined
			? null
			: url.searchParams.get('completed')?.toString() === 'true'

	let returned_todos =
		completed === null
			? todos.slice(start, start + take)
			: todos.filter((t) => t.completed === completed).slice(start, start + take)

	const resp: response = {
		data: {
			todos: returned_todos,
			take: returned_todos.length,
			total: todos.length
		},
		success: true,
		error: {}
	}

	return json(resp)
}

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const todo = String(form.get('todo'))
	const completed = form.get('completed') === 'true'
	let id: number

	db.update(({ todos }) => {
		id = todos.length
		return { todos: [...todos, { id: todos.length, todo, completed }] }
	})

	const resp: response = {
		data: {
			todos: [
				{
					id,
					todo,
					completed
				}
			]
		},
		success: true,
		error: {}
	}

	return json(resp)
}

export const PUT: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const id = String(form.get('id'))
	const todo = String(form.get('todo'))
	const completed = String(form.get('completed'))

	if (id === null || todo === null || completed === null)
		return json({ data: {}, success: false, error: { message: 'Invalid details' } })

	db.update(({ todos }) => {
		todos = todos.map((t) => {
			if (t.id === parseInt(id)) {
				t['todo'] = todo
				t['completed'] = completed === 'true'
			}
			return t
		})
		return { todos }
	})

	const resp: response = {
		data: {
			todos: [
				{
					id: parseInt(id),
					todo,
					completed: completed === 'true'
				}
			]
		},
		success: true,
		error: {}
	}

	return json(resp)
}

export const DELETE: RequestHandler = async ({ request }) => {
	const form = await request.formData()
	const id = form.get('id')
	let todo: todo

	if (id === null)
		return json({ data: {}, success: false, error: { message: 'Bad request. Invalid ID.' } })

	db.update(({ todos }) => {
		todos = todos.filter((t) => {
			if (t.id === parseInt(String(id))) {
				todo = t

				return false
			}
			return true
		})

		return { todos }
	})

	const resp: response = {
		data: {
			todos: [
				{
					...todo
				}
			]
		},
		success: true,
		error: {}
	}

	return json(resp)
}
