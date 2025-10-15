<script setup lang="ts">
  import type HomeController from '#controllers/home_controller';
  import { InferPageProps } from '@adonisjs/inertia/types';
  import { Head } from '@inertiajs/vue3'
  import { ref } from 'vue';
  import { Button } from '~/components/ui/button';

  defineProps<{
    ssl: InferPageProps<HomeController, 'index'>['ssl'],
  }>()

  const counter = ref(0);

  const increment = () => {
    counter.value++;
  }
</script>

<template>
  <Head title="Homepage" />

  <Button @click="increment">
    Click me
  </Button>
  <p>The count is: {{ counter }}</p>
  <p>ssl: {{ String(ssl) }}</p>
</template>