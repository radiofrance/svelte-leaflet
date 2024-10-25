<script lang="ts">
	function onclick() {
		console.log(
			'Clicked ! Custom markers can handle interaction, internal state and more, just like any other Svelte component.'
		);
	}
</script>

<button aria-label="Marker" class="MarkerIci" {onclick}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73 96" fill="none">
		<g filter="url(#a)">
			<path fill="currentColor" d="M37 27 20 44l17 17 17-17-17-17Z" />
			<g filter="url(#b)">
				<path fill="currentColor" d="M54 44a24 24 0 0 0-34-34 24 24 0 0 0 34 34Z" />
			</g>
			<g filter="url(#c)">
				<path fill="currentColor" d="M37 73.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
			</g>
			<path
				fill="#fff"
				d="M30 36a2 2 0 0 1-1.4-.6A2 2 0 0 1 28 34v-8a3 3 0 0 1-1-1.3v-1.8l1-3.4c.3-.4.5-.8.9-1 .3-.4.7-.5 1.2-.5h13.8c.4 0 .8.1 1.1.4.4.3.6.7.8 1.1l1 3.4c.2.7.2 1.2 0 1.8A4 4 0 0 1 46 26v8c0 .5-.2 1-.6 1.4a2 2 0 0 1-1.4.6H30Zm9.2-11c.5 0 .8-.2 1-.5.3-.3.4-.6.3-1L40 20h-2v3.7c0 .4 0 .7.4 1 .2.2.5.3.8.3Zm-4.5 0c.4 0 .7-.1 1-.4.2-.2.3-.6.3-.9V20h-2l-.5 3.5c0 .4 0 .8.3 1 .2.4.5.5 1 .5h-.1Zm-4.4 0c.3 0 .5-.1.8-.3l.4-.8.5-3.9h-2l-1 3.4c0 .3 0 .6.2 1s.6.6 1 .6Zm13.4 0c.5 0 .8-.2 1-.6.2-.4.3-.7.2-1L44 20h-2l.6 3.9c0 .3.2.6.4.8.2.2.5.3.8.3ZM30 34h14v-7h-.3a3 3 0 0 1-1.2-.2c-.4-.2-.7-.4-1-.8-.2.4-.6.6-1 .8A3.2 3.2 0 0 1 37 26a3 3 0 0 1-2.3.9c-.9 0-1.7-.4-2.3-1l-1 .8a3 3 0 0 1-1.2.2H30V34Z"
				opacity=".9"
			/>
		</g>
		<defs>
			<filter
				id="a"
				width="72"
				height="94.5"
				x="1"
				y="1"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feMorphology in="SourceAlpha" radius="2" result="effect1_dropShadow_24414_469392" />
				<feOffset dy="4" />
				<feGaussianBlur stdDeviation="3" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_24414_469392" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feMorphology in="SourceAlpha" radius="3" result="effect2_dropShadow_24414_469392" />
				<feOffset dy="10" />
				<feGaussianBlur stdDeviation="7.5" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
				<feBlend in2="effect1_dropShadow_24414_469392" result="effect2_dropShadow_24414_469392" />
				<feBlend in="SourceGraphic" in2="effect2_dropShadow_24414_469392" result="shape" />
			</filter>
			<filter
				id="b"
				width="48"
				height="54.1"
				x="13"
				y="3"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset dy="6" />
				<feGaussianBlur stdDeviation="6" />
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
				<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
				<feBlend in2="shape" result="effect1_innerShadow_24414_469392" />
			</filter>
			<filter
				id="c"
				width="9"
				height="10.5"
				x="32.5"
				y="63"
				color-interpolation-filters="sRGB"
				filterUnits="userSpaceOnUse"
			>
				<feFlood flood-opacity="0" result="BackgroundImageFix" />
				<feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset dy="-1.5" />
				<feGaussianBlur stdDeviation="1.5" />
				<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
				<feBlend in2="shape" result="effect1_innerShadow_24414_469392" />
			</filter>
		</defs>
	</svg>
</button>

<style>
	.MarkerIci {
		display: block;
		width: 49px;
		/* using transform + translate is the simplest way to center the marker */
		transform: translate(-40%, -58%);
		background: none;
		border: none;
		color: blue;
	}

	.MarkerIci:hover svg {
		transform: scale(1.2) translateY(-3.5%);
	}
</style>
