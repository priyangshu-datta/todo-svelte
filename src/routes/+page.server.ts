import type { response } from '$lib/types.js'
import { fail } from '@sveltejs/kit'

export const actions = {
	editTodo: async ({ request, fetch }) => {
		const form = await request.formData()
		const id = parseInt(String(form.get('id')))
		const todo = String(form.get('todo'))
		const completed = String(form.get('completed')) === 'true'

		if (isNaN(id))
			return {
				data: {},
				success: false,
				error: { message: 'Invalid details' }
			}

		form.set('id', `${id}`)
		form.set('todo', todo)
		form.set('completed', `${completed}`)

		console.log({ id, todo, completed })

		const resp = await fetch('/api/todos', {
			method: 'put',
			body: form
		})
		const data: response = await resp.json()

		return {
			data: {
				todos: data.data.todos
			},
			success: data.success,
			error: data.error
		}
	},
	addTodo: async ({ request, fetch }) => {
		const form = await request.formData()
		const todo = form.get('todo')
		const completed = form.get('completed')

		if (todo === null || completed === null)
			return fail(400, {
				data: {},
				success: false,
				error: {
					message: 'Bad request'
				}
			})

		const resp = await fetch('/api/todos', {
			method: 'post',
			body: form
		})
		const data: response = await resp.json()
		return {
			...data
		}
	},
	deleteTodo: async ({ request, fetch }) => {
		const form = await request.formData()

		const resp = await fetch('/api/todos', {
			method: 'delete',
			body: form
		})
		const data: response = await resp.json()

		return {
			...data
		}
	}
}
