<script setup lang="ts">
  import { Head } from '@inertiajs/vue3'
  import { ref } from 'vue';
  import { Button } from '~/components/ui/button';

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
</template>