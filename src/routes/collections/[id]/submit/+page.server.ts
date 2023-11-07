import { fail, redirect, error } from '@sveltejs/kit'
import type { Database } from '$lib/../schema.js'

export const load = async ({ locals: { supabase, getSession }, params }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}


	const { data: _collection } = await supabase
		.from('collections')
		.select(`*, collections(*)`)
		.eq(`id`, params.id)
		.single()

	const collection = <Database["public"]["Tables"]["collections"]["Row"]|null>_collection
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}


	const { data: _profile } = await supabase
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.single()

	const profile = <Database["public"]["Tables"]["profiles"]["Row"]|null>_profile
			
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}


	const { data: _submission } = await supabase
		.from('submissions')
		.select()
		.eq(`profile_id`, session.user.id)
		.eq(`collection_id`, params.id)
		.single()

	const submission = <Database["public"]["Tables"]["submissions"]["Row"]|null>_submission


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
		const { data: _submission } = await supabase
			.from('submissions')
			.select()
			.eq(`profile_id`, session.user.id)
			.single()
		const submission = <Database["public"]["Tables"]["submissions"]["Row"]|null>_submission

		const profileResponse = await supabase.from('profiles').upsert({
			id: session?.user.id,
			first_name: firstName,
			last_name: lastName,
			website,
			avatar_url: avatarUrl,
			orcid_id: orcidId,
			updated_at: new Date()
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
