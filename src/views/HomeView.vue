<script setup>
import { GoogleLogin } from 'vue3-google-login';
import { useAuth } from '@/composables/useAuth';

const { userData, handleLogin, logout, connecting } = useAuth();
</script>

<template>
    <div class="flex flex-col items-center justify-center h-[95vh]">
        <h1 class="text-4xl font-bold">Home</h1>
        <div v-if="userData">
            <p>Olá, {{ userData.name }}</p>
            <button class="btn" @click="logout">Logout</button>
        </div>
        <div v-else>
            <p>Faça login para continuar</p>
            <div v-if="connecting" class="loading loading-spinner loading-md"></div>
            <GoogleLogin v-else :callback="handleLogin" />
        </div>
    </div>
</template>

<style></style>
