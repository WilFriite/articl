<script lang="ts" setup>
import {Link} from '@tuyau/inertia/vue'
</script>

<template>
	<header class="flex items-center justify-between p-4 bg-blue-200 shadow">
        <h1 class="text-3xl font-bold">Articl</h1>

        <nav>
            <ul class="flex space-x-4">
                <li>
                    <Link route="signup.show">Sign up</Link>
                </li>
            </ul>
        </nav>
    </header>
</template>