import { fail, redirect, error } from '@sveltejs/kit'

export const load = async ({ locals: { supabase }, params }) => {

	const { data: collection } = await supabase
		.from('collections')
		.select(`*`)
		.eq(`id`, params.id)
		.single()
	
	if (collection === null) {
		error(500, "Collection could not be loaded from server. Please try again.");
	}

	const { data: submissions, error: subError } = await supabase
		.from('submissions')
		.select(`
			id, title, abstract, created_at,
			submissions_status(status),
			full_profiles(id, first_name, last_name, affiliation, website, verified, email)
		`)
		.eq(`collection_id`, params.id)
		.eq(`submissions_status.status`,`accepted`)
			
	if (submissions === null) {
		console.log(subError)
		error(500, "Submissions could not be loaded from server. Please try again.");
	}

	const submissionMds = submissions.sort((a, b) => {
		const result = (a.full_profiles?.last_name || "").localeCompare(b.full_profiles?.last_name || "");

		return result !== 0 ? result : (a.full_profiles?.first_name || "").localeCompare(b.full_profiles?.first_name || "");
	  }).map((s) => {
		return `
**${s.full_profiles?.first_name?.trim()} ${s.full_profiles?.last_name?.trim()}**.
${s.full_profiles?.affiliation?.trim()}.

*${s.title.trim()}*

${s.abstract.trim()}

---
		`.trim()
	})

	const markdown = submissionMds.join("\n\n\n")

	return { collection, markdown }
}
