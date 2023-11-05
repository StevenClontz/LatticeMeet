<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte'
	import { ThemeSupa } from '@supabase/auth-ui-shared'
	import { page } from '$app/stores';  
	import appTitle from '$lib/appTitle';

	export let data
</script>

<h3>Login</h3>
<p>
	Enter your email address below and click "Send Magic Link".
	Use the link that is emailed to you to access your profile.
</p>
<div class="row flex-center flex">
	<div class="col-6 form-widget">
		<Auth
			supabaseClient={data.supabase}
			view="magic_link"
			redirectTo={`${$page.url.origin}/auth/callback`}
			showLinks={false}
			appearance={{ theme: ThemeSupa, style: { input: 'color: #000' } }}
		/>
	</div>
</div>
