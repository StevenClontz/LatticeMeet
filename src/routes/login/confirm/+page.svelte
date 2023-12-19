<script lang="ts">
	import { page } from '$app/stores';

	const href = $page.url.searchParams.get("confirmationUrl")
	const email = $page.url.searchParams.get("email")
</script>

{#if href && email}
	<h3 style="margin-top:0">Confirm Email</h3>
	<p>
		Click the below link to confirm your email <code>{email}</code>.
	</p>
	<p style="text-align:center">
		<a {href}>Confirm <code>{email}</code> and log in »</a>
	</p>
{/if}
