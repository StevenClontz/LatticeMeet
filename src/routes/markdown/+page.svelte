<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
    import CodeMirror from "svelte-codemirror-editor";
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
    import { markdown } from "@codemirror/lang-markdown";
	let md = `
## Sample Markdown text

Markdown supports [links](https://topology.pi-base.org), **bold** and
*italics*, and $\\LaTeX$ mathematical typesetting:
$x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.

To create multiple paragarphs, insert a blank line between the paragraphs.
	`.trim()
</script>

<h3>Using Markdown + LaTeX</h3>

<p>
	Abstracts may be authored using a mix of
	<a href="https://www.markdownguide.org/">Markdown</a> for
	most content, and <a href="https://www.latex-project.org/">LaTeX</a>
	for mathematical typesetting. The editor below can be used to practice.
</p>

<p>
	<small>
		(Note: some math notation may not render correctly in some browsers - we're working to fix this!)
	</small>
</p>

<hr/>

<div>
	<CodeMirror 
		bind:value={md}
		lang={markdown()}
		lineWrapping/>
</div>

<div>
	<Markdown {md} {plugins}/>
</div>