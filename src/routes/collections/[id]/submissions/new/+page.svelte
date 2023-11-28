<script lang="ts">
	import type { PageData } from './$types';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import{ CodeMirrorField, TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);
</script>

<h2 style="margin-top:0">New Submission</h2>

<form method="POST">
	<fieldset>
		<TextField
			name="first_name"
			errors={$errors.first_name}
			bind:value={$form.first_name}
			constraints={$constraints.first_name}>
			First Name
		</TextField>

		<TextField
			name="last_name"
			errors={$errors.last_name}
			bind:value={$form.last_name}
			constraints={$constraints.last_name}>
			Last Name
		</TextField>

		<TextField
			name="affiliation"
			errors={$errors.affiliation}
			bind:value={$form.affiliation}
			constraints={$constraints.affiliation}>
			Affiliation
		</TextField>

		<UrlField
			name="website"
			errors={$errors.website}
			bind:value={$form.website}
			constraints={$constraints.website}>
			Website
		</UrlField>

		<TextField
			name="title"
			preview="md"
			errors={$errors.title}
			bind:value={$form.title}
			constraints={$constraints.title}>
			Title
		</TextField>

		<CodeMirrorField
			name="abstract"
			preview="md"
			errors={$errors.abstract}
			bind:value={$form.abstract}
			constraints={$constraints.abstract}>
			Abstract
		</CodeMirrorField>
	  

		<div><button>Submit</button></div>
	</fieldset>
</form>

<SuperDebug data={$form} />
