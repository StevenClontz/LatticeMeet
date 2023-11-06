<script lang="ts">
	export let data

	let { collections } = data
</script>

<h2>Collections</h2>

<ul>
	{#each collections as collection}
		<li>
			<h4 style="margin:0">{collection.short_title}</h4>
			<div>
				<a href={`/collections/${collection.id}`}>{collection.title}</a>
			</div>
		</li>
	{/each}
</ul>
