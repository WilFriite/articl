<script setup lang="ts">
  import { Head, useForm } from '@inertiajs/vue3'
import { tuyau } from '~/app/tuyau'
import Button from '~/components/ui/button/Button.vue'

  type FormData = {
    username: string
    email: string
    password: string
    accept_terms: boolean
    file: File | null,
  }

  const form = useForm<FormData>({
    username: '',
    email: 'test@test.com',
    password: '',
    accept_terms: false,
    file: null
  })


  function onSubmit() {
    const url = tuyau.$url('signup.store')
    console.log("posting...");
    form.post(url, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => {
        console.log("success");
      },
    })
  }
</script>

<template>
  <Head title="Please sign up" />

  <div
    class="flex flex-col items-center justify-center w-full h-full"
    style="min-height: 100vh"
  >
    <form @submit.prevent="onSubmit()">
      <div class="flex flex-col items-center justify-center w-full h-full gap-4 border rounded-md p-4">
        <div class="flex flex-col items-center justify-center w-full h-full">
          <h1 class="text-3xl font-bold">Sign up</h1>
          <p class="text-xl">
            Sign up to get started
          </p>
        </div>

        <div class="flex flex-col items-center justify-center w-full h-full gap-4">
          <div class="flex flex-col items-start justify-center w-full h-full">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="w-full p-2 border-2 rounded-md"
              :class="{ 'border-red-500': form.errors.username }"
            />
            <p v-if="form.errors.username" class="text-red-500">
              {{ form.errors.username }}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center w-full h-full">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="w-full p-2 border-2 rounded-md"
              :class="{ 'border-red-500': form.errors.email }"
            />
            <p v-if="form.errors.email" class="text-red-500">
              {{ form.errors.email }}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center w-full h-full">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="w-full p-2 border-2 rounded-md"
              :class="{ 'border-red-500': form.errors.password }"
            />
            <p v-if="form.errors.password" class="text-red-500">
              {{ form.errors.password }}
            </p>
          </div>

          <div class="flex flex-col items-start justify-center w-full h-full">
              <label for="file">Avatar</label>
            <input
              id="file"
              type="file"
              @input="form.file = $event?.target?.files?.[0]"
              class="w-full p-2 border-2 rounded-md"
              :class="{ 'border-red-500': form.errors.file }"
            />

            <p v-if="form.errors.file" class="text-red-500">
              {{ form.errors.file }}
            </p>
          </div>

          <div class="flex flex-col items-center justify-center w-full h-full">
            <div class="flex items-center justify-center w-full h-full">
              <label for="accept_terms">
              <input
                id="accept_terms"
                v-model="form.accept_terms"
                type="checkbox"
                class="p-2 border-2 rounded-md"
              />
              I accept the terms and conditions
            </label>
            </div>
            <p v-if="form.errors.accept_terms" class="text-red-500">
              {{ form.errors.accept_terms }}
            </p>
          </div>
          
          <div class="flex flex-col items-center justify-center w-full h-full">
    <Button
      class="bg-primary text-white p-2 rounded-md"
      :disabled="form.processing"
      type="submit"
      full-width
    >
      Sign up
    </Button>
  </div>
        </div>
      </div>
    </form>
  </div>

  
</template>