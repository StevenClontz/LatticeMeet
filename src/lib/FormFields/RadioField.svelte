<script lang="ts">
    export let errors: string[] | undefined
    export let options: {label:string, value:string, description?:string}[] = []
    export let value: string | null = options[0].value
    export let name: string
</script>


<div>
    <label for={name}><slot/>
    {#if errors}<span class="invalid">{errors}</span>{/if}</label>
    {#each options as option}
        <label>
            <input
                type="radio"
                {name}
                bind:group={value}
                value={option.value} />
            {option.label}
        </label>
        {#if option.description}
        <p>
            <small>
                {option.description}
            </small>
        </p>
        {/if}
    {/each}
</div>

<style>
	.invalid {
	  	color: red;
	}
</style>