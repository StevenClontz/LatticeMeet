<script lang="ts">
	import Avatar from '$lib/Avatar.svelte';
	export let data
	$: supabase = data.supabase
	$: profile = data.profile
</script>

<h2>
	Profiles
</h2>

<h3>{profile.first_name} {profile.last_name}</h3>

<p>
	<Avatar
		{supabase}
		bind:url={profile.avatar_url}
		size={10}
	/>
</p>

<p>
    {#if profile.website && profile.website !== ""}
        <a href={profile.website}>Website</a>
    {/if}
    {#if profile.orcid_id && profile.orcid_id !== ""}
        <a href={profile.orcid_id}>ORCID</a>
    {/if}
</p>