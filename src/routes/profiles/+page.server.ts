import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase } }) => {

	const { data: profiles } = await supabase
		.from('profiles')
		.select(`first_name, last_name, website, avatar_url, orcid_id`)
		.order(`last_name`)
	
	if (profiles === null) {
		throw error(500, "Profiles could not be loaded from server. Please try again.")
	}

	return { profiles }
}
