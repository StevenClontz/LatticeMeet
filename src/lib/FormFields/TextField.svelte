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

<div>
    <label for={name}><slot/>
    {#if errors}<span class="invalid">{errors}</span>{/if}</label>
    <input
        type="text"
        {name}
        aria-invalid={errors ? 'true' : undefined}
        bind:value={value}
        {...constraints} />
    
    {#if preview === "md"}
        <div>
            <small><slot/> Preview
                <div style="padding:1em; border:1px solid #ddd">
                <Markdown {md} {plugins}/>
            </div>
        </div>
    {/if}
</div>


<style>
	.invalid {
	  	color: red;
	}
</style>