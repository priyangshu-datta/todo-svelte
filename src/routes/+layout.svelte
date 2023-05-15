<script lang="ts">
	// Your selected Skeleton theme:
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css'

	// This contains the bulk of Skeletons required styles:
	// NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css'

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../global.css'

	import { AppBar, AppShell, Drawer } from '@skeletonlabs/skeleton'

	import AddTodo from './addTodo.svelte'
	import { navigating } from '$app/stores'
	import Loading from '$lib/components/loading.svelte'
</script>

<Drawer>
	<AddTodo />
</Drawer>

<AppShell>
	<svelte:fragment slot="pageHeader">
		<AppBar>
			<h1 class="text-4xl">Todo App</h1>
		</AppBar>
	</svelte:fragment>
	<Loading loading={$navigating !== null} className="absolute inset-0 h-[200px] w-[200px] m-auto">
		<div slot="loaded">
			<slot />
		</div>
	</Loading>
</AppShell>
