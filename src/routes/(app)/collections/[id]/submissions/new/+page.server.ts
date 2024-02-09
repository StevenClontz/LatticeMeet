import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { submissionSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		redirect(303, `/login?next=/collections/${params.id}/submissions/new`);
	}

	const { data: collection } = await supabase
		.from('collections')
		.select(`*`)
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		error(500, "Collection could not be loaded from server. Please try again.");
	}

	const profile = await getProfile()
			
	if (profile === null) {
		await supabase.auth.signOut()
		error(500, "Profile could not be loaded from server. Please try again.");
	}

	const form = await superValidate(
		profile,
		submissionSchema
	);

	const { data: existingSubmission } = await supabase
		.from('submissions')
		.select()
		.eq(`collection_id`, params.id)
		.eq(`profile_id`, profile.id)
		.single()

	return { form, existingSubmission, collection }
}

export const actions = {
	default: async ({ params, request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			redirect(303, '/login');
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

		const { error: profileError } = await supabase
			.from('profiles')
			.upsert(profileData)
			.select()
			.single()

		const submissionData = {
			title: form.data.title,
			abstract: form.data.abstract,
			profile_id: session?.user.id,
			collection_id: params.id,
		}
		console.log(submissionData)

		const { error: submissionError } = await supabase
			.from('submissions')
			.insert(submissionData)
			.select()
			.single()

		if (profileError || submissionError) {
			console.log(profileError)
			console.log(submissionError)
			return fail(500, { form });
		}

		redirect(303, `/collections/${params.id}`);
	}
}
