<script lang="ts">
	export let data

	let { profiles } = data
</script>

<h2>Profiles</h2>

<ul>
	{#each profiles as profile}
		<li>
			{profile.first_name}
			{profile.last_name}
			{#if profile.website && profile.website !== ""}
				<a href={profile.website}>Website</a>
			{/if}
			{#if profile.orcid_id && profile.orcid_id !== ""}
				<a href={profile.orcid_id}>ORCID</a>
			{/if}
		</li>
	{/each}
</ul>