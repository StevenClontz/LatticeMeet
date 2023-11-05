<script lang="ts">
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import appTitle from '$lib/appTitle';

	export let data

	let { supabase, session } = data
	$: ({ supabase, session } = data)

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
		<a href="/profiles">Profiles</a>
		(<a href="/profile">Your Profile</a>) | 
		<a href="/collections">Collections</a>
	</p>
	<hr/>
	<slot />
</div>
