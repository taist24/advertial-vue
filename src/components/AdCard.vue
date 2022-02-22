<template>
    <article class="post-card">
        <!-- top wrapper -->
        <div class="post-card__top">
            <!-- top -->
            <div class="post-card__header">
                <!-- ad author -->
                <div class="post-card__header-left">
                    <div>
                        <img
                            alt="Author Profile Picture"
                            class="post-card__avatar"
                            :src="advertisement.brand_logo"
                        />
                    </div>
                    <div class="grid grid-flow-row items-center">
                        <div>
                            <span
                                class="post-card__label post-card__label-new"
                                :class="{
                                    'post-card__label-new': advertisement.label === 'new',
                                    'post-card__label-featured': advertisement.label === 'featured',
                                    'post-card__label-trending': advertisement.label === 'trending'
                                }"
                            >{{ advertisement.label }}</span>
                        </div>
                        <div>
                            <p class="post-card__username">{{ advertisement.brand_name }}</p>
                        </div>
                    </div>
                </div>
                <!-- icons: like, share, info, more -->
                <div class="post-card__header-right">
                    <ul class="post-card__icons">
                        <li>
                            <!-- like/dislike -->
                            <button type="button" @click.prevent="likeDislike">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    :class="{ 'text-red-400 fill-current': advertisement.has_like }"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <!-- save -->
                            <button
                                type="button"
                                @click.prevent="toggleShowBoardModal(advertisement.advertisement_id)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    :class="{ 'text-yellow-400 fill-current': isSaved() }"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                            </button>
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- primary text -->
        <div
            class="font-medium text-xs px-5"
            v-html="advertisement.primary_text"
            v-if="advertisement.primary_text"
        ></div>
        <!-- media -->
        <template v-if="isImage()">
            <img alt="Ad media" class="h-full w-full text-center" :src="advertisement.file" />
        </template>
        <template v-else>
            <video class="w-full h-full" controls>
                <source :src="advertisement.file" />
                <track :src="advertisement.file" kind="captions" />
            </video>
        </template>
    </article>
</template>

<script>
import { toRefs } from 'vue'
import axios from 'axios'
import useBoardModalStore from '@/store/board-modal.store'


export default {
    props: {
        advertisement: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const boardModalStore = useBoardModalStore()

        const { advertisement } = toRefs(props)

        const isImage = () => ['.jepg', '.jpeg', '.jpg', '.png'].some(x => advertisement.value.file.includes(x))
        const isSaved = () => advertisement.value.saved_board_id > 0
        const likeDislike = async () => {
            try {
                advertisement.value.has_like = !advertisement.value.has_like
                await axios.post('/advertisement-likes', {
                    advertisement_id: advertisement.value.advertisement_id,
                    counter: advertisement.value.has_like
                })
            } catch (error) {
                advertisement.value.has_like = !advertisement.value.has_like
                console.log(error)
            }
        }

        const toggleShowBoardModal = async (advertisementId) => {
            if (!isSaved()) {
                boardModalStore.toggleModal(advertisementId)
            } else {
                try {
                    await boardModalStore.unsaveAd(advertisement.value.saved_board_id, advertisement.value.advertisement_id)
                    advertisement.value.saved_board_id = 0
                } catch (error) {
                    console.error(error)
                }
            }
        }

        return { isImage, isSaved, likeDislike, toggleShowBoardModal }
    },
}
</script>
