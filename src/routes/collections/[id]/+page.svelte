<script lang="ts">
	import Markdown from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	import type { Plugin } from 'svelte-exmarkdown';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	export let data

	$: collection = data.collection;
	$: subcollections = collection.collections.sort((c:any,d:any)=>c.short_title.localeCompare(d.short_title))
	$: parent = data.parent;
	$: submissions = data.submissions
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

<Markdown md={collection.description} {plugins}/>

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
	<h3>Submit to this Collection</h3>
	<p><a href={`/collections/${collection.id}/submit`}>Submissions are now open on this page.</a></p>
	{#if submissions && submissions.length > 0}
		<h3>Received Submissions</h3>
		{#each submissions as submission}
			<article>
				<h4><Markdown md={submission.title} {plugins}/></h4>
				<Markdown md={submission.abstract} {plugins}/>
			</article>
		{/each}
	{/if}
{/if}