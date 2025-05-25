<script setup>
import { ref } from 'vue'
import TagsInput from '@/components/TagsInput.vue'
import CodeEditorC from '@/components/CodeEditorC.vue'
import { createExercicio } from '../api/exercicios'

const form = ref({
  dificuldade: '',
  area: '',
  enunciado: '',
  exercicio: '',
  max_wrong_lines: 1,
  pythonTutor: '',
  linkOneCompiler: '',
  tags: [],
})

// eslint-disable-next-line no-undef
let parson = new ParsonsWidget({
  sortableId: 'sortable',
  trashId: 'sortableTrash',
  max_wrong_lines: 1,
  lang: 'ptbr',
})

parson.init(form.value.exercicio)
parson.shuffleLines()

const salvarExercicio = () => {
  const payload = {
    actionRequest: 'postExercicio',
    payload: {
      ...form.value,
      tags: form.value.tags.join(','),
      imgEnunciado: '',
    },
  }

  console.log('Payload:', payload)

  createExercicio(payload)
    .then((response) => {
      if (response.success) {
        alert('Exercício salvo com sucesso!')
      } else {
        alert('Erro ao salvar exercício: ' + response.message)
      }
    })
    .catch((error) => {
      console.error('Erro ao salvar exercício:', error)
      alert('Ocorreu um erro ao salvar o exercício.')
    })

  console.log('Exercício salvo:', payload)
  // Aqui você pode enviar os dados via API
}

const resetarParson = () => {
  parson.init(form.value.exercicio)
  parson.shuffleLines()
}

const testarCodico = () => {
  let feedback = parson.getFeedback()
  if (feedback.length === 0) {
    alert('Parabéns! Você acertou o exercício!')
  } else {
    alert('Você ainda tem erros a corrigir.')
  }
}

const handleNextTab = () => {
  const tabs = document.querySelectorAll('input[name="tabs-1"]')
  let currentTabIndex = Array.from(tabs).findIndex((tab) => tab.checked)
  if (currentTabIndex < tabs.length - 1) {
    tabs[currentTabIndex + 1].checked = true
  }
}

const handleBackTab = () => {
  const tabs = document.querySelectorAll('input[name="tabs-1"]')
  let currentTabIndex = Array.from(tabs).findIndex((tab) => tab.checked)
  if (currentTabIndex > 0) {
    tabs[currentTabIndex - 1].checked = true
  }
}
</script>

