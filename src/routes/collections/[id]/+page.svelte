<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	export let data
</script>


{#if data.parent}
	<p>
		<small>[<a style="color:#444444" href={`/collections/${data.parent.id}`}>Go back to {data.parent.short_title}</a>]</small>
	</p>
{/if}

<h2 style="margin-top:0">
	{data.collection.short_title}: {data.collection.title}
</h2>

{#if data.collection.website && data.collection.website !== ""}
	<p>
		<small>[<a style="color:#444444" href={data.collection.website}>Website</a>]</small>
	</p>
{/if}

<Markdown md={data.collection.description || ""} {plugins}/>

{#if data.subcollections.length > 0}
	<h3>Subcollections</h3>
	<ul>
		{#each data.subcollections as c }
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
	{#if !data.existingSubmission}
		<p><a href={`/collections/${data.collection.id}/submissions/new`}>Submissions are now open on this page.</a></p>
	{:else}
    	Your submission <i>{data.existingSubmission.title}</i> has been received.
	{/if}
	{#if data.acceptedSubmissions && data.acceptedSubmissions.length > 0}
		<h3>Accepted Submissions</h3>
		{#each data.acceptedSubmissions as submission}
			<article>
				<h3><Markdown md={submission.title || ""} {plugins}/></h3>
				<p>
					Lead author:
					<a href={`/profiles/${submission.profile_id}`}>{submission.first_name} {submission.last_name}</a>,
					{submission.affiliation}
				</p>
				<h4>Abstract</h4>
				<div>
					<Markdown md={submission.abstract || ""} {plugins}/>
				</div>
			</article>
		{/each}
	{/if}
{/if}