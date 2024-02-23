import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { submissionSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		redirect(303, `/login?next=/submissions/${params.id}/edit`);
	}

	const { data: submission } = await supabase
		.from('submissions')
		.select(`*, profiles(*), collections(*)`)
		.eq(`id`, params.id)
		.single()

	const collection = submission?.collections
	
	if (submission === null || collection === null || collection === undefined) {
		error(500, "Submission could not be loaded from server. Please try again.");
	}

	const form = await superValidate(
		{
			title: submission.title,
			abstract: submission.abstract,
			first_name: submission.profiles?.first_name,
			last_name: submission.profiles?.last_name,
			website: submission.profiles?.website,
			affiliation: submission.profiles?.affiliation,
			collection_id: submission.collection_id,
			profile_id: submission.profile_id,
			id: submission.id
		},
		submissionSchema
	);

	return { form, submission, collection }
}

export const actions = {
	default: async ({ params, request, locals: { supabase } }) => {

		const form = await superValidate(request, submissionSchema);
		
		if (
			!form.valid || 
			form.data.profile_id === null || 
			form.data.collection_id === null ||
			form.data.id === null
		)
		{
			console.log(form)
			return fail(400, { form });
		}

		const profileData = {
			id: form.data.profile_id,
			first_name: form.data.first_name,
			last_name: form.data.last_name,
			website: form.data.website,
			affiliation: form.data.affiliation,
		}

		const { error: profileError } = await supabase
			.from('profiles')
			.update(profileData)
			.eq('id', form.data.profile_id)

		const submissionData = {
			id: form.data.id,
			title: form.data.title,
			abstract: form.data.abstract,
			profile_id: form.data.profile_id,
			collection_id: form.data.collection_id,
		}

		const { error: submissionError } = await supabase
			.from('submissions')
			.update(submissionData)
			.eq('id', form.data.id)

		if (profileError || submissionError) {
			console.log(profileError)
			console.log(submissionError)
			return fail(500, { form });
		}

		redirect(303, `/submissions/${params.id}/edit`);
	}
}
