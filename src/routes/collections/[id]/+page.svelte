<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	export let data

	$: collection = data.collection;
	$: description = data.collection.description
	$: subcollections = data.subcollections
	$: parent = data.parent;
	$: submissions = data.submissions
</script>


{#if parent}
	<p>
		<small>[<a style="color:#444444" href={`/collections/${parent.id}`}>Go back to {parent.short_title}</a>]</small>
	</p>
{/if}

<h2 style="margin-top:0">
	{collection.short_title}: {collection.title}
</h2>

{#if collection.website && collection.website !== ""}
	<p>
		<small>[<a style="color:#444444" href={collection.website}>Website</a>]</small>
	</p>
{/if}

<Markdown md={description || ""} {plugins}/>

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
	<p><a href={`/collections/${collection.id}/submissions/new`}>Submissions are now open on this page.</a></p>
	{#if submissions && submissions.length > 0}
		<h3>Submissions</h3>
		{#each submissions as submission}
			<article>
				<h3><Markdown md={submission.title || ""} {plugins}/></h3>
				<p><a href={`/profiles/${submission.profile_id}`}>Submitter profile</a></p>
				<h4>Abstract</h4>
				<div>
					<Markdown md={submission.abstract || ""} {plugins}/>
				</div>
			</article>
		{/each}
	{/if}
{/if}