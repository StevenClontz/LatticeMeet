<script lang="ts">
	import '../tacit.css'
	import '../styles.css'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation';
	import appTitle from '$lib/appTitle';
	import 'katex/dist/katex.min.css';
    import { UserIcon } from '@indaco/svelte-iconoir/user';
    import { UserBadgeCheckIcon } from '@indaco/svelte-iconoir/user-badge-check';

	export let data

	let { supabase, session, profile } = data
	$: ({ supabase, session, profile } = data)

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		await goto("/")
	}

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, _session) => {
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
					<a href="/">About</a> 
				</li>
				<li>
					<a href="/collections">Collections</a>
				</li>
				{#if session && profile}
					<li>
						{#if profile.verified}
							<UserBadgeCheckIcon/>
						{:else}
							<UserIcon/>
						{/if}
						<a href={`/profiles/${profile.id}`}>{session.user.email}</a>
					</li>
					<li>
						<button style="padding:0 0.5em;margin:0" on:click={handleSignOut}>Sign out</button> 
					</li>
				{:else}
					<li>
						<UserIcon/>
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