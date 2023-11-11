import { fail, redirect, error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}

	const { data: collection } = await supabase
		.from('collections')
		.select(`*, collections(*)`)
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const profile = await getProfile()
			
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}


	const { data: submission } = await supabase
		.from('submissions')
		.select()
		.eq(`profile_id`, session.user.id)
		.eq(`collection_id`, params.id)
		.single()

	return { profile, collection, submission }
}

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		const firstName = formData.get('firstName') as string
		const lastName = formData.get('lastName') as string
		const website = formData.get('website') as string
		const avatarUrl = formData.get('avatarUrl') as string
		const orcidId = formData.get('orcidId') as string
		const title = formData.get('title') as string
		const abstract = formData.get('abstract') as string

		const session = await getSession()
		if (!session) {
			throw redirect(303, '/login')
		}

		const { data: submission } = await supabase
			.from('submissions')
			.select()
			.eq(`profile_id`, session.user.id)
			.single()

		const profileResponse = await supabase.from('profiles').upsert({
			id: session.user.id,
			first_name: firstName,
			last_name: lastName,
			website,
			avatar_url: avatarUrl,
			orcid_id: orcidId,
			updated_at: String(new Date())
		})

		const submissionResponse = await supabase.from('submissions').upsert({
			id: submission?.id,
			profile_id: session?.user.id,
			collection_id: params.id,
			title,
			abstract
		})

		if (profileResponse.error || submissionResponse.error) {
			return fail(500, {
				firstName,
				lastName,
				website,
				avatarUrl,
				orcidId,
				title,
				abstract
			})
		}

		return {
			firstName,
			lastName,
			website,
			avatarUrl,
			orcidId,
			title,
			abstract
		}
	}
}
