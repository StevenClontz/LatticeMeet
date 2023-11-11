import { fail, redirect, error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession, getProfile } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}

	const profile = await getProfile() 

	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	return { profile }
}

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		const firstName = formData.get('firstName') as string
		const lastName = formData.get('lastName') as string
		const website = formData.get('website') as string
		const avatarUrl = formData.get('avatarUrl') as string
		const orcidId = formData.get('orcidId') as string

		const session = await getSession()
		if (!session) {
			throw redirect(303, '/login')
		}

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			first_name: firstName,
			last_name: lastName,
			website,
			avatar_url: avatarUrl,
			orcid_id: orcidId,
			updated_at: String(new Date())
		})

		if (error) {
			return fail(500, {
				firstName,
				lastName,
				website,
				avatarUrl,
				orcidId
			})
		}

		return {
			firstName,
			lastName,
			website,
			avatarUrl,
			orcidId
		}
	}
}
