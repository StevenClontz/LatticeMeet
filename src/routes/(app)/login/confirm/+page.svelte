<script lang="ts">
	import { page } from "$app/stores";
	const email = $page.url.searchParams.get('email')
	const next = $page.url.searchParams.get('next')
</script>

<h3 style="margin-top:0">Verify <code>{email}</code></h3>
<p>
	Enter the token that was emailed to
	<code>{email}</code> from 
	<code>noreply@scholarlattice.pi-base.org</code>
	to log in (check your Spam/Junk folder).
</p>
<form method="POST">
	<input name="token" type="text"/>
	<input name="email" type="hidden" value={email}/>
	<input name="next" type="hidden" value={next}/>
	<input name="submit" type="submit" value="Login"/>
</form>
