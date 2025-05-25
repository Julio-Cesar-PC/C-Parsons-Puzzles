<script setup>
import { GoogleLogin } from 'vue3-google-login'
import { useAuth } from '@/composables/useAuth'

const { userData, handleLogin, logout, connecting } = useAuth()
</script>

<template>
  <main>
    <div class="flex items-center flex-wrap justify-center min-h-2xl px-20 my-2">
      <div
        class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300 flex justify-center gap-8"
      >
        <div class="container m-auto px-6 py-12">
          <div
            class="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700 animate-fade-in"
          >
            <!-- Se o usuário estiver logado -->
            <div v-if="userData" class="flex flex-col items-center text-center">
              <img
                :src="userData.pic"
                alt="Foto de perfil"
                class="w-20 h-20 rounded-full shadow-lg mb-4"
              />
              <h2 class="text-xl font-semibold text-blue-400">{{ userData.name }}</h2>
              <p class="text-gray-300 mb-4">{{ userData.email }}</p>
              <button class="btn btn-error mt-4" @click="logout">Sair</button>
            </div>

            <!-- Se o usuário não estiver logado -->
            <div v-else class="text-center">
              <h1 class="text-2xl md:text-3xl font-semibold text-blue-400 mb-4">
                Bem-vindo à C Parsons Puzzles!
              </h1>
              <p class="text-lg leading-relaxed text-justify">
                A plataforma utiliza <span class="text-primary">Parsons Puzzles</span> para ajudar
                no aprendizado de lógica de programação. <br />
                O objetivo é desembaralhar blocos de código para formar soluções corretas,
                facilitando o entendimento da estrutura dos programas.
              </p>

              <!-- Loader enquanto conecta -->
              <div v-if="connecting" class="loading loading-spinner loading-md mt-6"></div>

              <!-- Botão de login -->
              <div v-else class="mt-6">
                <GoogleLogin :callback="handleLogin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
