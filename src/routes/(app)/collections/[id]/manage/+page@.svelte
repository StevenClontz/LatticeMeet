<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	export let data
	const { form, errors, enhance } = superForm(data.form, {
		dataType: 'json'
	});
</script>

<p>
	<small>
		[<a style="color:#444444" href={`/collections/${data.collection.id}`}>
		Go back to {data.collection.short_title}</a>]
	</small>
</p>

<h2 style="margin-top:0">
	Manage {data.collection.short_title}: {data.collection.title}
</h2>

<div>
	<table>
		<thead>
			<tr>
				<th>Title</th>
				<th>Abstract</th>
				<th>Submitter Name</th>
				<th>Affiliation</th>
				<th>Profile Approval</th>
			</tr>
		</thead>
		<tbody>
			{#each $form.submissions as submission, i}
				<tr>
					<td>
						{submission.title}
					</td>
					<td>
						{submission.abstract}
					</td>
					<td>
						{submission.profiles?.first_name} {submission.profiles?.last_name}
					</td>
					<td>
						{submission.profiles?.affiliation}
					</td>
					<td>
						{#if submission.profiles?.profiles_status}
							<input
								type="checkbox"
								bind:checked={submission.profiles.profiles_status.verified}
								/>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
