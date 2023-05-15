export type todo = {
	id: number
	todo: string
	completed: boolean
}

export type response = {
	data: {
		todos: todo[]
		take?: number
		total?: number
	}
	success: boolean
	error: {
		message?: string
	}
}
