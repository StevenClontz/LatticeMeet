<script lang="ts">
	export let data
	$: submissions = data.submissions
	$: profile = data.profile
</script>

<h2 style="margin-top:0">
	Profile
</h2>

<h3>{profile.first_name} {profile.last_name}</h3>
{#if profile.affiliation && profile.affiliation !== ""}
	<h4>{profile.affiliation}</h4>
{/if}

<p>
    {#if profile.website && profile.website !== ""}
        <a href={profile.website}>Website</a>
    {/if}
</p>

{#if submissions && submissions.length > 0}
<h3>Submissions</h3>
<ul>
	{#each submissions as submission}
		<li>
			<a href={`/collections/${submission.collection_id}`}>
				{submission.title}
			</a>
		</li>
	{/each}
</ul>
{/if}