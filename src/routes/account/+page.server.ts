import { fail, redirect, error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`full_name, website, avatar_url, orcid_id`)
		.eq('id', session.user.id)
		.single()
	
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	return { profile }
}

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		const fullName = formData.get('fullName') as string
		const website = formData.get('website') as string
		const avatarUrl = formData.get('avatarUrl') as string
		const orcidId = formData.get('orcidId') as string

		const session = await getSession()

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			full_name: fullName,
			website,
			avatar_url: avatarUrl,
			orcid_id: orcidId,
			updated_at: new Date()
		})

		if (error) {
			return fail(500, {
				fullName,
				website,
				avatarUrl,
				orcidId
			})
		}

		return {
			fullName,
			website,
			avatarUrl,
			orcidId
		}
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession()
		if (session) {
			await supabase.auth.signOut()
			throw redirect(303, '/login')
		}
	}
}
