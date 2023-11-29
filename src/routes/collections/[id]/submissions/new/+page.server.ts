import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { submissionSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		throw redirect(303, '/login')
	}

	const { data: collection } = await supabase
		.from('collections')
		.select(`*`)
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
		submissionSchema
	);

	return { form }
}

export const actions = {
	default: async ({ params, request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			throw redirect(303, '/login')
		}

		const form = await superValidate(request, submissionSchema);
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

		const supaProfile = await supabase
			.from('profiles')
			.upsert(profileData)
			.select()
			.single()

		const profileError = supaProfile.error

		const submissionData = {
			title: form.data.title,
			abstract: form.data.abstract,
			profile_id: session?.user.id,
			collection_id: params.id,
		}
		console.log(submissionData)

		const supaSubmission = await supabase
			.from('submissions')
			.insert(submissionData)
			.select()
			.single()

		const submissionError = supaSubmission.error

		if (profileError || submissionError) {
			console.log(profileError)
			console.log(submissionError)
			return fail(500, { form });
		}

		if (submissionError || profileError) {
			return fail(500, { form })
		}

		throw redirect(303, `/collections/${params.id}`)
	}
}
