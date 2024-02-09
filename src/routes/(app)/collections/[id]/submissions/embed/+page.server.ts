import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase }, params }) => {

	const { data: collection } = await supabase
		.from('collections')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		error(500, "Collection could not be loaded from server. Please try again.");
	}

	const { data: acceptedSubmissions } = await supabase
		.from('accepted_submissions')
		.select(`*`)
		.eq(`collection_id`,params.id)
		.order('last_name', { ascending: true })
		.order('first_name', { ascending: true })
	
	if (acceptedSubmissions === null) {
		error(500, "Collection could not be loaded from server. Please try again.");
	}
	return { 
		collection, 
		acceptedSubmissions, 
	}
}
