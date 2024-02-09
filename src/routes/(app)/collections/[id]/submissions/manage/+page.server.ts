import { fail, redirect, error } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server';
import { submissionWorksheetSchema } from '$lib/schema.js';

export const load = async ({ locals: { supabase, getSession, getProfile }, params }) => {
	const session = await getSession()

	if (!session) {
		redirect(303, `/collections/${params.id}`);
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

	const { data: submissions, error: subError } = await supabase
		.from('submissions')
		.select(`
			id, title, abstract, created_at,
			submissions_status(status),
			full_profiles(id, first_name, last_name, affiliation, website, verified, email)
		`)
		.eq(`collection_id`, params.id)
		.order('created_at', { ascending: false })
			
	if (submissions === null) {
		console.log(subError)
		error(500, "Submissions could not be loaded from server. Please try again.");
	}

	const form = await superValidate(
		{ submissions },
		submissionWorksheetSchema
	);

	return { form, collection }
}

export const actions = {
	default: async ({ params, request, locals: { supabase, getSession } }) => {

		const session = await getSession()
		if (!session) {
			redirect(303, `/collections/${params.id}`);
		}

		const form = await superValidate(request, submissionWorksheetSchema);
		console.log('POST', form);
		
		if (!form.valid) {
			return fail(400, { form });
		}

		const profileStatusData = form.data.submissions.map(s=>{
			return {id: s.full_profiles?.id || "", verified: s.full_profiles?.verified || false}
		})
		console.log(profileStatusData)

		const { error: profileError } = await supabase
			.from('profiles_status')
			.upsert(profileStatusData)

		const submissionStatusData = form.data.submissions.map(s=>{
			return {id: s.id || "", status: s.submissions_status?.status || "submitted"}
		})
		console.log(submissionStatusData)

		const { error: submissionError } = await supabase
			.from('submissions_status')
			.upsert(submissionStatusData)

		if (profileError || submissionError) {
			console.log(profileError)
			console.log(submissionError)
			return fail(500, { form });
		}

		redirect(303, `/collections/${params.id}/submissions/manage`);
	}
}
