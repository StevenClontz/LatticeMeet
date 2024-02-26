<script lang="ts">
	export let data
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Accepted Submissions for {data.collection.short_title}: {data.collection.title}
</h2>

<h3>Markdown source:</h3>
<textarea readonly style="width:100%">{data.markdown}</textarea>

<h3>
	Preview:
</h3>
<Markdown md={data.markdown} {plugins}/>