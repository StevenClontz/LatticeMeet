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
	
	const { data: registration_options } = await supabase
		.from('registration_options')
		.select()
		.eq(`collection_id`, params.id)
	
	if (registration_options === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: submissions } = await supabase
		.from('submissions')
		.select()
		.eq(`collection_id`, params.id)
	
	if (submissions === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	return { 
		collection, 
		registration_options,
		submissions
	}
}
