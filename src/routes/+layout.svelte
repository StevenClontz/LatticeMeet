<script lang="ts">
	import '../tacit.css'
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation';
	import appTitle from '$lib/appTitle';
	import 'katex/dist/katex.min.css';

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

<section>
	<header style="padding:18px">
		<nav>
			<ul>
				<li>
					<h1 style="margin:0">{appTitle}</h1>
				</li>
			</ul>
		</nav>
		<nav>
			<ul>
				<li>
					<a href="/">Home</a> 
				</li>
				<li>
					<a href="/profiles">Profiles</a>
				</li>
				<li>
					<a href="/collections">Collections</a>
				</li>
				{#if session}
					<li>
						<a href="/profile">{session.user.email}</a>
					</li>
					<li>
						<button style="padding:0 0.5em;margin:0" on:click={handleSignOut}>Sign out</button> 
					</li>
				{:else}
					<li>
						<a href="/login">Login</a>
					</li>
				{/if}
			</ul>
		</nav>
	</header>
	
	<article>
		<slot />
	</article>
</section>

<style>
</style>