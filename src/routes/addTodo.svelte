<script lang="ts">
	import { Step, Stepper, drawerStore } from '@skeletonlabs/skeleton'
	import { enhance, type SubmitFunction } from '$app/forms'
	import Icon from '@iconify/svelte'

	let text: string = ''

	const submitHandle: SubmitFunction = ({ data, cancel }) => {
		drawerStore.close()

		const completed = data.get('completed') === 'on'

		if (text.length < 5) cancel()

		data.set('todo', text)
		data.set('completed', `${completed}`)
	}
	let flag = true
</script>

<div class="card top-0 absolute bottom-0 inset-x-0 m-auto p-4 grid gap-2">
	<form action="?/addTodo" method="post" use:enhance={submitHandle} class="grid gap-3">
		<header class="flex justify-between items-center">
			<h2 class="text-2xl">Add Todo</h2>
			<button
				type="submit"
				class="hover:bg-surface-50-900-token h-fit scale-150 mr-2 mb-1"
				on:pointerenter={() => {
					flag = false
				}}
				on:pointerleave={() => {
					flag = true
				}}
				>{#if flag}
					<Icon icon="mdi:tick" />
				{:else}
					<Icon icon="el:ok-circle" />
				{/if}
			</button>
		</header>
		<div class="grid gap-3">
			<input
				type="text"
				class="input px-3 py-2 rounded-lg"
				name="todo"
				bind:value={text}
				placeholder="I will..."
			/>
			<select name="priority" id="" class="select py-2 px-3">
				<option value="" hidden>Priority</option>
				{#each ['high', 'medium', 'low'] as priority}
					<option value={priority}>{priority}</option>
				{/each}
			</select>
			<input
				class="input px-3 py-[0.45rem] rounded-lg"
				type="text"
				name=""
				id=""
				placeholder="target"
				on:pointerdown={(e) => {
					e.currentTarget.setAttribute('type', 'datetime-local')
				}}
			/>
			<!-- <label for="completed" class="label flex items-center gap-2">
			<span>Completed</span>
			<input type="checkbox" name="completed" class="checkbox" checked={false} />
		</label> -->
			<!-- <div class="grid grid-cols-[1fr_3fr] place-items-center gap-3 text-center">
			<label for="priority">with</label>
			
		</div> -->
			<!-- <div class="grid grid-cols-[1fr_3fr] place-items-center gap-3 text-center">
			<label for="">within</label>
		</div> -->
			<!-- <Stepper
			buttonCompleteType="submit"
			buttonCompleteLabel="Add"
			buttonNextType="button"
			on:complete={() => drawerStore.close()}
		>
			<Step>
			</Step>
			<Step>
			</Step>
		</Stepper> -->
		</div>
	</form>
</div>
