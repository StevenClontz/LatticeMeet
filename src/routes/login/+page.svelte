<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	import { page } from '$app/stores';

	export let data

	const redirectTo = $page.url.searchParams.get("redirectTo") ?
		`${$page.url.origin}/login/callback?redirectTo=${$page.url.searchParams.get("redirectTo")}` :
		`${$page.url.origin}/login/callback`
</script>

<h3 style="margin-top:0">Login</h3>
<p>
	Enter your email address below and click "Send Magic Link".
	Use the link that is emailed to you from 
	<code>noreply@mail.app.supabase.io</code>
	to login (check your Spam/Junk folder).
</p>
<p>
	<small>
We're receiving a small number of reports that certain email addresses/domains may
be blocked by our authentication service. If this happens to you, please
email <a href="mailto:sclontz@southalabama.edu">Steven Clontz</a> to
let us know. You can also try submitting using a personal email address
instead.
	</small>
</p>
<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			{redirectTo}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #000' } }}
		/>
	</div>
</div>
