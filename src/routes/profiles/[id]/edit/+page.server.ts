import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { profileSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession }, params  }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select()
		.eq(`id`, params.id)
		.single()

	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}
	
	const form = await superValidate(profile, profileSchema);

	return { profile, form }
}

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			throw redirect(303, '/login')
		}

		const form = await superValidate(request, profileSchema);
		console.log('POST', form);
	
		if (!form.valid) {
			return fail(400, { form });
		}

		const profileData = {
			id: session?.user.id,
			...form.data
		}
		console.log(profileData)

		const { error } = await supabase
			.from('profiles')
			.upsert(profileData)
			.select()
			.single()

		if (error) {
			console.log(error)
			return fail(500, { form });
		}

		throw redirect(303, `/profiles/${profileData.id}`)
	},

}
