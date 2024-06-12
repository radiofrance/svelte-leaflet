<script lang="ts">
	import type { LatLngTuple } from 'leaflet';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';

	export let latlng: LatLngTuple;
	export let open = false;
	const dispatch = createEventDispatcher();

	let dialog: HTMLDialogElement;
	let name: string;
	let lat: number;
	let lng: number;

	$: if (latlng) {
		[lat, lng] = latlng;
	}

	$: if (open) {
		dialog?.showModal();
	} else {
		dialog?.close();
	}

	function handleBackdropClick(event: MouseEvent) {
		var rect = dialog.getBoundingClientRect();
		var isInDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;
		if (!isInDialog) {
			dialog.close();
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog bind:this={dialog} on:close={() => dispatch('close')} on:click={handleBackdropClick}>
	<form method="post" use:enhance>
		<label for="lat">
			<span> Latitude </span>
			<input type="text" name="lat" id="lat" bind:value={lat} />
		</label>
		<label for="lng">
			<span> Longitude </span>
			<input type="text" name="lng" id="lng" bind:value={lng} />
		</label>
		<label for="name">
			<span> Name </span>
			<input type="text" name="name" id="name" bind:value={name} />
		</label>
		<button type="submit">Submit</button>
	</form>
	<button on:click={() => dialog.close()} class="close">✖</button>
</dialog>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	dialog {
		padding: 2rem;
	}

	dialog[open] {
		animation: fadein 0.2s ease-in forwards;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	button.close {
		position: absolute;
		top: 0;
		right: 0;
		background: none;
		border: none;
		font-size: 20px;
		padding: 10px;
		cursor: pointer;
	}

	button {
		cursor: pointer;
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
