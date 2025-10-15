<script lang="ts" setup>
import {Link} from '@tuyau/inertia/vue'
import { usePageProps } from '~/lib/use_page_props';

const pageProps = usePageProps()
</script>

<template>
	<header class="flex items-center justify-between p-4 bg-blue-200 shadow">
        <Link route="home">
            <h1 class="text-3xl font-bold">Articl</h1>
        </Link>

        <nav>
            <ul class="flex space-x-4 items-center">
                <li v-if="!pageProps.user">
                    <Link route="signup.show">Sign up</Link>
                </li>
                <template v-else>
                    <li>
                        <Link route="stream">Video</Link>
                    </li>
                    <li>
                        <div class="flex items-center space-x-2">
                            <p>{{ pageProps.user.username }}</p>
                            <img 
                                src="https://i.redd.it/fake-avatar-poster-for-my-character-ikaatan-v0-fz10d3b3u39a1.jpg?width=3999&format=pjpg&auto=webp&s=4ac4cb988302684dcbf47a0859863d47ed553aaf" 
                                class="w-10 h-10 rounded-full" />
                        </div>
                    </li>
                    <li>
                        <Link route="logout">Log out</Link>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>