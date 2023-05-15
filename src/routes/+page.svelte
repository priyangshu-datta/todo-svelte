<script lang="ts">
	import Todo from './todo.svelte'
	import type { PageData } from './$types'
	import { SlideToggle, drawerStore, type DrawerSettings, Paginator } from '@skeletonlabs/skeleton'
	import { goto } from '$app/navigation'
	import { navigating, page } from '$app/stores'
	import Loading from '$lib/components/loading.svelte'

	export let data: PageData

	let offset = 0
	let amounts = [5, 10, 15, data.take]
	let limit = amounts[0]

	$: paginator = {
		offset,
		limit,
		size: data.take,
		amounts
	}

	$: source = data.todos.slice(
		paginator.offset * paginator.limit,
		paginator.offset * paginator.limit + paginator.limit
	)

	const onpagechange = (e) => {
		offset = e.detail
	}

	const onamountchange = (e) => {
		offset = 0
		limit = e.detail
	}

	let completed = $page.url.searchParams.get('status') === 'true'

	const updateView = () => {
		completed = !completed
		goto(`/?status=${completed}`)
	}

	const drawerSetting: DrawerSettings = {
		position: 'bottom',
		height: 'h-[35%]',
		width: 'w-[90%] md:w-[50%]',
		regionDrawer: 'translate-y-[-10%] translate-x-[5%] md:translate-x-[50%]',
		rounded: 'rounded-lg',
		bgBackdrop: 'bg-gradient-to-tr from-black/40 to-black/40'
	}
</script>

<input type="hidden" name="" class="bottom-12 to-blac" />

<Loading loading={$navigating !== null} className="absolute inset-0 h-[200px] w-[200px] m-auto">
	<div slot="loaded" class="mb-[4.5rem] mx-4">
		<div class="flex justify-end my-4 items-center gap-4">
			<Paginator bind:settings={paginator} on:page={onpagechange} on:amount={onamountchange} />
			<SlideToggle size="" name="slider-label" bind:checked={completed} on:click={updateView} />
		</div>
		<div class="grid gap-3 lg:grid-cols-3 md:grid-cols-2">
			{#each source as todo}
				<Todo {todo} />
			{/each}
		</div>
	</div>
</Loading>

<div class="absolute bottom-0 inset-x-0 h-[5rem] grid place-items-center">
	<button
		class="btn bg-gradient-to-br variant-gradient-primary-secondary"
		on:click={() => drawerStore.open(drawerSetting)}>Add Todo</button
	>
</div>

<!-- <Todo todo={{ completed: false, id: 0, todo: '' }} opacity={0} /> -->
<!-- <div class="h-full grid grid-cols-2 gap-10"> -->
<!-- <aside> -->
<!-- <section class="card p-4 h-full"> -->

<!-- </section> -->
<!-- </aside> -->
<!-- <main class="bg-slate-600">
					<AddTodo />
				</main> -->
<!-- </div> -->
<!-- 
<style>
	aside {
		position: relative;
		width: 100%;
		min-width: max-content;
		margin: 1rem;
	}
	section {
		scrollbar-width: none;
		overflow: auto;
		position: absolute;
		bottom: 0;
		width: 100%;
		min-width: max-content;
	}
</style> -->
