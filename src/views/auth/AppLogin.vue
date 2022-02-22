<template>
    <auth-layout>
        <template v-slot:title>Login</template>
        <login-form />
    </auth-layout>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
    name: "AppLogin",
    components: {
        LoginForm
    }
};
</script>