<template>
  <main>
    <div class="flex items-center flex-wrap justify-center min-h-2xl px-20 my-2">
      <div class="px-1 py-1 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300">
        <div class="container m-auto px-1 py-12">
          <div class="flex justify-between items-center mb-4">
            <!-- Botão Voltar à esquerda com ícone -->
            <RouterLink
              class="btn btn-primary flex items-center gap-2"
              :to="{ name: 'exerciciosList' }"
            >
              <v-icon name="co-arrow-left" />
              Voltar
            </RouterLink>

            <!-- Título centralizado ocupando toda a largura restante -->
            <h1 class="text-3xl font-bold text-center flex-1">Criar Exercício Parsons Puzzle</h1>

            <!-- Espaço invisível à direita para equilibrar visualmente -->
            <div class="w-[100px]"></div>
          </div>
          <form @submit.prevent="salvarExercicio" class="">
            <div role="tablist" class="tabs tabs-lifted pb-5 px-0">
              <input
                type="radio"
                name="tabs-1"
                role="tab"
                class="tab"
                aria-label="Editar"
                checked
              />
              <div role="tabpanel" class="tab-content p-5 bg-base-100 border rounded h-[70vh]">
                <div class="space-y-6 max-w-5xl mx-auto flex flex-col justify-between h-full">
                  <div>
                    <!-- Linha 1: Dificuldade e Área -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="label">Dificuldade:</label>
                        <select
                          v-model="form.dificuldade"
                          class="select w-full select-bordered"
                          required
                        >
                          <option disabled value="">Selecione a dificuldade</option>
                          <option value="0">Muito fácil</option>
                          <option value="1">Fácil</option>
                          <option value="2">Médio</option>
                          <option value="3">Difícil</option>
                          <option value="4">Muito difícil</option>
                        </select>
                      </div>
                      <div>
                        <label class="label">Área do exercício:</label>
                        <select v-model="form.area" class="select w-full select-bordered" required>
                          <option disabled value="">Selecione a área</option>
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
                    </div>

                    <!-- Linha 2: Enunciado -->
                    <div>
                      <label class="label">Enunciado:</label>
                      <textarea
                        v-model="form.enunciado"
                        class="textarea textarea-bordered w-full h-32"
                        placeholder="Descreva o desafio..."
                      ></textarea>
                    </div>
                  </div>

                  <!-- Botão proximo -->
                  <div class="flex justify-end mt-auto">
                    <button type="button" class="btn btn-primary" @click="handleNextTab">
                      Próximo
                    </button>
                  </div>
                </div>
              </div>

              <input type="radio" name="tabs-1" role="tab" class="tab" aria-label="Código" />
              <div role="tabpanel" class="tab-content p-5 bg-base-100 border rounded h-[70vh]">
                <div class="space-y-6 max-w-5xl mx-auto flex flex-col justify-between h-full">
                  <div>
                    <label class="label">Código (ordem correta):</label>
                    <CodeEditorC v-model="form.exercicio" />
                    <p class="text-sm text-gray-400 mt-1">
                      Use <code>#distractor</code> no final de linhas erradas.
                    </p>
                  </div>

                  <div class="flex justify-end mt-auto">
                    <button type="button" class="btn btn-secondary mr-2" @click="handleBackTab">
                      Voltar
                    </button>
                    <button type="button" class="btn btn-primary" @click="handleNextTab">
                      Próximo
                    </button>
                  </div>
                </div>
              </div>

              <input type="radio" name="tabs-1" role="tab" class="tab" aria-label="Opcionais" />
              <div role="tabpanel" class="tab-content p-5 bg-base-100 border rounded h-[70vh]">
                <div class="space-y-6 max-w-5xl mx-auto flex flex-col justify-between h-full">
                  <div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="label">Link Python Tutor:</label>
                        <input
                          type="text"
                          v-model="form.pythonTutor"
                          class="input input-bordered w-full"
                          placeholder="https://pythontutor.com/..."
                        />
                      </div>
                      <div>
                        <label class="label">Link One Compiler:</label>
                        <input
                          type="text"
                          v-model="form.linkOneCompiler"
                          class="input input-bordered w-full"
                          placeholder="https://onecompiler.com/..."
                        />
                      </div>
                    </div>
                    <div>
                      <label class="label">Tags:</label>
                      <TagsInput class="" v-model="form.tags" />
                    </div>
                  </div>

                  <div class="flex justify-end mt-auto">
                    <button type="button" class="btn btn-secondary mr-2" @click="handleBackTab">
                      Voltar
                    </button>
                    <button type="button" class="btn btn-primary" @click="handleNextTab">
                      Próximo
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="radio"
                name="tabs-1"
                role="tab"
                class="tab"
                aria-label="Preview"
                :onchange="resetarParson()"
              />
              <div role="tabpanel" class="tab-content p-5 bg-base-100 border rounded-lg h-[70vh]">
                <div class="flex justify-center gap-8 px-4">
                  <div class="w-1/4">
                    <div class="w-full flex justify-evenly items-center my-4">
                      <div class="join">
                        <button disabled class="btn btn-secondary join-item">Resortear</button>
                        <button @click="testarCodico" class="btn btn-primary join-item">
                          Testar
                        </button>
                      </div>
                    </div>
                    <div class="divider"></div>
                    <h1 class="text-2xl font-bold mb-4 text-center">Enunciado:</h1>
                    <div class="bg-code text-primary-content p-4 rounded">
                      {{ form.enunciado }}
                    </div>
                  </div>

                  <div class="w-3/4">
                    <div
                      class="flex flex-wrap justify-evenly rounded mt-4 h-[55vh] max-h text-secondary-content"
                    >
                      <div
                        id="sortableTrash"
                        class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded"
                      ></div>
                      <div
                        id="sortable"
                        class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded"
                      ></div>
                    </div>
                    <div class="flex justify-end mt-4">
                      <button type="button" class="btn btn-secondary mr-2" @click="handleBackTab">
                        Voltar
                      </button>
                      <button type="submit" class="btn btn-primary">Salvar Exercício</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
