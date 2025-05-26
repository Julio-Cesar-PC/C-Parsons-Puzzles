<script setup>
import { ref, onMounted } from 'vue'
import CodeViewer from '@/components/CodeViewer.vue' // ou o caminho correto do seu componente
import { deleteExercicio, getExercicioFiltrado } from '@/api/exercicios'

const exercicios = ref([])
const loading = ref(true)
const error = ref(null)
const modal = ref(null)
const exercicioSelecionado = ref(null)

// Filtros
const filtroDificuldade = ref('')
const filtroArea = ref('')
const filtroTags = ref('')

const abrirModal = (ex) => {
  exercicioSelecionado.value = ex
  modal.value.showModal()
}

const fetchExercicios = async () => {
  loading.value = true

  const params = {
    dificuldade: filtroDificuldade.value || undefined,
    area: filtroArea.value || undefined,
    tags: filtroTags.value || undefined,
  }

  try {
    const response = await getExercicioFiltrado(params)
    console.log('Exercícios filtrados:', response)
    exercicios.value = response.data || []
  } catch (err) {
    error.value = err.message || 'Erro ao carregar os exercícios.'
  } finally {
    loading.value = false
  }
}

const handleDeleteExercicio = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este exercício?')) return

  const payload = {
    actionRequest: 'deleteExercicio',
    payload: {
      id: id,
    },
  }

  try {
    const res = await deleteExercicio(payload)
    if (res.status === 'success') {
      exercicios.value = exercicios.value.filter((ex) => ex.id !== id)
      alert('Exercício excluído com sucesso!')
    } else {
      alert('Erro ao excluir exercício: ' + res.message)
    }
  } catch (err) {
    alert('Erro ao excluir exercício: ' + (err.message || 'Erro desconhecido'))
  }
}

onMounted(fetchExercicios)
</script>

<template>
  <div class="flex items-center flex-wrap justify-center min-h-2xl px-20 my-2">
    <div class="px-1 py-1 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300">
      <div class="container m-auto px-1 py-12">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-3xl font-bold text-center flex-1">Lista de Exercícios</h1>
        </div>
        <!-- Filtros -->
        <div class="flex justify-between items-end mb-4">
          <div class="flex gap-4 items-end">
            <div class="form-control">
              <label class="label">Dificuldade:</label>
              <select v-model="filtroDificuldade" class="select w-full select-bordered">
                <option value="">Todas</option>
                <option value="0">Muito fácil</option>
                <option value="1">Fácil</option>
                <option value="2">Médio</option>
                <option value="3">Difícil</option>
                <option value="4">Muito difícil</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">Área do exercício:</label>
              <select v-model="filtroArea" class="select w-full select-bordered">
                <option value="">Todas</option>
                <option value="Entrada e saída">Entrada e saída</option>
                <option value="Condicional">Condicional</option>
                <option value="Laços de repetição">Laços de repetição</option>
                <option value="Vetores (arrays)">Vetores (arrays)</option>
                <option value="Matrizes">Matrizes</option>
                <option value="Strings">Strings</option>
                <option value="Funções">Funções</option>
                <option value="Ponteiros">Ponteiros</option>
                <option value="Structs">Structs</option>
                <option value="Arquivos">Arquivos</option>
                <option value="Recursão">Recursão</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Tags</span>
              </label>
              <input
                v-model="filtroTags"
                type="text"
                class="input input-bordered"
                placeholder="Ex: if, while"
              />
            </div>

            <button class="btn btn-primary" @click="fetchExercicios">Filtrar</button>
          </div>
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
          class="max-h-[60vh] overflow-x-auto overflow-y-auto"
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
                  <div class="flex gap-2">
                    <!-- <RouterLink
                      class="btn btn-square btn-secondary"
                      :to="{ name: 'exercicio', params: { id: ex.id } }"
                    >
                      Ver
                    </RouterLink> -->
                    <button
                      title="Ver Código"
                      class="btn btn-square btn-primary"
                      @click="abrirModal(ex)"
                    >
                      <v-icon name="fa-code" />
                    </button>
                    <RouterLink
                      title="Editar Exercício"
                      class="btn btn-square btn-secondary"
                      :to="{ name: 'editExercicio', params: { id: ex.id } }"
                    >
                      <v-icon name="fa-edit" />
                    </RouterLink>
                    <button
                      title="Deletar Exercício"
                      class="btn btn-square btn-error"
                      @click="handleDeleteExercicio(ex.id)"
                    >
                      <v-icon name="fa-trash" />
                    </button>
                  </div>
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
