<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from '$lib/Avatar.svelte'

	import ProfileFields from '$lib/ProfileFields.svelte';

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let loading = false
	let firstName: string = profile?.first_name ?? ''
	let lastName: string = profile?.last_name ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''
	let orcidId: string = profile?.orcid_id ?? ''

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}
</script>

<h2>Your Profile</h2>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<span class="label">Email</span>
			<span id="email">{session?.user.email}</span>
		</div>

		<ProfileFields
			firstName={form?.firstName ?? firstName}
			lastName={form?.lastName ?? lastName}
			orcidId={form?.orcidId ?? orcidId}
			website={form?.website ?? website}
			approved={profile.approved}/>

		<div>
			<span class="label">Photo</span>
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
	</form>
</div>
