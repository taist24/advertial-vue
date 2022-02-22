<template>
    <div class="relative">
        <!-- input -->
        <div class="form-group">
            <label
                class="p-2 block"
                :for="dropdown.elementId"
                @click="toggleDropdown"
                @keypress.enter="toggleDropdown"
            >
                <input
                    type="text"
                    class="form-control"
                    :placeholder="dropdown.placeholder"
                    :id="dropdown.elementId"
                    :value="selectedItem.name"
                    readonly
                />
            </label>

            <!-- up/down icon -->
            <div
                class="text-blue-700 absolute top-1/2 right-2 transform -translate-y-1/2 -space-y-1"
                @click.stop="toggleDropdown"
                @keypress.stop.enter="toggleDropdown"
                v-if="!isItemSelected"
            >
                <div>
                    <chevron-up-icon class="h-3 w-3" />
                    <chevron-down-icon class="h-3 w-3" />
                </div>
            </div>

            <!-- close icon -->
            <cross-icon
                class="h-5 w-5 text-red-400 cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 -space-y-1"
                @click="resetItem"
                v-if="isItemSelected"
            />
        </div>

        <!-- list -->
        <div class="dropdown" v-if="showDropdown">
            <ul>
                <template v-if="!dropdown.items.length">
                    <li class="dropdown-item">No values found!</li>
                </template>
                <template v-if="dropdown.items.length">
                    <li
                        class="dropdown-item"
                        v-for="item in dropdown.items"
                        :key="item.id"
                        @click="setItem(item)"
                        @keypress.stop.enter="setItem(item)"
                    >{{ item.name }}</li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
import CrossIcon from '@/components/icons/CrossIcon.vue'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
import { computed, ref } from 'vue'

export default {
    name: 'SelectDropdown',
    components: {
        ChevronUpIcon,
        ChevronDownIcon,
        CrossIcon
    },
    props: {
        setDropdownSelectedItem: {
            type: Function,
            required: true
        },
        dropdown: {
            type: Object,
            default: () => ({
                items: [],
                item: {},
                placeholder: 'Example Placeholder',
                elementId: 'example-input'
            })
        },
    },
    setup(props) {
        const selectedItem = ref({})
        const showDropdown = ref(false)

        const isItemSelected = computed(() => Object.entries(selectedItem.value).length > 0)
        const toggleDropdown = () => { showDropdown.value = !showDropdown.value }

        const setItem = (item) => {
            selectedItem.value = item
            toggleDropdown()
            props.setDropdownSelectedItem(props.dropdown.name, item)
        }

        const resetItem = () => {
            selectedItem.value = {}
            props.setDropdownSelectedItem(props.dropdown.name, {})
        }

        return { showDropdown, selectedItem, isItemSelected, toggleDropdown, setItem, resetItem }
    }
}
</script>
