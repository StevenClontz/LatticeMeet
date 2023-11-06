<script lang="ts">
	import Markdown from 'svelte-exmarkdown';

	export let data

	$: collection = data.collection;
	$: subcollections = collection.collections.sort((c:any,d:any)=>c.short_title.localeCompare(d.short_title))
	$: parent = data.parent;
</script>

<h2 style="margin-top:0">
	{collection.short_title}: {collection.title}
</h2>

<p>
	{#if collection.website && collection.website !== ""}
		<small>[<a style="color:#444444" href={collection.website}>Website</a>]</small>
	{/if}
	{#if parent}
		<small>[<a style="color:#444444" href={`/collections/${parent.id}`}>Go back to {parent.short_title}</a>]</small>
	{/if}
</p>

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
	<h3>Submit an Abstract</h3>
	<p><a href={`/collections/${collection.id}/submit`}>Submissions are now open on this page.</a></p>
	<h3>Accepted Abstracts</h3>
	<p>Coming soon.</p>
{/if}