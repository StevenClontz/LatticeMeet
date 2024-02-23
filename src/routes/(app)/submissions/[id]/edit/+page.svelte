<script lang="ts">
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import{ CodeMirrorField, TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);

	const handleSubmit = (e:Event) => {
		if (!confirm("Do you want to submit your edits?")) {
			e.preventDefault();
		}
	}
</script>

<h2 style="margin-top:0">Edit Submission for {data.collection.short_title}: {data.collection.title}</h2>

<p><small><a href={`/collections/${data.collection.id}`}>[Back to {data.collection.short_title}]</a></small></p>

<form method="POST" on:submit={handleSubmit}>
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
			Submission Title
		</TextField>

		<CodeMirrorField
			name="abstract"
			preview="md"
			errors={$errors.abstract}
			bind:value={$form.abstract}
			constraints={$constraints.abstract}>
			Submission Abstract
		</CodeMirrorField>

		<input type="hidden" name="id" value={$form.id}/>
		<input type="hidden" name="profile_id" value={$form.profile_id}/>
		<input type="hidden" name="collection_id" value={$form.collection_id}/>

		<div><button>Submit</button></div>
	</fieldset>
</form>

{#if dev}
	<SuperDebug data={$form} />
{/if}

