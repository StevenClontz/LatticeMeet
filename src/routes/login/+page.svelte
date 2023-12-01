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
	Use the link that is emailed to you to login.
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
