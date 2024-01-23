import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { registrationSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, `/login?next=/collections/${params.id}/registrations/new`)
	}

	const { data: collection } = await supabase
		.from('collections')
		.select()
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}

	const profile = await getProfile()
			
	if (profile === null) {
		await supabase.auth.signOut()
		throw error(500, "Profile could not be loaded from server. Please try again.")
	}

	const form = await superValidate(
		profile,
		registrationSchema
	);
	
	const { data: registration_options } = await supabase
		.from('registration_options')
		.select()
		.eq(`collection_id`, params.id)
	
	if (registration_options === null) {
		throw error(500, "Collection could not be loaded from server. Please try again.")
	}
	
	const { data: existingRegistration } = profile ? await supabase
		.from('registrations')
		.select()
		.in('registration_option_id', registration_options.map(ro=>ro.id))
		.eq(`profile_id`, profile.id)
		.single() : { data: null }

	return { form, existingRegistration, registration_options, collection }
}

export const actions = {
	default: async ({ params, request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			throw redirect(303, '/login')
		}

		const form = await superValidate(request, registrationSchema);
		console.log('POST', form);
		
		if (!form.valid) {
			return fail(400, { form });
		}

		const profileData = {
			id: session?.user.id,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			website: form.data.website,
			affiliation: form.data.affiliation,
		}
		console.log(profileData)

		const { error: profileError } = await supabase
			.from('profiles')
			.upsert(profileData)
			.select()
			.single()

		const registrationData = {
			registration_option_id: form.data.registration_option_id,
			profile_id: session?.user.id,
		}
		console.log(registrationData)

		const { error: registrationError } = await supabase
			.from('registrations')
			.insert(registrationData)
			.select()
			.single()

		if (profileError || registrationError) {
			console.log(profileError)
			console.log(registrationError)
			return fail(500, { form });
		}

		throw redirect(303, `/collections/${params.id}`)
	}
}
