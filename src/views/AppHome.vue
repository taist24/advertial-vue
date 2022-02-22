<template>
    <app-header />
    <main class="container mx-auto mt-60 md:mt-44 xl:mt-24 px-5 sm:p-5">
        <section class="posts-container">
            <post-card
                :advertisement="advertisement"
                v-for="advertisement in advertisements.data"
                :key="advertisement.advertisement_id"
            />
        </section>

        <!-- pagination -->
        <nav
            role="navigation"
            class="flex items-center justify-center"
            v-if="advertisements.data && advertisements.data.length"
        >
            <div class="bg-white rounded-xl">
                <template v-for="(link, index) in advertisements.meta.links" :key="index">
                    <span
                        class="inline-block px-4 py-4 font-medium"
                        :class="{ 'text-gray-400': index === 0 || currentPage === advertisements.meta.last_page }"
                        v-if="!link.url"
                        v-html="link.label"
                    ></span>
                    <a
                        href="#"
                        class="inline-block px-4 py-4 font-medium"
                        :class="{ 'bg-blue-700 text-white': link.active }"
                        v-html="link.label"
                        @click.prevent="pageChange(link.label)"
                        v-else
                    ></a>
                </template>
            </div>
        </nav>

        <save-to-board-modal :setSavedBoardId="setSavedBoardId" />
    </main>
</template>

<script>
import { computed, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import axios from 'axios'
import AppHeader from '@/components/AppHeader.vue'
import PostCard from '@/components/AdCard.vue'
import SaveToBoardModal from '@/components/SaveToBoardModal.vue'
import useAdvertisementStore from '@/store/advertisement.store'

export default {
    name: 'AppHome',
    components: {
        AppHeader,
        PostCard,
        SaveToBoardModal
    },
    setup: () => {
        const advertisementStore = useAdvertisementStore()
        const advertisements = ref([])
        const currentPage = ref(1);
        const perPage = ref(advertisements.value?.meta?.per_page ?? 5);

        let advertisementWatcher = null;

        const filtersQueryParams = computed(() => {
            const queryObject = Object.create({})
            Object.entries(advertisementStore.filters).forEach(([, filter]) => {
                if (filter.item?.value) {
                    queryObject[filter.name] = filter.item?.value
                }
            })
            return queryObject
        })

        const resetPage = () => { currentPage.value = 1 }

        onBeforeMount(async () => {
            try {
                await advertisementStore.fillFilters()

                advertisementWatcher = watch(advertisementStore.filters, async () => {

                    resetPage()

                    const response = await axios.get('/advertisements', {
                        params: {
                            ...filtersQueryParams.value,
                            page: currentPage.value,
                            perPage: perPage.value
                        }
                    })

                    advertisements.value = response.data
                    currentPage.value = response.data.meta.current_page

                }, { deep: true, flush: 'post', immediate: true })
            } catch (error) {
                console.log(error)
            }
        })

        onBeforeUnmount(() => advertisementWatcher())

        const setSavedBoardId = ({ board, advertisement_id: advertisementId }) => {
            const advertisement = advertisements.value.data.find(ad => ad.advertisement_id === advertisementId)
            advertisement.saved_board_id = board.board_id
        }


        const pageChange = async (page) => {
            currentPage.value = Number(page)

            const response = await axios.get('/advertisements', {
                params: {
                    ...filtersQueryParams.value,
                    page: currentPage.value,
                    perPage: advertisements.value?.meta?.per_page ?? 5
                }
            })

            advertisements.value = response.data
            currentPage.value = response.data.meta.current_page
        }

        return { advertisements, currentPage, pageChange, setSavedBoardId }
    }
};
</script>
