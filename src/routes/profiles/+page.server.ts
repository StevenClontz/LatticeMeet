import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase } }) => {

	const { data: profiles } = await supabase
		.from('profiles')
		.select()
		.order(`last_name`)
	
	if (profiles === null) {
		throw error(500, "Profiles could not be loaded from server. Please try again.")
	}

	return { profiles }
}
