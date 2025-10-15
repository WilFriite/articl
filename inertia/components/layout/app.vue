<script lang="ts" setup>
import Header from './header.vue'
import { usePageProps } from '~/lib/use_page_props'
import { useMutation } from '@tanstack/vue-query'
import { tuyau } from '~/app/tuyau'
import Button from '~/components/ui/button/Button.vue'

const pageProps = usePageProps()

const { isPending, error, mutateAsync } = useMutation({
  mutationKey: ['resend-email'],
  mutationFn: async () => {
    await tuyau.$route('email.resend').$post()
  },
})

const resendVerification = () => {
  mutateAsync()
}
</script>

<template>
    <Header />
    
    <!-- Email verification banner -->
    <div v-if="pageProps.user && !(pageProps.user as any).emailVerifiedAt" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm">
            Please verify your email address. Check your inbox for a verification link.
            <Button 
              @click="resendVerification" 
              :disabled="isPending"
              :loading="isPending"
            >
              Resend verification email
            </Button>
          </p>
        </div>
      </div>
    </div>
	<main class="grow p-4 w-screen max-w-3xl mx-auto">
		<slot />
	</main>
</template>