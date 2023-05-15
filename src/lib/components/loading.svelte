<script lang="ts">
	import Icon from '@iconify/svelte'

	export let loading: boolean
	export let className: string = ''
</script>

{#if loading}
	<slot name="loading">
		<Icon icon="eos-icons:loading" class={`${className}`} />
	</slot>
{:else}
	<slot name="loaded" />
{/if}
