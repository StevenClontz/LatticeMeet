import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase } }) => {

	const { data: profiles } = await supabase
		.from('profiles')
		.select(`full_name, website, avatar_url, orcid_id`)
	
	if (profiles === null) {
		throw error(500, "Profiles could not be loaded from server. Please try again.")
	}

	return { profiles }
}
