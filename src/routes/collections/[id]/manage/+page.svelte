<script lang="ts">
	export let data
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
			</tr>
		</thead>
		<tbody>
			{#each data.submissions as submission}
				<tr>
					<td>
						{submission.title}
					</td>
					<td>
						{submission.abstract.slice(0,200)}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
