<template>
    <header class="header" :class="{ shadow: showMoreFilter }">
        <app-sidebar :showSidebar="showSidebar" :toggleSidebar="toggleSidebar" />
        <app-nav-bar :showSidebar="showSidebar" :toggleSidebar="toggleSidebar" />
    </header>
</template>

<script>
import { onBeforeUnmount, ref } from "vue"
import useAdvertisementStore from '@/store/advertisement.store'
import AppSidebar from "@/components/AppSidebar.vue"
import AppNavBar from "@/components/AppNavBar.vue"
import { storeToRefs } from 'pinia'

export default {
    name: 'AppHeader',
    components: {
        AppSidebar,
        AppNavBar
    },
    setup() {
        const advertisementStore = useAdvertisementStore()

        const showSidebar = ref(false)
        const { showMoreFilter } = storeToRefs(advertisementStore)

        const headerShadow = () => {
            const header = document.querySelector("header");
            const sticky = header.offsetTop;

            if (window.pageYOffset > sticky) {
                header.classList.add("shadow");
            } else if (!showMoreFilter.value) {
                header.classList.remove("shadow");
            }
        };

        window.addEventListener("scroll", headerShadow);

        onBeforeUnmount(() => {
            window.removeEventListener("scroll", headerShadow)
        })

        const toggleSidebar = () => {
            showSidebar.value = !showSidebar.value
        }

        return { showSidebar, showMoreFilter, toggleSidebar }
    }
}
</script>
