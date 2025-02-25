<script setup>
import { GoogleLogin, decodeCredential } from 'vue3-google-login';
import { ref } from 'vue';

const userData = ref(null);

const callback = (response) => {
  console.log('Handle the response ', response);
  if (response.credential) {
    const credential = decodeCredential(response.credential);
    console.log('Decoded credential ', credential);
    userData.value = credential;
    console.log('User data ', userData.value);
  }
};

</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <GoogleLogin :callback="callback">
    </GoogleLogin>
  </div>
</template>

<style></style>
