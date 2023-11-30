<script lang="ts">
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import{ CodeMirrorField, TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);

	const handleSubmit = (e:Event) => {
		if (!confirm("Do you want to submit? (Submissions cannot be edited later.)")) {
			e.preventDefault();
		}
	}
</script>

{#if data.existingSubmission}
	Your submission <i>{data.existingSubmission.title}</i> has been received.
{:else}

	<h2 style="margin-top:0">New Submission for {data.collection.short_title}: {data.collection.title}</h2>

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

	{#if dev}
		<SuperDebug data={$form} />
	{/if}

{/if}