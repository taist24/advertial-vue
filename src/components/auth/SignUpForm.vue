
<template>
    <div
        class="text-red-400 bg-red-100 py-4 px-5 border border-red-300 rounded text-center"
        v-show="firstResponseError"
    >{{ firstResponseError }}</div>
    <form class="mt-5 mb-8" @submit="onSubmit">
        <label class="block mb-4" for="full-name">
            <p class="text-left text-sm md:text-base font-medium mb-2">Full name</p>
            <input
                name="full_name"
                class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                value
                id="full-name"
                placeholder="Full name"
                v-model="fullName"
            />
            <p
                class="text-sm text-red-500 mt-1"
                v-if="errors.form.full_name"
            >{{ errors.form.full_name }}</p>
        </label>

        <label class="block mb-4" for="username">
            <p class="text-left text-sm md:text-base font-medium mb-2">Username</p>
            <input
                name="username"
                class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                id="username"
                placeholder="Username"
                v-model="username"
            />
            <p
                class="text-sm text-red-500 mt-1"
                v-if="errors.form.username"
            >{{ errors.form.username }}</p>
        </label>

        <label class="block mb-4" for="email">
            <p class="text-left text-sm md:text-base font-medium mb-2">Email address</p>
            <input
                name="email"
                type="text"
                class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                id="email"
                placeholder="Email address"
                v-model="email"
            />
            <p class="text-red-500 text-sm mt-1" v-if="errors.form.email">{{ errors.form.email }}</p>
        </label>

        <label class="block mb-4" for="password">
            <p class="font-medium mb-2 text-left text-sm md:text-base">Password</p>
            <div class="relative">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    name="password"
                    class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                    id="password"
                    placeholder="Password"
                    v-model="password"
                />
                <button
                    type="button"
                    class="absolute z-10 transform -translate-y-1/2 -translate-x-1/2 right-0 top-1/2"
                    @click="showPassword = !showPassword"
                >
                    <eye-open-icon v-if="!showPassword" />
                    <eye-close-icon v-else />
                </button>
            </div>
            <p
                class="text-red-500 text-sm mt-1"
                v-if="errors.form.password"
            >{{ errors.form.password }}</p>
        </label>

        <label class="block mb-4" for="password-confirmation">
            <p class="text-left text-sm md:text-base font-medium mb-2">Confirm Password</p>
            <div class="relative">
                <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    name="password_confirmation"
                    class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                    id="password-confirmation"
                    placeholder="Confirm Password"
                    v-model="passwordConfirmation"
                />
                <button
                    type="button"
                    class="absolute z-10 transform -translate-y-1/2 -translate-x-1/2 right-0 top-1/2"
                    @click.prevent="showConfirmPassword = !showConfirmPassword"
                >
                    <eye-open-icon v-if="!showConfirmPassword" />
                    <eye-close-icon v-else />
                </button>
            </div>
            <p
                class="text-sm text-red-500 mt-1"
                v-if="errors.form.password_confirmation"
            >{{ errors.form.password_confirmation }}</p>
        </label>

        <div class="mt-6">
            <button
                type="submit"
                class="relative flex justify-center px-5 py-4 border border-transparent text-sm font-medium leading-3 rounded-md text-white bg-indigo-600 lg:text-lg hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out w-full"
            >Sign Up</button>
        </div>

        <div class="mt-6 flex items-center">
            <p class="block text-gray-900 text-sm md:text-base">Already have login?</p>
            <div class="ml-1">
                <router-link
                    :to="{ name: 'login' }"
                    class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >Login</router-link>
            </div>
        </div>
    </form>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useField, useForm } from 'vee-validate';
import EyeOpenIcon from '@/components/icons/EyeOpenIcon.vue';
import EyeCloseIcon from '@/components/icons/EyeCloseIcon.vue';
import axios from 'axios';

export default {
    name: 'SignUpForm',
    components: {
        EyeOpenIcon,
        EyeCloseIcon
    },
    setup() {
        const showPassword = ref(false)
        const showConfirmPassword = ref(false)
        const errors = reactive({
            response: [],
            form: []
        })

        const { errors: formErrors, handleSubmit, isSubmitting } = useForm({
            validationSchema: {
                full_name: 'required|min:3',
                username: 'required|min:3',
                email: 'required|email',
                password: 'required|min:8',
                password_confirmation: 'required|confirmed:@password',
            }
        })

        const { value: fullName } = useField('full_name', {}, { label: 'full name' })
        const { value: username } = useField('username')
        const { value: email } = useField('email')
        const { value: password } = useField('password')
        const { value: passwordConfirmation } = useField('password_confirmation', {}, { label: 'confirm password' })

        errors.form = formErrors
        const firstResponseError = computed(() => {
            if (typeof errors.response === 'string') {
                return errors.response
            }

            const [error] = Object.entries(errors.response)?.[0]?.[1] || ''
            return error;
        })

        console.log('Form submitting', isSubmitting.value)

        const onSubmit = handleSubmit(async (data) => {
            try {
                const response = await axios.post('/signup', data)
                console.log(response)
            } catch (error) {
                if (error.response.status === 422) {
                    errors.response = error.response.data.errors
                } else if (error.response.status === 409) {
                    errors.response = 'An account already exists with the given email'
                }
            }
        })

        return {
            showPassword,
            showConfirmPassword,
            email,
            username,
            fullName,
            password,
            passwordConfirmation,
            errors,
            firstResponseError,
            onSubmit
        }
    }
}
</script>
