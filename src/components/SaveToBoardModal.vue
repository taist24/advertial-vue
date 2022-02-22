<template>
    <!-- modal: save ad to board -->
    <div
        class="fixed inset-0 z-30 flex items-center justify-center overflow-auto bg-black bg-opacity-80"
        v-show="showModal"
        v-cloak
    >
        <!-- Modal inner -->
        <div
            class="w-full max-w-xl mx-auto text-left bg-white shadow-lg rounded-lg font-medium"
            transition:enter="motion-safe:ease-out duration-300"
            transition:enter-start="opacity-0 scale-90"
            transition:enter-end="opacity-100 scale-100"
        >
            <!-- Title / Close-->
            <div class="bg-blue-700 text-white p-5 rounded-t-lg">
                <h5
                    class="mr-3 max-w-none rounded-lg text-center text-2xl font-semibold"
                >Save This Ad</h5>
            </div>

            <div class="p-5 space-y-8">
                <div class="flex flex-col items-center">
                    <p class="text-base mb-3">Save to board:</p>

                    <div class="relative z-30 w-full">
                        <!-- select -->
                        <button
                            type="button"
                            class="font-medium w-full flex items-center justify-between px-5 py-2 bg-gray-200 rounded-lg focus:outline-none"
                            :class="{ 'border border-red-400': isNewBoardValid === false, 'text-gray-400': !newBoard && !selectedBoard }"
                            @click.prevent="toggleDropdown"
                        >
                            <span>{{ newBoard || (selectedBoard ? selectedBoard.name : 'Select board') }}</span>
                            <div class="-space-y-1 text-blue-700">
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
                        <!-- dropdown -->
                        <ul
                            class="absolute z-10 top-10 left-0 bg-gray-100 max-h-36 overflow-y-auto w-full rounded my-1"
                            v-show="openDropdown"
                            v-cloak
                        >
                            <li class="py-2 px-3 cursor-pointer text-sm">
                                <label for="create-new-board">
                                    <input
                                        type="text"
                                        class="w-full py-2 px-3 rounded text-gray-900 focus:outline-none"
                                        placeholder="Create new board"
                                        id="create-new-board"
                                        v-model="newBoard"
                                        @keyup.enter="createNewBoard"
                                    />
                                </label>
                            </li>
                            <li
                                class="py-2 px-3 cursor-pointer text-sm"
                                v-for="board in boards"
                                :key="board.id"
                                @click="selectItem(board)"
                                @keypress.enter="selectItem(board)"
                            >{{ board.name }}</li>
                        </ul>
                    </div>
                </div>
                <div class="flex items-center justify-between space-x-2">
                    <button
                        type="button"
                        class="w-full py-2 px-3 font-medium rounded-lg border bg-gray-100 text-gray-500 border-gray-300"
                        @click="toggleModal"
                    >Cancel</button>
                    <button
                        type="button"
                        class="flex items-center justify-center w-full py-2 px-3 font-medium rounded-lg border text-white bg-blue-700 border-blue-700"
                        @click.prevent="saveAd"
                        :disabled="isSubmitting"
                    >
                        <!-- icon: loading -->
                        <svg
                            class="animate-spin -ml-1 mr-3 h-3 w-3 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            v-show="isSubmitting"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            />
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <!-- icon: plus -->
                        <plus-icon v-show="!isSubmitting" />
                        <span>Save Ads</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onBeforeMount } from "vue"
import useBoardModalStore from '@/store/board-modal.store'
import { storeToRefs } from "pinia"
import PlusIcon from "./icons/PlusIcon.vue"

export default {
    name: 'SaveToBoardModal',
    components: { PlusIcon },
    props: {
        setSavedBoardId: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const boardModalStore = useBoardModalStore();

        const { toggleDropdown, toggleModal, selectItem, createNewBoard } = boardModalStore

        const {
            newBoard,
            showModal,
            boards,
            selectedBoard,
            isSubmitting,
            openDropdown,
            isNewBoardValid,
        } = storeToRefs(boardModalStore);

        onBeforeMount(async () => {
            try {
                await boardModalStore.fetchBoards()
            }
            catch (error) {
                console.log(error);
            }
        });

        const saveAd = async () => {
            try {
                const data = await boardModalStore.saveAd()
                props.setSavedBoardId(data)
                toggleModal()
            } catch (error) {
                console.log(error)
            }
        }

        return {
            newBoard,
            isNewBoardValid,
            boards,
            showModal,
            openDropdown,
            isSubmitting,
            selectedBoard,
            boardModalStore,
            toggleDropdown,
            toggleModal,
            selectItem,
            saveAd,
            createNewBoard
        };
    },
}
</script>
