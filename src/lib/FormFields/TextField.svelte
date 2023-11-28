<script lang="ts">
	import { Markdown, type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';

    export let errors: string[] | undefined
    export let constraints:  Partial<{
        pattern: string;
        min: string | number;
        max: string | number;
        required: boolean;
        step: number | "any";
        minlength: number;
        maxlength: number;
    }> | undefined
    export let value: string | null
    export let name: string
    export let preview: "md" | null = null

    $: md = value || ""
    
    const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
</script>

<label for={name}><slot/></label>
<input
    type="text"
    {name}
    aria-invalid={errors ? 'true' : undefined}
    bind:value={value}
    {...constraints} />

{#if preview === "md"}
    <div>
        <small><slot/> Preview (<code>$\LaTeX$</code> supported)</small>
        <blockquote>
            <Markdown {md} {plugins}/>
        </blockquote>
    </div>
{/if}

{#if errors}<span class="invalid">{errors}</span>{/if}


<style>
	.invalid {
	  	color: red;
	}
</style>