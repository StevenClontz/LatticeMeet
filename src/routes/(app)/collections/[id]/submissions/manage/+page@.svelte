<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { dev } from '$app/environment';
	import { superForm } from 'sveltekit-superforms/client';
	export let data
	const { form, errors, enhance, tainted } = superForm(data.form, {
		dataType: 'json'
	});
	import Markdown, { type Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
    import { DataTransferDownIcon } from '@indaco/svelte-iconoir/data-transfer-down';
	import Gravatar from '$lib/Gravatar.svelte';
	$: emails = $form.submissions
		.filter(s=>s.submissions_status?.status=="accepted")
		.map(s=>s.full_profiles?.email).join(", ")
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Manage Submissions for {data.collection.short_title}: {data.collection.title}
</h2>

<h3>Emails for accepted submissions</h3>
{#if $tainted}
<p>(Save your changes to view list.)</p>
{:else}
<textarea readonly style="width:100%">{emails}</textarea>
{/if}


<h3>
	All submissions
	{#if $tainted}
		<DataTransferDownIcon/>
	{/if}
</h3>
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
				</tr>
			</thead>
			<tbody>
				{#each $form.submissions as submission, i}
					<tr>
						<td>
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
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<button name="submit" disabled={!$tainted}>
		{#if $tainted}
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

<style>
	td {border-bottom-width:1px}
</style>