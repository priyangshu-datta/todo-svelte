import type { PageLoad } from './$types'
import type { response } from '$lib/types'

export const load: PageLoad = async ({ fetch, url }) => {
	const status = url.searchParams.get('status') === 'true'

	console.log('loaded 🆗')

	let resp = (await (await fetch(`/api/todos?take=30&completed=${status}`)).json()) as response

	if (!resp.success) {
		throw new Error(resp.error.message)
	}

	return resp.data
}
