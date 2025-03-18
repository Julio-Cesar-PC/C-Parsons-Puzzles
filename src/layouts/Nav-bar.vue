<script setup>
import { RouterLink } from 'vue-router'
import { GoogleLogin } from 'vue3-google-login';
import { useAuth } from '@/composables/useAuth';
import ProgressLevelBar from '@/components/ProgressLevelBar.vue';

const { userData, auth, handleLogin, logout, connecting } = useAuth();

</script>

<template>
  <header>
    <div class="navbar border-b-2 bg-base-200 border-base-300">
      <div class="navbar-start">
        <RouterLink to="/" class="btn btn-ghost text-xl">C Parsons Puzzles</RouterLink>
      </div>
      <div class="navbar-center">
        <ProgressLevelBar v-if="auth" :userLevel="userData.userLevel" :levelProgress="userData.levelProgress"
          :nextUserLevel="userData.nextUserLevel" />
      </div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink to="exercicios">Exercícios</RouterLink>
          </li>
          <li>
            <RouterLink to="sobre">Sobre</RouterLink>
          </li>
          <li v-if="!userData">
            <div v-if="connecting" class="loading loading-spinner loading-md"></div>
            <GoogleLogin v-else :callback="handleLogin" />
          </li>
          <li v-else class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img v-if="userData" :src="userData.pic" alt="Foto de Perfil" />
                <img v-else src="/src/assets/anonimo.png" alt="Usuário Desconhecido" />
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <button @click="logout">Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
