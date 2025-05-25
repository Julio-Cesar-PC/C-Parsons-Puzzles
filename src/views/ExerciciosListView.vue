<script setup>
import { ref, onMounted } from 'vue'
import CodeViewer from '@/components/CodeViewer.vue' // ou o caminho correto do seu componente

const exercicios = ref([])
const loading = ref(true)
const error = ref(null)
const modal = ref(null)
const exercicioSelecionado = ref(null)

const abrirModal = (ex) => {
  exercicioSelecionado.value = ex
  modal.value.showModal()
}

const fetchExercicios = async () => {
  loading.value = true
  try {
    const res = await fetch(
      'https://script.google.com/macros/s/AKfycbywGgvJFPnwXUqMjWtUkGqaewTqq7LaPNyMq2EmzEN-e-MoML1crdOTinf7upsxpEhl/exec/exec?actionRequest=getExercicioFiltrado&dificuldade=&area=&tags=',
    )
    const json = await res.json()
    if (json.status === 'success') {
      exercicios.value = json.data
    } else {
      error.value = 'Resposta inválida da API'
    }
  } catch (err) {
    error.value = err.message || 'Erro desconhecido'
  } finally {
    loading.value = false
  }
}

onMounted(fetchExercicios)
</script>

<template>
  <div class="flex items-center flex-wrap justify-center min-h-2xl px-20 my-2">
    <div class="px-1 py-1 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300">
      <div class="container m-auto px-1 py-12">
        <div class="flex justify-between items-center mb-8">
          <!-- Espaço invisível para equilíbrio -->
          <div class="w-[100px]"></div>

          <!-- Título centralizado -->
          <h1 class="text-3xl font-bold text-center flex-1">Lista de Exercícios</h1>

          <!-- Botão "novo" à direita com ícone -->
          <RouterLink class="btn btn-primary flex items-center gap-2" to="createExercicio">
            <v-icon name="co-plus" />
            Novo
          </RouterLink>
        </div>

        <div v-if="loading" class="flex justify-center items-center">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-if="error" class="alert alert-error mb-4">
          <span>Erro ao carregar os exercícios: {{ error }}</span>
        </div>

        <div
          v-if="!loading && exercicios.length"
          class="max-h-[65vh] overflow-x-auto overflow-y-auto"
        >
          <table
            class="table table-zebra table-sm table-pin-rows table-pin-cols bg-base-100 rounded-xl border border-base-200"
          >
            <thead>
              <tr class="text-base-content">
                <th></th>
                <th>Enunciado</th>
                <th>Dificuldade</th>
                <th>Área</th>
                <th>Tags</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ex in exercicios" :key="ex.id" class="hover">
                <td>{{ ex.id }}</td>
                <td class="max-w-xs whitespace-pre-wrap">{{ ex.enunciado }}</td>
                <td>{{ ex.dificuldade }}</td>
                <td>{{ ex.area || 'N/A' }}</td>
                <td>{{ ex.tags || 'N/A' }}</td>
                <td>
                  <RouterLink
                    class="btn btn-sm btn-secondary"
                    :to="{ name: 'editExercicio', params: { id: ex.id } }"
                  >
                    Editar
                  </RouterLink>
                  <button class="btn btn-sm btn-primary" @click="abrirModal(ex)">Ver código</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="!loading && !exercicios.length" class="text-center text-base-content/50 mt-6">
          Nenhum exercício encontrado.
        </div>

        <!-- Modal -->
        <dialog ref="modal" class="modal">
          <div class="modal-box w-11/12 max-w-4xl bg-base-100 text-base-content">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 class="font-bold text-lg mb-4">
              Código do Exercício #{{ exercicioSelecionado?.id }}
            </h3>
            <CodeViewer v-if="exercicioSelecionado" :modelValue="exercicioSelecionado.exercicio" />
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>
