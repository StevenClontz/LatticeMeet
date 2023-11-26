<script lang="ts">
	import type { PageData } from './$types';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);
</script>

<h2 style="margin-top:0">Edit Profile</h2>

<form method="POST">
	<fieldset>
		<label for="first_name">First Name</label>
		<input
			type="text"
			name="first_name"
			aria-invalid={$errors.first_name ? 'true' : undefined}
			bind:value={$form.first_name}
			{...$constraints.first_name} />
		{#if $errors.first_name}<span class="invalid">{$errors.first_name}</span>{/if}
	  
		<label for="last_name">Last Name</label>
		<input
			type="text"
			name="last_name"
			aria-invalid={$errors.last_name ? 'true' : undefined}
			bind:value={$form.last_name}
			{...$constraints.last_name} />
		{#if $errors.last_name}<span class="invalid">{$errors.last_name}</span>{/if}

		<label for="affiliation">Affiliation</label>
		<input
			type="text"
			name="affiliation"
			aria-invalid={$errors.affiliation ? 'true' : undefined}
			bind:value={$form.affiliation}
			{...$constraints.affiliation} />
		{#if $errors.affiliation}<span class="invalid">{$errors.affiliation}</span>{/if}
		  
		<label for="website">Website</label>
		<input
			type="url"
			name="website"
			aria-invalid={$errors.website ? 'true' : undefined}
			bind:value={$form.website}
			{...$constraints.website} />
		{#if $errors.website}<span class="invalid">{$errors.website}</span>{/if}
	  

		<div><button>Submit</button></div>
	</fieldset>
</form>

<SuperDebug data={$form} />

<style>
	.invalid {
	  	color: red;
	}
</style>
