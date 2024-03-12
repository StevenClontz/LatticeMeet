<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';
	import { superForm } from 'sveltekit-superforms/client';
	export let data
	const { form, errors, enhance, tainted, submitting, delayed } = superForm(data.form, {
		dataType: 'json',
		delayMs: 4000,
		onError({ result }) {
			alert(result.error.message || "There was a problem submitting your form.");
		}
	});
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
    import { DataTransferDownIcon } from '@indaco/svelte-iconoir/data-transfer-down';
	import Gravatar from '$lib/Gravatar.svelte';
	$: emails = data.submissions
		.filter(s=>s.submissions_status?.status=="accepted")
		.map(s=>s.full_profiles?.email).join(", ")
	$: emailsAll = data.submissions
		.map(s=>s.full_profiles?.email).join(", ")
	$: pages = Math.floor((data.submissions.length-1)/5)+1

	import { mkConfig, generateCsv, download } from "export-to-csv";
	const csvConfig = mkConfig({ useKeysAsHeaders: true });
	$: csv = generateCsv(csvConfig)(data.submissions.map(s=>{
		return {
			firstName: s.full_profiles?.first_name,
			lastName: s.full_profiles?.last_name,
			email: s.full_profiles?.email,
			verified: s.full_profiles?.verified,
			submittedOn: s.created_at,
			title: s.title,
			abstract: s.abstract,
		}
	}));
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
		
		[<a style="color:#444444" href={`/collections/${data.collection.id}/submissions/markdown`}>
		Export accepted submissions as Markdown</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Manage Submissions for {data.collection.short_title}: {data.collection.title}
</h2>

<h3>Emails for all {data.submissions.length} submissions</h3>
<textarea readonly style="width:100%">{emailsAll}</textarea>

<h3>
	Emails for 
	{data.submissions
		.filter(s=>s.submissions_status?.status=="accepted").length}
	accepted submissions
</h3>
{#if $tainted}
<p>(Save your changes to view list.)</p>
{:else}
<textarea readonly style="width:100%">{emails}</textarea>
{/if}


<button on:click={() => download(csvConfig)(csv)}>Download CSV</button>


<h3>
	Submissions (page {data.page}/{pages})
	{#if $tainted}
		<DataTransferDownIcon/>
	{/if}
</h3>
<p>
	{#if data.page > 1}
		<a href={`?page=${data.page-1}`}>Previous page</a>
	{/if}
	{#if data.page < pages}
		<a href={`?page=${data.page+1}`}>Next page</a>
	{/if}
</p>
<form method="POST" use:enhance>
	<div>
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Abstract</th>
					<th>Submitter</th>
					<th>Affiliation</th>
					<th>Profile Approval</th>
					<th>Submission Status</th>
					<th>Edit Link</th>
					<th>Submitted On</th>
				</tr>
			</thead>
			<tbody>
				{#each $form.submissions as submission, i}
					<tr class={submission.submissions_status?.status}>
						<td style="font-size:1.1em">
							<Markdown md={submission.title || ""} {plugins}/>
						</td>
						<td>
							<Markdown md={submission.abstract || ""} {plugins}/>
						</td>
						<td>
							<Gravatar email={submission.full_profiles?.email} size={25}/>
							{submission.full_profiles?.first_name} {submission.full_profiles?.last_name}
							<a href={`mailto:${submission.full_profiles?.email}`}><code>{submission.full_profiles?.email}</code></a>
							<small>[<a target="_blank" href={`/profiles/${submission.full_profiles?.id}`}>View Profile</a>]</small>
						</td>
						<td>
							{submission.full_profiles?.affiliation}
						</td>
						<td style="text-align:center">
							{#if submission.full_profiles}
								<input
									type="checkbox"
									bind:checked={submission.full_profiles.verified}
									/>
								{#if $tainted?.submissions?.[i]?.full_profiles?.verified}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
						</td>
						<td>
							{#if submission.submissions_status}
								<select bind:value={submission.submissions_status.status}>
									<option value="submitted">
										Submitted
									</option>
									<option value="accepted">
										Accepted
									</option>
									<option value="declined">
										Declined
									</option>
								</select>
								{#if $tainted?.submissions?.[i]?.submissions_status?.status}
									<span title="Unsaved changes"><DataTransferDownIcon/></span>
								{/if}
							{/if}
						</td>
						<td style="font-size:0.8em">
							<a href={`/submissions/${submission.id}/edit`}>[Edit]</a>
						</td>
						<td style="font-size:0.8em">
							{new Date(submission.created_at).toLocaleDateString()}
							{new Date(submission.created_at).toLocaleTimeString()}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<button name="submit" disabled={!$tainted || $submitting}>
		{#if $delayed}
			Submitting... (sorry for the wait)
		{:else if $submitting}
			Submitting...
		{:else if $tainted}
			Save changes <DataTransferDownIcon/>
		{:else}
			All changes saved
		{/if}
	</button>
	{#if $errors.submissions}
		There was an error in saving changes.
	{/if}
</form>


{#if dev}
	<SuperDebug data={$form} />
{/if}
