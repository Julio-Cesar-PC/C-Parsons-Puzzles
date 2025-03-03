<script setup>
import { RouterLink } from 'vue-router'
import { GoogleLogin } from 'vue3-google-login';
import { useAuth } from '@/composables/useAuth';

const { userData, handleLogin, logout } = useAuth();

</script>

<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl">C Parsons Puzzles</RouterLink>
      </div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink to="parsons">Parsons</RouterLink>
          </li>
          <li>
            <RouterLink to="sobre">Sobre</RouterLink>
          </li>
          <li class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img v-if="userData" :src="userData.picture" alt="Foto de Perfil" />
                <img v-else src="/src/assets/anonimo.png" alt="Usuário Desconhecido" />
              </div>
            </div>
            <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li v-if="!userData">
                <GoogleLogin :callback="handleLogin" />
              </li>
              <li v-else>
                <button @click="logout">Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
