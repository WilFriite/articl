<script setup lang="ts">
import type HomeController from '#controllers/home_controller';
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'

defineProps<{
  url: InferPageProps<HomeController, 'stream'>['url'],
}>()

</script>


<template>
    <Head title="Stream" />
  <div>
    <video controls>
      <source :src="url + '#t=10'" type="video/mp4">
    </video>
  </div>
</template>
