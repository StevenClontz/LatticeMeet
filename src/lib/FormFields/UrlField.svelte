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

<div>
    <label for={name}><slot/> (include <code>http://</code> or <code>https://</code>)
    {#if errors}<span class="invalid">{errors}</span>{/if}</label>
    <input
        type="url"
        {name}
        aria-invalid={errors ? 'true' : undefined}
        bind:value={value}
        {...constraints} />
</div>

<style>
	.invalid {
	  	color: red;
	}
</style>