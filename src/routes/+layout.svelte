<script lang="ts">
	import 'katex/dist/katex.min.css';
	import '../tacit.css'
	import '../styles.css'
	import appTitle from '$lib/appTitle';
</script>

<svelte:head>
	<title>{appTitle}</title>
</svelte:head>

<slot/>
