<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from './Avatar.svelte'
	import Markdown from 'svelte-exmarkdown';
    import CodeMirror from "svelte-codemirror-editor";
    import { markdown } from "@codemirror/lang-markdown";
	import type { Plugin } from 'svelte-exmarkdown';
	import 'katex/dist/katex.min.css';
	import rehypeKatex from 'rehype-katex';
	import remarkMath from 'remark-math';

	export let data
	export let form

	let { session, supabase, profile } = data
	$: ({ session, supabase, profile } = data)

	let profileForm: HTMLFormElement
	let signOutForm: HTMLFormElement
	let loading = false
	let fullName: string = profile?.full_name ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''

	let title = "A placeholder title $x^2$"
	let abstract = `
Replace this *sample* abstract with your **actual** abstract.

This is a [Markdown](https://www.markdownguide.org/) editor with
$\\LaTeX$ (\`$\\LaTeX$\`) support. Use the preview below to confirm that your
abstract renders as expected.
	`.trim();

	const handleSubmit: SubmitFunction = () => {
		loading = true
		return async () => {
			loading = false
		}
	}

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}

	const plugins: Plugin[] = [
		{ remarkPlugin: [remarkMath], rehypePlugin: [rehypeKatex] }
	];
</script>

<h2>Profile and Abstract Information</h2>

<p>Required fields are marked with an asterisk (*).</p>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<span class="label">Email *</span>
			<span id="email">{session?.user.email}</span>
			<small>
				(Not you? <button style="padding:0.2rem;font-size:0.8em" on:click={()=>signOutForm.submit()}>Sign out</button> )</small>
		</div>

		<div>
			<label for="fullName">Full Name *</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<span class="label">Photo</span>
			<div id="avatar">
				<Avatar
					{supabase}
					bind:url={avatarUrl}
					size={10}
					on:upload={() => {
						profileForm.requestSubmit()
					}}
				/>
			</div>
		</div>

		<div>
			<label for="title">Title *</label>
			<input id="title" name="title" type="text" bind:value={title}/>
		</div>

		<div>
			<span class="label">Preview of Title</span>
			<Markdown md={title} {plugins}/>
		</div>

		<div>
			<span class="label">Abstract *</span>
			<CodeMirror 
				bind:value={abstract}
				lang={markdown()}/>
		</div>

		<div>
			<span class="label">Preview of Abstract</span>
			<Markdown md={abstract} {plugins}/>
		</div>

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form bind:this={signOutForm} method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
