import { redirect, fail } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		throw redirect(303, '/')
	}

	return
}

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()
	
		if (session) {
			throw redirect(303, '/')
		}

		const formData =  await request.formData()
		const email = formData.get('email') as string | null
		const next = formData.get('next') as string ?? '/'

		if (!email) {
			return fail(400);
		}
	
		const { error } = await supabase.auth.signInWithOtp({
			email: email
		})

		if (error) {
			console.log(error)
			return fail(500, { email });
		}

		throw redirect(303, `/login/confirm?email=${email}&next=${next}`)
	},

}