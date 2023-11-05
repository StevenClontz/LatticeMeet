import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase } }) => {

	const { data: collections } = await supabase
		.from('collections')
		.select(`id, title, short_title, description, website`)
	
	if (collections === null) {
		throw error(500, "Collections could not be loaded from server. Please try again.")
	}

	return { collections }
}
