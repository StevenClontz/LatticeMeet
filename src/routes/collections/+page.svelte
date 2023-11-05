<script lang="ts">
	import appTitle from '$lib/appTitle.js';
	import Markdown from 'svelte-exmarkdown';

	export let data

	let { collections } = data
</script>

<h2>Collections</h2>

<ul>
	{#each collections as collection}
		<li>
			<p>
				{collection.title}
				<a href={`/collections/${collection.id}`}>Details</a>
			</p>
		</li>
	{/each}
</ul>
