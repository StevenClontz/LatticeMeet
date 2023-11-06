<script lang="ts">
	import Markdown from 'svelte-exmarkdown';

	export let data

	$: collection = data.collection;
	$: subcollections = collection.collections.sort((c:any,d:any)=>c.short_title.localeCompare(d.short_title))
	$: parent = data.parent;
</script>

<h2>
	{collection.short_title}: {collection.title}
	{#if collection.website && collection.website !== ""}
		<small>[<a style="color:gray" href={collection.website}>Website</a>]</small>
	{/if}
</h2>

{#if parent}
	<p>A subcollection of <a href={`/collections/${parent.id}`}>{parent.short_title}</a></p>
{/if}

<Markdown md={collection.description}/>

{#if subcollections.length > 0}
	<h3>Subcollections</h3>
	<ul>
		{#each subcollections as c }
			<li>
				<h4 style="margin:0">{c.short_title}</h4>
				<div>
					<a href={`/collections/${c.id}`}>{c.title}</a>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<h3>Submit</h3>
{/if}