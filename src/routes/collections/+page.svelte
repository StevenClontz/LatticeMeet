<script lang="ts">
	import appTitle from '$lib/appTitle.js';
	import Markdown from 'svelte-exmarkdown';

	export let data

	let { collections } = data
</script>

<h2>{appTitle} Collections</h2>

{#each collections as collection}
	<hr/>
	<h3>{collection.title}</h3>
	<Markdown md={collection.description}/>
	<p><a href={`/collections/${collection.id}`}>Details</a></p>
{/each}
