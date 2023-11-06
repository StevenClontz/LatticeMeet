import { fail, redirect, error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession }, params }) => {
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

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq('id', session.user.id)
		.single()
	
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	return { profile, collection }
}

// export const actions = {
// 	update: async ({ request, locals: { supabase, getSession } }) => {
// 		const formData = await request.formData()
// 		const firstName = formData.get('firstName') as string
// 		const lastName = formData.get('lastName') as string
// 		const website = formData.get('website') as string
// 		const avatarUrl = formData.get('avatarUrl') as string
// 		const orcidId = formData.get('orcidId') as string

// 		const session = await getSession()

// 		const { error } = await supabase.from('profiles').upsert({
// 			id: session?.user.id,
// 			first_name: firstName,
// 			last_name: lastName,
// 			website,
// 			avatar_url: avatarUrl,
// 			orcid_id: orcidId,
// 			updated_at: new Date()
// 		})

// 		if (error) {
// 			return fail(500, {
// 				firstName,
// 				lastName,
// 				website,
// 				avatarUrl,
// 				orcidId
// 			})
// 		}

// 		return {
// 			firstName,
// 			lastName,
// 			website,
// 			avatarUrl,
// 			orcidId
// 		}
// 	},
// 	signout: async ({ locals: { supabase, getSession } }) => {
// 		const session = await getSession()
// 		if (session) {
// 			await supabase.auth.signOut()
// 			throw redirect(303, '/login')
// 		}
// 	}
// }
