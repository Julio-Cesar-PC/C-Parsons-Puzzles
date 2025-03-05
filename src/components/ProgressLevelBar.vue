<script setup>
import { computed } from 'vue';

const props = defineProps({
  userLevel: String,
  levelProgress: Number,
  nextUserLevel: String,
  maxProgress: {
    type: Number,
    default: 10
  }
});
</script>

<template>
  <div class="flex items-center gap-2">
    <p>{{ userLevel }}</p>
    <progress class="progress progress-primary w-56" :value="levelProgress" :max="maxProgress">Experiência</progress>
    <p>{{ nextUserLevel }}</p>
  </div>
</template>
