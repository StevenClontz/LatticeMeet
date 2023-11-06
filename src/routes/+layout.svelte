<script lang="ts">
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation';
	import appTitle from '$lib/appTitle';

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		await goto("/")
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>{appTitle}</title>
</svelte:head>

<div class="container" style="padding-bottom:50px">
	<h1>{appTitle}</h1>
	<p>
		<a href="/">Home</a> | 
		<a href="/profiles">Profiles</a> | 
		<a href="/collections">Collections</a>
	</p>
	{#if session}
		Logged in as {session.user.email} (<a href="/profile">Go to your Profile</a>)
		<small>
			(Not you? 
				<button on:click={handleSignOut} style="padding:0.2rem;font-size:0.8em">Sign out</button> 
			)
		</small>
	{:else}
		<a href="/login">Login</a>
	{/if}
	<hr/>
	<slot />
</div>
