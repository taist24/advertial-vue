<template>
    <!-- navbar -->
    <nav class="nav">
        <!-- brand -->
        <div class="nav__brand">
            <!-- sidebar button -->
            <div class="col-span-1">
                <button type="button" class="block" @click="toggleSidebar">
                    <burger-icon />
                </button>
            </div>

            <!-- logo -->
            <div class="col-span-2">
                <h1 class="font-semibold text-3xl">Ads Library</h1>
            </div>
        </div>

        <!-- default filters -->
        <div class="nav__filter-wrapper">
            <!-- search -->
            <label class="block search-control-group" for="search-control">
                <input
                    type="text"
                    placeholder="Search by Keyword"
                    class="search-control"
                    id="search-control"
                    v-model.lazy="filters.search.item.value"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute left-0 mx-3 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </label>

            <!-- type of ad -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.type_of_ad"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- niche/sub-niche -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.sub_industry"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- format -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.format"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- more filter -->
            <div class="col-span-2 sm:col-span-1 w-full relative">
                <!-- input -->
                <button
                    class="w-full px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between font-medium text-blue-700 bg-gray-300"
                    :class="showMoreFilter ? 'text-white bg-blue-700' : 'text-blue-700 bg-gray-300'"
                    @click.prevent="showMoreFilter = !showMoreFilter"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill=" none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    <span
                        :class="{ 'text-gray-400': !showMoreFilter }"
                    >{{ showMoreFilter ? 'Less Filter' : 'More FIlter' }}</span>
                    <div class="-space-y-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>

        <!-- more filters -->
        <div class="nav__filter-wrapper nav__filter-col-end" v-show="showMoreFilter">
            <!-- objective -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.objective"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- analysis -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.analysis"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- platform -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.platform"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- language -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.language"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- other -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.other"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />

            <!-- sort by -->
            <select-dropdown
                class="col-span-2 sm:col-span-1 w-full relative"
                :dropdown="filters.sort_by"
                :setDropdownSelectedItem="setDropdownSelectedItem"
            />
        </div>
    </nav>
</template>

<script>
import useAdvertisementStore from '@/store/advertisement.store'
import BurgerIcon from '@/components/icons/BurgerIcon.vue'
import SelectDropdown from '@/components/SelectDropdown.vue'
import { storeToRefs } from 'pinia'

export default {
    name: 'AppNavBar',
    components: {
        BurgerIcon,
        SelectDropdown
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
        const advertisementStore = useAdvertisementStore()

        const {
            showMoreFilter,
            filters
        } = storeToRefs(advertisementStore)


        const {
            setDropdownSelectedItem
        } = advertisementStore

        return {
            showMoreFilter,
            filters,
            setDropdownSelectedItem
        }
    }
}
</script>
