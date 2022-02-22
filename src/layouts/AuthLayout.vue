<template>
    <nav class="p-5 sm:p-8">
        <h1 class="text-4xl text-center sm:text-left font-extrabold">{{ appName }}</h1>
    </nav>
    <main
        class="grid grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-10 xl:gap-x-20 min-h-screen w-full p-4 sm:p-10 sm:pb-0"
    >
        <!-- left image -->
        <div
            class="hidden md:block col-span-full sm:col-span-7 lg:col-span-8 bg-no-repeat bg-center bg-contain"
            :style="{ backgroundImage: `url(${require('@/assets/background.png')})` }"
        ></div>

        <!-- right form -->
        <div class="col-span-full md:col-span-5 lg:col-span-4 self-center">
            <h1 class="text-gray-900 text-2xl font-medium">
                Welcome to
                <span class="text-indigo-600">{{ appName }}</span>
            </h1>
            <h1 name="title" class="font-extrabold mt-8 mb-7 text-4xl">
                <slot name="title" />
            </h1>
            <slot />
        </div>

        <footer class="col-span-full self-end container mx-auto sm:p-6">
            <div
                class="grid grid-flow-row justify-center justify-items-center sm:place-content-end sm:grid-flow-col auto-cols-max gap-2 sm:gap-8 text-xs sm:text-sm lg:text-base"
            >
                <div>
                    <p>
                        Copyright © 2021
                        <a
                            href="/"
                            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                        >Advertial</a> All rights reserved.
                    </p>
                </div>
                <div>
                    <p>Terms and Conditions</p>
                </div>
            </div>
        </footer>
    </main>
</template>

<script>
import { computed } from 'vue'
import useAuthStore from '@/store/auth.store'

export default {
    name: 'AuthLayout',
    setup() {
        const store = useAuthStore()
        const appName = computed(() => store.appName)

        return {
            appName
        }
    }
}
</script>
