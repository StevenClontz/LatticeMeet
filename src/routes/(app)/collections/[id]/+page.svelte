<script lang="ts">
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	export let data
	
	$: isAdmin = data.isAdmin
	$: collection = data.collection
    $: subcollections = data.subcollections
    $: parent = data.parent
    $: acceptedSubmissions = data.acceptedSubmissions
    $: existingSubmission = data.existingSubmission
    $: existingRegistration = data.existingRegistration
    $: registration_options = data.registration_options

	$: existingRegistrationOption = 
		registration_options.find(ro=>ro.id===existingRegistration?.registration_option_id) || null

</script>


{#if parent}
	<p>
		<small>[<a style="color:#444444" href={`/collections/${parent.id}`}>Go back to {parent.short_title}</a>]</small>
	</p>
{/if}

<h2 style="margin-top:0">
	{collection.short_title}: {collection.title}
</h2>

{#if collection.website && collection.website !== ""}
	<p>
		<small>[<a style="color:#444444" href={collection.website}>Website</a>]</small>
	</p>
{/if}

<Markdown md={collection.description || ""} {plugins}/>

{#if registration_options.length > 0}
	<h3>Register</h3>
	{#if existingRegistration}
		<p>
			You have registered as <b>{existingRegistrationOption?.title}</b>.
			Please contact administrators to change your registration.
		</p>
	{:else}
		<p>
			<a href={`/collections/${collection.id}/registrations/new`}>
				Register for {collection.short_title} using this form.
			</a>
		</p>
	{/if}

	{#if isAdmin}
		<p>
			<small><a style="color:#dd0000" href={`/collections/${collection.id}/registrations/manage`}>[Registrations Dashboard]</a></small>
		</p>
	{/if}
{/if}

{#if subcollections.length > 0}
	<h3>Subcollections</h3>
	<ul>
		{#each subcollections as c }
			<li>
				<h4 style="margin:0">{c.short_title}</h4>
				<div>
					<a href={`/collections/${c.id}`}>{c.title}</a>
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<h3>Submit to this Collection</h3>
	{#if !existingSubmission}
		<p><a href={`/collections/${collection.id}/submissions/new`}>Submissions are now open on this page.</a></p>
	{:else}
    	<p>Your submission has been received:</p>
		<article>
			<h3><Markdown md={existingSubmission.title || ""} {plugins}/></h3>
			<h4>Abstract</h4>
			<div>
				<Markdown md={existingSubmission.abstract || ""} {plugins}/>
			</div>
		</article>
		<p>
			<small>
				<a href={`/submissions/${existingSubmission.id}/edit`}>[Edit submission]</a>
			</small>
		</p>
	{/if}

	{#if isAdmin}
		<p>
			<small><a style="color:#dd0000" href={`/collections/${collection.id}/submissions/manage`}>[Submissions Dashboard]</a></small>
		</p>
	{/if}
	{#if acceptedSubmissions && acceptedSubmissions.length > 0}
		<h3>Accepted Submissions</h3>
		{#each acceptedSubmissions as submission}
			<article>
				<h3><Markdown md={submission.title || ""} {plugins}/></h3>
				<p>
					Submitting author:
					<a href={`/profiles/${submission.profile_id}`}>{submission.first_name} {submission.last_name}</a>,
					{submission.affiliation}
				</p>
				<h4>Abstract</h4>
				<div>
					<Markdown md={submission.abstract || ""} {plugins}/>
				</div>
			</article>
		{/each}
	{/if}
{/if}