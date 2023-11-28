<script lang="ts">
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
</script>

<label for={name}><slot/></label>
<input
    type="text"
    {name}
    aria-invalid={errors ? 'true' : undefined}
    bind:value={value}
    {...constraints} />
{#if errors}<span class="invalid">{errors}</span>{/if}

<style>
	.invalid {
	  	color: red;
	}
</style>