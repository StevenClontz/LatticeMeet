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
		{#if collection.website && collection.website !== ""}
			<p><a href={collection.website}>Website</a></p>
		{/if}
		<Markdown md={collection.description}/>
	{/each}