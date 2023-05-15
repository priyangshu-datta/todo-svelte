<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<!-- <ol class="list">
	{#each data.todos as todo, index}
		<li>
			<span>
				{index + 1}.
			</span>
			<span>
				{todo.todo}
			</span>
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style-type: decimal;
	}
</style> -->

<pre>
    {JSON.stringify(data, null, 4)}
</pre>
