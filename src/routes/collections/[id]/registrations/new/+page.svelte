<script lang="ts">
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import{ RadioField, TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { existingRegistration } = data

	const { form, errors, constraints } = superForm(data.form);

	const handleSubmit = (e:Event) => {
		if (!confirm("Do you want to register? (Registrations cannot be edited later.)")) {
			e.preventDefault();
		}
	}

	let existingRegistrationOption = 
		data.registration_options.find(ro=>ro.id===existingRegistration?.registration_option_id) || null
</script>


{#if existingRegistration}
<p>
	You have registered as <b>{existingRegistrationOption?.title}</b>.
	Please contact administrators to change your registration.
</p>
{:else}

	<h2 style="margin-top:0">Register for {data.collection.short_title}: {data.collection.title}</h2>

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
		
			<RadioField
				name="registration_option_id"
				errors={$errors.registration_option_id}
				options={data.registration_options.map(ro=>{
					return {label: ro.title, description: ro.description, value: ro.id}
				})}
				bind:value={$form.registration_option_id}>
				Registration Option
			</RadioField>

			<div><button>Submit</button></div>
		</fieldset>
	</form>

	{#if dev}
		<SuperDebug data={$form} />
	{/if}

{/if}