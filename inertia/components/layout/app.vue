<script lang="ts" setup>
import Header from './header.vue'
</script>

<template>
    <Header />
	<main class="grow p-4 w-screen max-w-3xl mx-auto">
		<slot />
	</main>
</template>