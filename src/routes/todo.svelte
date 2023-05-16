<script lang="ts">
	import Icon from '@iconify/svelte'
	import type { todo } from '$lib/types'
	import { enhance } from '$app/forms'
	import type { SubmitFunction } from '@sveltejs/kit'
	import Loading from '$lib/components/loading.svelte'
	import { createEventDispatcher } from 'svelte'

	export let todo: todo
	let { todo: t_text, id: _, completed: t_complete } = todo
	let submit = false
	export let opacity: number = 1
	export let loading: boolean = false

	let del = false

	let formSubmit: SubmitFunction = ({ data, cancel }) => {
		if (del) {
			del = false
			const id = `${todo.id}`
			data.set('id', id)
		} else {
			loading = true
			new Promise((resolve) => setTimeout(resolve, 2000))
			const id = `${todo.id}`
			const todo_text = todo.todo
			const completed = todo.completed

			if (id === null || todo_text === null || (todo_text === t_text && completed === t_complete)) {
				cancel()
				loading = false
			}

			data.set('id', id)
			data.set('todo', todo_text)
			data.set('completed', `${completed}`)
		}
		return ({ update }) => {
			update({ reset: true })
			loading = false
		}
	}
	let form: HTMLFormElement
</script>

<form
	bind:this={form}
	action="?/editTodo"
	method="post"
	use:enhance={formSubmit}
	class="relative w-full input-group input-group-divider grid-cols-[auto_1fr] card p-4 mb-2 opacity-{opacity}"
>
	<Loading {loading} className="absolute inset-0 h-[120px] w-[120px] m-auto">
		<svelte:fragment slot="loaded">
			<div class="flex-col">
				<input
					class="checkbox"
					type="checkbox"
					name="completed"
					bind:checked={todo.completed}
					on:change={() => {
						form.requestSubmit()
					}}
				/>
				<button
					class="px-1"
					on:click={() => {
						submit = !submit
					}}
					type={submit ? 'button' : 'submit'}
				>
					<Icon icon={submit ? 'mdi:tick' : 'mdi:edit'} width="26" />
				</button>
				<button
					formaction="?/deleteTodo"
					on:click={() => {
						del = true
					}}
				>
					<Icon icon="mdi:trash" width="28" />
				</button>
			</div>
			<input type="hidden" name="id" bind:value={todo.id} />
			{#if submit}
				<textarea class="textarea" bind:value={todo.todo} name="todo" rows="4" />
			{:else}
				<div class="card p-4 text-center !bg-transparent">{todo.todo}</div>
			{/if}
		</svelte:fragment>
	</Loading>
</form>

<style lang="scss">
	form > div {
		justify-content: space-around;
		padding: 0;
		padding-right: 1rem;

		& * {
			padding: 0;
		}
	}
	form {
		height: 9.25rem;
	}
</style>
