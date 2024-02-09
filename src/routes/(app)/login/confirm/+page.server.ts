import { redirect, fail } from '@sveltejs/kit'

export const load = async ({ locals: { getSession } }) => {
	const session = await getSession()

	if (session) {
		redirect(303, '/');
	}

	return
}

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const session = await getSession()
	
		if (session) {
			redirect(303, '/');
		}

		const formData =  await request.formData()
		const next = formData.get('next') as string ?? '/'
		const email = formData.get('email') as string | null
		const token = formData.get('token') as string | null

		if (!email || !token) {
			return fail(400);
		}
	
		const { data, error } = await supabase.auth.verifyOtp({ 
			email, 
			token, 
			type: 'email'
		})

		if (error) {
			console.log(error)
			return fail(500, { email, token });
		}

		redirect(303, next);
	},

}