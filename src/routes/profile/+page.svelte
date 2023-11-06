<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Avatar from '$lib/Avatar.svelte'
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
	let firstName: string = profile?.first_name ?? ''
	let lastName: string = profile?.last_name ?? ''
	let website: string = profile?.website ?? ''
	let avatarUrl: string = profile?.avatar_url ?? ''
	let orcidId: string = profile?.orcid_id ?? ''

	let title = "A placeholder title $x^2$"
	let abstract = `
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

<h2>Your Profile</h2>

<p>
	Once approved by administrators,
	provided data will be publicly available at the
	<a href="/profiles">Profiles page</a>.
</p>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<div>
			<span class="label">Email</span>
			<span id="email">{session?.user.email}</span>
			<small>
				(Not you? 
				<form style="display:inline-block" bind:this={signOutForm} method="post" action="?/signout" use:enhance={handleSignOut}>
   					<button type="submit" style="padding:0.2rem;font-size:0.8em" on:click={()=>signOutForm.submit()}>Sign out</button> 
				</form>
				)
			</small>
		</div>

		<div>
			<label for="firstName">First Name</label>
			<input id="firstName" name="firstName" type="text" value={form?.firstName ?? firstName} />
		</div>

		<div>
			<label for="lastName">Last Name</label>
			<input id="lastName" name="lastName" type="text" value={form?.lastName ?? lastName} />
		</div>

		<div>
			<label for="orcidId">Orcid ID</label>
			<input id="orcidId" name="orcidId" type="url" value={form?.orcidId ?? orcidId} />
			<p><small>Include the full URL: <code>https://orcid.org/xxxx-xxxx-xxxx-xxxx</code></small></p>
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

		<!-- <div>
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
		</div> -->

		<div>
			<input
				type="submit"
				class="button block primary"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>
</div>
