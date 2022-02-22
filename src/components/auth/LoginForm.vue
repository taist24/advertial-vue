<template>
    <div
        class="text-red-400 bg-red-100 py-4 px-5 border border-red-300 rounded text-center"
        v-show="firstResponseError"
    >{{ firstResponseError }}</div>

    <form @submit="onSubmit" class="pmt-5">
        <div>
            <div class="mb-4">
                <label for="email">
                    <p class="text-left text-sm md:text-base font-medium mb-2">Email</p>
                    <input
                        name="email"
                        type="text"
                        class="appearance-none relative block text-sm xl:text-base w-full px-3 py-3 lg:px-5 lg:py-4 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:leading-5"
                        id="email"
                        placeholder="Email"
                        v-model="email"
                    />
                </label>
                <p class="text-red-500 text-sm mt-1" v-if="formErrors.email">{{ formErrors.email }}</p>
            </div>

            <div class="mb-4">
                <label for="password">
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
                            @click="toggleShowPassword"
                            @keypress.enter="toggleShowPassword"
                        >
                            <eye-open-icon v-if="!showPassword" />
                            <eye-close-icon v-else />
                        </button>
                    </div>
                </label>
                <p
                    class="text-red-500 text-sm mt-1"
                    v-if="formErrors.password"
                >{{ formErrors.password }}</p>
            </div>
        </div>

        <div class="mt-4 flex items-center justify-between">
            <label
                for="remember_me"
                class="text-xs lg:text-sm leading-5 text-gray-900 flex items-center"
            >
                <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <span class="ml-2">
                    Remember
                    me
                </span>
            </label>
            <a
                href="https://advertial.com/forgot-password"
                class="font-medium text-indigo-600 text-xs lg:text-sm leading-5 hover:text-indigo-600 focus:outline-none focus:underline transition ease-in-out duration-150"
            >Forgot your password?</a>
        </div>

        <div class="mt-6">
            <button
                type="submit"
                class="relative flex justify-center px-5 py-4 border border-transparent text-sm font-medium leading-3 rounded-md text-white bg-indigo-600 lg:text-lg hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out w-full"
            >
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <lock-icon />
                </span>
                Sign In
            </button>
        </div>
        <p class="mt-6 text-sm md:text-base">
            Don't have an account?
            <router-link :to="{ name: 'sign-up' }" class="text-indigo-600 font-medium">Get Started</router-link>
        </p>
    </form>
</template>

<script>
import { computed, reactive, ref, toRef } from "vue"
import { useField, useForm } from 'vee-validate';
import { useRouter } from "vue-router";
import useAuthStore from "@/store/auth.store";
import axios from "axios";
import LockIcon from '@/components/icons/LockIcon.vue';
import EyeOpenIcon from '@/components/icons/EyeOpenIcon.vue';
import EyeCloseIcon from '@/components/icons/EyeCloseIcon.vue';

export default {
    name: 'LoginForm',
    components: {
        LockIcon,
        EyeOpenIcon,
        EyeCloseIcon,
    },
    setup: () => {
        const store = useAuthStore()
        const router = useRouter()
        const isFormInSubmission = ref(false)
        const showPassword = ref(false)
        const errors = reactive({
            response: [],
            form: []
        })

        const { errors: formErrors, handleSubmit, isSubmitting } = useForm({
            validationSchema: {
                email: 'required|min:3',
                password: 'required|min:8'
            }
        })

        const { value: email } = useField('email')
        const { value: password } = useField('password')

        errors.form = formErrors
        const firstResponseError = computed(() => {
            if (typeof errors.response === 'string') {
                return errors.response
            }

            const [error] = Object.entries(errors.response)?.[0]?.[1] || ''
            return error;
        })

        isFormInSubmission.value = isSubmitting.value

        const toggleShowPassword = () => {
            showPassword.value = !showPassword.value
        }

        const onSubmit = handleSubmit(async (formData) => {
            try {
                const { data: { data: response } } = await axios.post('/login', formData)
                store.logIn(response);
                router.push({ name: 'home' })
            } catch (error) {
                if (error.response.status === 401) {
                    errors.response = error.response.data.message
                } else if (error.response.status === 422) {
                    errors.response = error.response.data.errors
                } else {
                    errors.response = 'Oops! Something went wrong please try again later'
                }
            }
        })

        return {
            email,
            password,
            firstResponseError,
            formErrors: toRef(errors, 'form'),
            showPassword,
            toggleShowPassword,
            onSubmit
        }
    }
}
</script>
