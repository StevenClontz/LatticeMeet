<script lang="ts">
	export let data

	let { profiles } = data
</script>

<h2 style="margin-top:0">Profiles</h2>

<ul>
	{#each profiles as profile}
		<li>
			<a href={`/profiles/${profile.id}`}>
				{profile.first_name}
				{profile.last_name}
			</a>
		</li>
	{/each}
</ul>