<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from '$lib/Avatar.svelte'
	import Markdown from 'svelte-exmarkdown';
    import CodeMirror from "svelte-codemirror-editor";
    import { markdown } from "@codemirror/lang-markdown";
	import type { Plugin } from 'svelte-exmarkdown';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';
	import ProfileFields from '$lib/ProfileFields.svelte';

	export let data
	export let form

	let { supabase, profile, submission, collection } = data
	$: ({ supabase, profile, submission, collection  } = data)

	let submissionForm: HTMLFormElement
	let loading = false
	let firstName: string = form?.firstName ?? profile.first_name ?? ''
	let lastName: string = form?.lastName ?? profile.last_name ?? ''
	let website: string = form?.website ?? profile.website ?? ''
	let avatarUrl: string = form?.avatarUrl ?? profile.avatar_url ?? ''
	let orcidId: string = form?.orcidId ?? profile.orcid_id ?? ''

	let title = form?.title ?? submission?.title ?? "A placeholder title $x^2$"
	let abstract = form?.abstract ?? submission?.abstract ?? `
Replace this *sample* abstract with your **actual** abstract.

This is a [Markdown](https://www.markdownguide.org/) editor with
$\\LaTeX$ (\`$\\LaTeX$\`) support. Use the preview to confirm that your
abstract renders as expected.
	`.trim();

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const plugins: Plugin[] = [
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

			<ProfileFields
				firstName={firstName}
				lastName={lastName}
				orcidId={orcidId}
				website={website}
				approved={profile.approved}
				id={profile.id}/>

			<div>
				<div id="avatar">
					<Avatar
						field
						{supabase}
						bind:url={avatarUrl}
						size={10}
						on:upload={() => {
							submissionForm.requestSubmit()
						}}
					/>
				</div>
			</div>

			<h3>Your Submission</h3>

			<div>
				<label for="title">Title</label>
				<input id="title" name="title" type="text" bind:value={title}/>
			</div>

			<div>
				<span>Preview of Title</span>
				<blockquote>
					<Markdown md={title} {plugins}/>
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
</div>
