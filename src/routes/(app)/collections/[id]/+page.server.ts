import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getProfile }, params }) => {

	const { data: collection } = await supabase
		.from('collections')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const { data: subcollections } = await supabase
		.from('collections')
		.select()
		.order(`short_title`)
		.eq(`parent_id`, params.id)
	
	if (subcollections === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: parent } = collection.parent_id ? await supabase
		.from('collections')
		.select()
		.eq(`id`, collection.parent_id)
		.single() : { data: null }

	const { data: acceptedSubmissions } = await supabase
		.from('accepted_submissions')
		.select(`*`)
		.eq(`collection_id`,params.id)
	
	if (acceptedSubmissions === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: registration_options } = await supabase
		.from('registration_options')
		.select()
		.eq(`collection_id`, params.id)
	
	if (registration_options === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const profile = await getProfile()

	const { data: existingSubmission } = profile ? await supabase
		.from('submissions')
		.select()
		.eq(`collection_id`, params.id)
		.eq(`profile_id`, profile.id)
		.single() : { data: null }
	
	const { data: existingRegistration } = profile ? await supabase
		.from('registrations')
		.select()
		.in('registration_option_id', registration_options.map(ro=>ro.id))
		.eq(`profile_id`, profile.id)
		.single() : { data: null }

	const {data: isAdmin} = profile ? await supabase.rpc("is_admin_of", {_profile_id: profile.id, _collection_id: params.id}) : {data: false}

	return { 
		collection, 
		subcollections, 
		parent, 
		acceptedSubmissions, 
		existingSubmission, 
		registration_options,
		existingRegistration,
		isAdmin
	}
}
