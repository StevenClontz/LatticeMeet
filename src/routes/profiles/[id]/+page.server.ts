import { error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase }, params }) => {

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (profile === null) {
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	return { profile }
}
