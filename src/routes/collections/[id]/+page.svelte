<script lang="ts">
	import appTitle from '$lib/appTitle.js';
	import Markdown from 'svelte-exmarkdown';

	export let data

	let { collection } = data
</script>

<h2>{collection.title}</h2>
{#if collection.website && collection.website !== ""}
	<p><a href={collection.website}>Website</a></p>
{/if}
<Markdown md={collection.description}/>