<script lang="ts">
    export let errors: string[] | undefined
    export let options: {label:string, value:string}[] = []
    export let value: string | null = options[0].value
    export let name: string
</script>


<div>
    <label for={name}><slot/>
    {#if errors}<span class="invalid">{errors}</span>{/if}</label>
	<select bind:value={value}>
        {#each options as option}
            <option value={option.value}>
                {option.label}
            </option>
        {/each}
	</select>
</div>

<style>
	.invalid {
	  	color: red;
	}
</style>