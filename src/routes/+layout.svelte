<script lang="ts">
	import '../styles/global.scss';
	import { onMount } from 'svelte';
	import viewportListener from '$lib/ui/viewportListener';
	import Header from '$components/layout/Header.svelte';
	import Footer from '$components/layout/Footer.svelte';
	
	onMount(init)
	function init() {
		viewportListener.init();
	}

	
	/*
	 * [DEV] clear console on Hot Module Reload
	*/
	if (import.meta.hot) {
		import.meta.hot.on(
			"vite:beforeUpdate",
			/* eslint-disable-next-line no-console */
			() => console.clear()
		);
	}
</script>


<div class="wrapper">
	<Header />
	<div class="main">
		<slot></slot>
	</div>
	<!-- <Footer /> -->
</div>


<style lang="scss">
	.wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
	}	
	.main {
		flex-grow: 10;
	}
</style>
