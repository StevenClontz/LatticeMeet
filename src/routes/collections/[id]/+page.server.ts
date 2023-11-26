import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase }, params }) => {

	const { data: collection } = await supabase
		.from('collections')
		.select(`*, collections(*)`)
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const { data: parent } = collection.parent_id ? await supabase
		.from('collections')
		.select(`*`)
		.eq(`id`, collection.parent_id)
		.single() : { data: null }

	const { data: submissions } = await supabase
		.from('submissions')
		.select(`*`)
		.eq(`collection_id`,params.id)

	return { collection, parent, submissions }
}
