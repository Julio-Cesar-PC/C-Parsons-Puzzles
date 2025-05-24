<template>
  <vue3-tags-input
    class="bg-base-100 rounded-lg"
    :tags="tags"
    placeholder="Matemática, Física..."
    @on-tags-changed="handleChangeTag"
  />
</template>
<script>
import { defineComponent } from 'vue'
import Vue3TagsInput from 'vue3-tags-input'

export default defineComponent({
  name: 'BasicExample',

  components: {
    Vue3TagsInput,
  },

  data() {
    return {
      tags: [],
    }
  },

  methods: {
    handleChangeTag(tags) {
      this.tags = tags
    },
  },
})
</script>

<style lang="css">
/* Área do componente inteiro */
.v3ti {
  background-color: rgb(29, 35, 42);
  color: #ffffff;
}

/* Conteúdo do input */
.v3ti-content {
  background: rgb(29, 35, 42);
  box-shadow: none;
  color: #ffffff;
  border: 1px solid rgb(56, 63, 71) !important;
  background-color: rgb(29, 35, 42) !important;
}

/* Input interno */
.v3ti-input {
  background-color: rgb(29, 35, 42);
  color: #ffffff;
  border: none;
  box-shadow: none;
}

/* Remove borda e outline ao focar */
.v3ti-input:focus {
  outline: none;
  border: none;
  box-shadow: none;
}

/* Dropdown de sugestões (se usado) */
.v3ti-suggestions {
  background-color: rgb(29, 35, 42);
  border: 1px solid rgb(56, 63, 71);
  color: #ffffff;
}

/* Tag individual */
.v3ti .v3ti-tag {
  background-color: rgb(56, 63, 71);
  border: 1px solid #222222;
  border-radius: 0;
  box-shadow: none;
  color: #ffffff;
}

/* Botão de remover tag */
.v3ti .v3ti-tag .v3ti-remove-tag {
  color: #cccccc;
  transition: color 0.3s;
}

.v3ti .v3ti-tag .v3ti-remove-tag:hover {
  color: #ffffff;
}
</style>
