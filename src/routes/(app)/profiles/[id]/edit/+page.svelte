<script lang="ts">
	import type { PageData } from './$types';
	import { dev } from '$app/environment';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
  	import Gravatar from '$lib/Gravatar.svelte'

	import{ TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);
</script>

<h2 style="margin-top:0">Edit Profile</h2>

<form method="POST">
	<fieldset>
		<label>
			Account Email
			<input name="email" disabled type="text" value={data.profile?.email}/>
		</label>

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
	  

		<div><button>Submit</button></div>
	</fieldset>
</form>

{#if dev}
	<SuperDebug data={$form} />
{/if}

<hr/>

<div>
	<p>
		Update the Gravatar associated with
		<code>{data.profile.email}</code>
		at <a href="https://gravatar.com/" target="_blank">Gravatar.com</a>.
	</p>
	<p style="text-align:center">
		<Gravatar email={data.profile.email} size={150} rating="pg"/>
	</p>
</div>


