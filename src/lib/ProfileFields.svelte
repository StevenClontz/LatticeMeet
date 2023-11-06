<script lang="ts">
	export let firstName: string
	export let lastName: string
	export let website: string
	export let orcidId: string
    export let approved: boolean
</script>

<p style="font-style:italic;">
	{#if approved}
	Your account has been approved by administrators. Provided
	{:else}
	Once your account has been approved by administrators, provided 
	{/if}
	data will be publicly available at the
	<a href="/profiles">Profiles page</a>.
</p>

<div>
    <label for="firstName">First Name</label>
    <input id="firstName" name="firstName" type="text" value={firstName} />
</div>

<div>
    <label for="lastName">Last Name</label>
    <input id="lastName" name="lastName" type="text" value={lastName} />
</div>

<div>
    <label for="orcidId">Orcid ID</label>
    <input id="orcidId" name="orcidId" type="url" value={orcidId} />
    <p><small>Include the full URL: <code>https://orcid.org/xxxx-xxxx-xxxx-xxxx</code></small></p>
</div>

<div>
    <label for="website">Website</label>
    <input id="website" name="website" type="url" value={website} />
</div>
