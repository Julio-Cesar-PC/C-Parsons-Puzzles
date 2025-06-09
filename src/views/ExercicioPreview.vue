<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getExercicioById } from '@/api/exercicios'

const route = useRoute()
const exercicio = ref('')
const loading = ref(true)
let parson = null

const iniciarParsons = async () => {
  try {
    loading.value = true
    const id = route.params.id
    const response = await getExercicioById(id)

    loading.value = false

    if (response.exercicio) {
      exercicio.value = response.exercicio
    } else {
      document.getElementById('modal-error').showModal()
      return
    }

    if (parson) {
      document.getElementById('sortable').innerHTML = ''
      document.getElementById('sortableTrash').innerHTML = ''
    }

    if (exercicio.value) {
      // eslint-disable-next-line no-undef
      parson = new ParsonsWidget({
        sortableId: 'sortable',
        trashId: 'sortableTrash',
        max_wrong_lines: 1,
        feedback_cb: mostrarErros,
        lang: 'ptbr',
      })

      parson.init(exercicio.value.exercicio)
      parson.shuffleLines()
    }
  } catch (error) {
    console.error('Erro ao buscar exercício', error)
  }
}

const mostrarErros = (feedback) => {
  let errosHtml = feedback.errors.map((error) => `"log_error" ${error}`).join('<br>')
  document.getElementById('erros').innerHTML = `console > ${errosHtml}`
}

const resortear = () => {
  if (parson) {
    parson.shuffleLines()
    document.getElementById('erros').innerHTML = 'console >'
  }
}

const abrirDialogEnvio = () => {
  if (parson.getFeedback().length === 0) {
    document.getElementById('modal-enviar').showModal()
  } else {
    document.getElementById('modal-feedback').showModal()
  }
}

onMounted(() => {
  iniciarParsons()
})
</script>

<template>
  <main>
    <div class="flex items-start flex-wrap justify-center min-h-2xl px-20 my-2">
      <!-- Loading -->
      <div v-show="loading" class="fixed inset-0 flex flex-col justify-center items-center z-50">
        <div class="bg-base-100 px-8 py-6 rounded-lg shadow-lg text-center bg-opacity-50">
          <p class="text-lg font-mono">Carregando exercício de visualização...</p>
          <div class="loader mt-10"></div>
        </div>
      </div>

      <div
        :class="{ 'blur-sm': loading }"
        class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300 flex justify-center gap-8 overflow-auto"
      >
        <!-- Enunciado -->
        <div class="w-1/4">
          <div class="w-full flex justify-evenly items-center my-4">
            <div class="join">
              <button class="btn btn-secondary join-item" @click="resortear">Resortear</button>
              <button class="btn btn-primary join-item" @click="abrirDialogEnvio">Enviar</button>
            </div>
          </div>
          <div class="divider"></div>
          <h1 class="text-2xl font-bold mb-4 text-center">Enunciado:</h1>
          <div class="bg-code text-primary-content p-4 rounded">
            {{ exercicio.enunciado }}
          </div>
        </div>

        <!-- Código -->
        <div class="w-3/4">
          <div
            class="flex flex-wrap justify-evenly rounded mt-4 h-[70vh] max-h text-secondary-content"
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
          <!-- <div class="divider"></div>
          <div id="erros" class="mt-4 p-4 bg-info-content rounded">console ></div> -->
        </div>
      </div>
    </div>

    <!-- Modal de Feedback -->
    <dialog id="modal-feedback" class="modal">
      <div class="modal-box max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Feedback do Exercício</h3>
        <p class="mt-4">Verifique os erros e acertos do seu exercício.</p>
        <div class="divider"></div>
        <div id="erros" class="mt-4 p-4 bg-info-content rounded">console ></div>
        <p class="text-sm mt-2 text-right italic text-code">
          O feedback te ajuda a enteder os erros da sua solução.
        </p>
      </div>
    </dialog>

    <!-- Modal de Erro -->
    <dialog id="modal-error" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Erro ao carregar exercício!</h3>
        <p class="mt-4">Verifique se o ID está correto ou tente novamente mais tarde.</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Modal de Envio -->
    <dialog id="modal-enviar" class="modal">
      <div class="modal-box w-full max-w-7xl">
        <h3 class="text-lg font-bold">Exercício visualizado</h3>
        <p class="mt-4">Seu exercício foi visualizado corretamente.</p>

        <div class="flex gap-4">
          <div role="tablist" class="tabs tabs-bordered pb-5 px-0 w-full">
            <input
              type="radio"
              name="tabs-1"
              role="tab"
              class="tab"
              aria-label="Python Tutor"
              checked
              v-if="exercicio.pythonTutor"
            />
            <div
              role="tabpanel"
              class="tab-content p-5 border rounded h-[55vh] w-full"
              v-if="exercicio.pythonTutor"
            >
              <iframe
                :src="exercicio.pythonTutor"
                class="w-full h-full rounded-lg"
                title="Python Tutor"
              ></iframe>
            </div>
            <input
              type="radio"
              name="tabs-1"
              role="tab"
              class="tab"
              aria-label="OneCompiler"
              v-if="exercicio.linkOneCompiler"
            />
            <div
              role="tabpanel"
              class="tab-content p-5 border rounded h-[55vh] w-full"
              v-if="exercicio.linkOneCompiler"
            >
              <iframe
                :src="`https://onecompiler.com/embed/c/${exercicio.linkOneCompiler}?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true`"
                class="w-full h-full rounded-lg"
                title="OneCompiler"
              ></iframe>
            </div>
          </div>
        </div>

        <div class="modal-action mt-6">
          <form method="dialog">
            <button class="btn btn-primary">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style>
/* Loader estilizado */
.loader {
  width: 45px;
  height: 30px;
  background:
    linear-gradient(#059669 0 0) 0 100%/100% 50%,
    linear-gradient(#059669 0 0) 0 0 / calc(100% / 3) 100%;
  background-repeat: no-repeat;
  position: relative;
  clip-path: inset(-100% 0 0 0);
  animation: l2-0 2s infinite steps(4);
}
.loader::before,
.loader::after {
  content: '';
  position: absolute;
  inset: -50% 0 50%;
  background:
    linear-gradient(#00cdb7 0 0) 0 0 / calc(2 * 100% / 3) 50%,
    linear-gradient(#00cdb7 0 0) 100% 100% / calc(2 * 100% / 3) 50%;
  background-repeat: no-repeat;
  animation: inherit;
  animation-name: l2-1;
}
.loader::after {
  inset: -100% 0 100%;
  background:
    linear-gradient(#10b981 0 0) 0 0/100% 50%,
    linear-gradient(#10b981 0 0) 100% 0 / calc(100% / 3) 100%;
  background-repeat: no-repeat;
  animation-name: l2-2;
}
@keyframes l2-0 {
  0% {
    transform: translateY(-250%);
    clip-path: inset(100% 0 0 0);
  }
  25%,
  100% {
    transform: translateY(0);
    clip-path: inset(-100% 0 0 0);
  }
}
@keyframes l2-1 {
  0%,
  25% {
    transform: translateY(-250%);
  }
  50%,
  100% {
    transform: translateY(0);
  }
}
@keyframes l2-2 {
  0%,
  50% {
    transform: translateY(-250%);
  }
  75%,
  100% {
    transform: translateY(0);
  }
}
</style>
