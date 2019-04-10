<template>
	<div id="app" class="container-fluid col-md-10 offset-md-1">
		<nav-bar></nav-bar>
		<br>
		<div class="router-view  justify-content-around">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Overview from "./components/Overview.vue";

export default {
	components: {
		overview: Overview,
		navBar: Navbar,
	}
}
</script>

<style>
	body {
		margin-top: 5%;
	}

	.router-view {
		display: flex;
		flex-wrap: wrap;
	}
</style>
