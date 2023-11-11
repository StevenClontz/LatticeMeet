<script lang="ts">
	import type { PageData } from './$types';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Avatar from '$lib/Avatar.svelte'

	import ProfileFields from '$lib/ProfileFields.svelte';

	export let data:PageData

	const { form } = superForm(data.form);
</script>

<h2 style="margin-top:0">Your Profile</h2>

<SuperDebug data={$form} />

<form method="POST">
	<fieldset>
		<label for="first_name">First Name</label>
		<input type="text" name="first_name" bind:value={$form.first_name} />
	  
		<label for="last_name">Last Name</label>
		<input type="text" name="last_name" bind:value={$form.last_name} />
	  
		<label for="website">Website</label>
		<input type="url" name="website" bind:value={$form.website} />
	  
		<label for="orcid_id">ORCID ID</label>
		<input type="url" name="orcid_id" bind:value={$form.orcid_id} />
	  
		<div><button>Submit</button></div>
	</fieldset>
</form>

<!-- <div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<fieldset>

		<ProfileFields
			firstName={form?.firstName ?? firstName}
			lastName={form?.lastName ?? lastName}
			orcidId={form?.orcidId ?? orcidId}
			website={form?.website ?? website}
			approved={profile.approved}
			id={profile.id}/>

		<div>
			<div id="avatar">
				<Avatar
					field
					{supabase}
					bind:url={avatarUrl}
					size={10}
					on:upload={() => {
						profileForm.requestSubmit()
					}}
				/>
			</div>
		</div>

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
		</fieldset>
	</form>
</div> -->
