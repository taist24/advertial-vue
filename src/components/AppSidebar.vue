<template>
    <!-- sidebar -->
    <aside class="sidebar" :class="{ '-translate-x-full': !showSidebar }">
        <div>
            <!-- top nav -->
            <div class="p-3 sm:p-5 flex items-center justify-between">
                <div class="w-3/12 flex items-center justify-between">
                    <cross-icon class="h-6 w-6 cursor-pointer" @click="toggleSidebar" />
                    <svg
                        class="w-5 h-5"
                        viewBox="0 0 19 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8.55241 0.980333C7.61988 8.13602 4.62674 14.791 6.10352e-05 20H5.19056C9.05421 14.6639 11.5664 8.3009 12.4427 1.54024C11.2124 1.35371 9.98193 1.16686 8.75175 0.980333H8.55241Z"
                            fill="#24588F"
                        />
                        <path
                            d="M16.0065 12.7297C10.2221 13.6926 4.71916 16.1777 6.10352e-05 20H7.49747C10.7994 18.2599 14.3636 17.1467 18.0328 16.7174C17.2839 15.4299 16.6074 14.0983 16.0065 12.7297Z"
                            fill="#24588F"
                        />
                        <path
                            d="M12.522 0.980333H8.59576C8.71094 7.70629 10.4481 14.2582 13.6026 20H18.2734C14.6601 14.4243 12.6535 7.80541 12.522 0.980333Z"
                            fill="#24588F"
                        />
                    </svg>
                </div>
                <div class="w-9/12 flex items-center justify-end relative">
                    <span class="flex h-3 w-3 absolute top-0 right-0">
                        <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"
                        ></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-red-300"></span>
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </div>
            </div>
            <!-- profile -->
            <div class="sidebar__profile-wrapper">
                <img
                    src="https://advertial.com/assets/client/images/avatar_woman.png"
                    alt="Avatar"
                    class="sidebar__avatar"
                />
                <div class="grid grid-rows-2 items-center">
                    <p class="sidebar__username">{{ fullName }}</p>
                    <p class="sidebar__brand">Anis Studio</p>
                </div>
            </div>

            <!-- menu 1 -->
            <ul class="list">
                <li class="title">browse</li>
                <li>
                    <a href="https://advertial.com" class="list-item active">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <span>Ads Library</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="list-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                        <span>Featured</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="list-item">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                        </svg>
                        <span>Trending</span>
                    </a>
                </li>
            </ul>
            <!-- menu 2 -->
            <ul class="list">
                <li class="title">board</li>
                <li class="list-item">
                    <a href="https://advertial.com/boards/marketing">Marketing</a>
                </li>
                <li class="list-item">
                    <a href="https://advertial.com/boards/design">Design</a>
                </li>
                <li class="list-item">
                    <a href="https://advertial.com/boards/ideas-dump">Ideas Dump</a>
                </li>
                <li class="list-item">
                    <a href="https://advertial.com/boards/tudung">Tudung</a>
                </li>
            </ul>
        </div>
        <!-- setting -->
        <div class="sidebar__bottom">
            <button type="button" class="flex items-center font-medium text-blue-700">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-3 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <span>Settings</span>
            </button>
            <form @submit.prevent="logOut">
                <input type="hidden" name="_token" value="9RAdgSlT8io8TtoYwDGwywVJs8HnVI1ZmOxbvTR4" />
                <button type="submit" class="flex items-center font-medium text-blue-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-3 text-blue-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    <span>Log out</span>
                </button>
            </form>
        </div>
    </aside>
</template>

<script>
import useAuthStore from '@/store/auth.store'
import CrossIcon from '@/components/icons/CrossIcon.vue'
import { useRouter } from 'vue-router'

export default {
    name: 'AppSidebar',
    components: {
        CrossIcon
    },
    props: {
        showSidebar: {
            type: Boolean,
            required: true
        },
        toggleSidebar: {
            type: Function,
            required: true
        }
    },
    setup() {
        const store = useAuthStore()
        const router = useRouter()

        const logOut = async () => {
            try {
                await store.logOut()
                router.push({ name: 'login' })
            } catch (error) {
                console.log(error)
            }
        }

        return { logOut, fullName: store.fullName }
    }
}
</script>
