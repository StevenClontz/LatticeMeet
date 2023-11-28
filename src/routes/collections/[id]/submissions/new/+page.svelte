<script lang="ts">
	import type { PageData } from './$types';
  	import { superForm } from 'sveltekit-superforms/client';
 	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import{ TextField, UrlField } from '$lib/FormFields';

	export let data:PageData

	const { form, errors, constraints } = superForm(data.form);
</script>

<h2 style="margin-top:0">New Submission</h2>

<form method="POST">
	<fieldset>
		<TextField
			name="first_name"
			errors={$errors.first_name}
			bind:value={$form.first_name}
			constraints={$constraints.first_name}>
			First Name
		</TextField>

		<TextField
			name="last_name"
			errors={$errors.last_name}
			bind:value={$form.last_name}
			constraints={$constraints.last_name}>
			Last Name
		</TextField>

		<TextField
			name="affiliation"
			errors={$errors.affiliation}
			bind:value={$form.affiliation}
			constraints={$constraints.affiliation}>
			Affiliation
		</TextField>

		<UrlField
			name="website"
			errors={$errors.website}
			bind:value={$form.website}
			constraints={$constraints.website}>
			Website
		</UrlField>

		<TextField
			name="title"
			preview="md"
			errors={$errors.title}
			bind:value={$form.title}
			constraints={$constraints.title}>
			Title
		</TextField>
	  

		<div><button>Submit</button></div>
	</fieldset>
</form>

<SuperDebug data={$form} />




<!-- <script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Markdown, { allowlist, type Plugin } from 'svelte-exmarkdown';
    import CodeMirror from "svelte-codemirror-editor";
    import { markdown } from "@codemirror/lang-markdown";
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';

	export let data
	export let form

	let { supabase, profile, submission, collection } = data
	$: ({ supabase, profile, submission, collection  } = data)

	let submissionForm: HTMLFormElement
	let loading = false
	let firstName: string = form?.firstName ?? profile.first_name ?? ''
	let lastName: string = form?.lastName ?? profile.last_name ?? ''
	let website: string = form?.website ?? profile.website ?? ''

	let title = form?.title ?? submission?.title ?? "A placeholder title $x^2$"
	let abstract = form?.abstract ?? submission?.abstract ?? `
Replace this *sample* abstract with your **actual** abstract.

This is a [Markdown](https://www.markdownguide.org/cheat-sheet/) editor
with $\\LaTeX$ (\`$\\LaTeX$\`) support. Use the preview to confirm that
your abstract renders as expected.
	`.trim();

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
			scrollTo({ top: 0, behavior: 'instant' })
			alert("Submission complete.")
		}
	}

	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];

	const titlePlugins: Plugin[] = [
		allowlist(["p", "span"]),
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
</script>

<h2 style="margin-top:0">
	Submit to {collection.short_title}
</h2>

<p>
	<small>[<a style="color:#444444" href={`/collections/${collection.id}`}>Go back to collection</a>]</small>
</p>

<div>
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={submissionForm}
	>
		<fieldset>

			<h3>Update Your Profile</h3>



			<h3>Your Submission</h3>

			<div>
				<label for="title">Title</label>
				<input id="title" name="title" type="text" bind:value={title}/>
			</div>

			<div>
				<span>Preview of Title</span>
				<blockquote>
					<Markdown md={title} plugins={titlePlugins}/>
				</blockquote>
			</div>

			<div>
				<span>Abstract</span>
				<CodeMirror 
					bind:value={abstract}
					lang={markdown()}/>
				<input id="abstract" name="abstract" type="hidden" bind:value={abstract}/>
			</div>

			<div>
				<span>Preview of Abstract</span>
				<blockquote>
					<Markdown md={abstract} {plugins}/>
				</blockquote>
			</div>

			<div>
				<input
					type="submit"
					class="button block primary"
					value={loading ? 'Loading...' : 'Submit'}
					disabled={loading}
				/>
			</div>
			
		</fieldset>
	</form>
</div> -->
