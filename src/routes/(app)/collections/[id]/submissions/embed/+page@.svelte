<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	import appTitle from '$lib/appTitle';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	export let data
	
	$: collection = data.collection
    $: acceptedSubmissions = data.acceptedSubmissions

</script>

<h3>Submissions accepted for {collection.short_title}: {collection.title}</h3>
{#if acceptedSubmissions && acceptedSubmissions.length > 0}
	{#each acceptedSubmissions as submission}
		<article>
			<h3><Markdown md={submission.title || ""} {plugins}/></h3>
			<p>
				Submitting author:
				<a href={`/profiles/${submission.profile_id}`}>{submission.first_name} {submission.last_name}</a>,
				{submission.affiliation}
			</p>
			<h4>Abstract</h4>
			<div>
				<Markdown md={submission.abstract || ""} {plugins}/>
			</div>
		</article>
	{/each}
{:else}
	<p>No submissions have been accepted yet for this collection.</p>
{/if}

<p style="font-style:italic;text-align:center;margin-top:1em">
	Powered by <a href="https://scholarlattice.pi-base.org">{appTitle}</a>
</p>