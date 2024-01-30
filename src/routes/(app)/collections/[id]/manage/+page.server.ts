import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase }, params }) => {

	const { data: collection, error: e } = await supabase
		.from('collections')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		console.log(e)
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: registration_options, error: e2 } = await supabase
		.from('registration_options')
		.select()
		.eq(`collection_id`, params.id)
	
	if (registration_options === null) {
		console.log(e2)
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: submissions, error: e3 } = await supabase
		.from('submissions')
		.select('*, profiles(first_name, last_name, affiliation)')
		.eq(`collection_id`, params.id)
	
	if (submissions === null) {
		console.log(e3)
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	return { 
		collection, 
		registration_options,
		submissions
	}
}
