import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase } }) => {

	const { data: collections } = await supabase
		.from('collections')
		.select()
		.is('parent_id', null)
	
	if (collections === null) {
		throw error(500, "Collections could not be loaded from server. Please try again.")
	}

	return { collections }
}
