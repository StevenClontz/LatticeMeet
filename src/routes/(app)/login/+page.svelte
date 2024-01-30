<script lang="ts">
	import { page } from "$app/stores";
	const next = $page.url.searchParams.get('next')
</script>

<h3 style="margin-top:0">Login</h3>
<p>
	Enter your email address below and click
	"Email access token".
</p>
<form method="POST">
	<input name="email" type="text"/>
	{#if next}<input name="next" type="hidden" value={next}/>{/if}
	<input name="submit" type="submit" value="Email access token"/>
</form>
