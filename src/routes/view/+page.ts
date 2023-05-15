import type { PageLoad } from './$types'
import type { response } from '$lib/types'

export const load: PageLoad = async ({ fetch, url }) => {
	const status = url.searchParams.get('status') === 'true'

	console.log('loaded all 🆗')

	let resp = (await (
		await fetch(`/api/todos`)
	).json()) as response

	if (!resp.success) {
		throw new Error(resp.error.message)
	}

	return resp.data
}
