<script lang="ts">
	import appTitle from '$lib/appTitle.js';

	export let data

	let { profiles } = data
</script>

<h2>{appTitle} Profiles</h2>

<ul>
	{#each profiles as profile}
		<li>
			{profile.full_name}
			{#if profile.website && profile.website !== ""}
				<a href={profile.website}>Website</a>
			{/if}
			{#if profile.orcid_id && profile.orcid_id !== ""}
				<a href={profile.orcid_id}>ORCID</a>
			{/if}
		</li>
	{/each}
</ul>