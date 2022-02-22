<template>
    <auth-layout>
        <template v-slot:title>Sign Up</template>
        <sign-up-form />
    </auth-layout>
</template>

<script>
import SignUpForm from '@/components/auth/SignUpForm.vue'

export default {
    name: 'AppSignUp',
    components: {
        SignUpForm
    }
}
</script>
