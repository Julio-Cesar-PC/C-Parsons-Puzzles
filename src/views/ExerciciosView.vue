<script setup>
import { ref, onMounted } from 'vue'
import { getExercicioAleatorio } from '../api/exercicios'
import { postHistorico } from '@/api/usuarios'
import { useAuth } from '@/composables/useAuth'

const exercicio = ref('')
const loading = ref(true)
let parson = null
const { userData, auth } = useAuth()
const triesCount = ref(1)

const iniciarParsons = async () => {
  try {
    resetTriesCount()
    // console.log('auth: ', auth.value)
    loading.value = true
    getExercicioAleatorio(userData.value).then((response) => {
      loading.value = false
      // console.log('getExercicioAleatorio: ', response);
      if (response.exercicio) {
        exercicio.value = response.exercicio
      } else {
        document.getElementById('modal-error').showModal()
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
    })
  } catch (error) {
    console.error('Erro ao buscar exercício', error)
  }
}

const resortearParsons = async () => {
  iniciarParsons()
}

const enviarCodigo = () => {
  if (parson) {
    let feedback = parson.getFeedback()
    if (feedback.length === 0) {
      document.getElementById('modal-success').showModal()
    } else {
      document.getElementById('modal-feedback').showModal()
    }
  }
}

const proximoExercicio = async () => {
  loading.value = true
  // console.log('triesCount: ', triesCount.value);
  if (auth.value) {
    const payloadPostHistorico = {
      actionRequest: 'postHistorico',
      payload: {
        userId: userData.value.id,
        startDate: new Date(),
        submitDate: new Date(),
        state: 'completo',
        exerciseId: exercicio.value.id,
        triesCount: triesCount.value,
        exerciseDifficulty: exercicio.value.dificuldade,
      },
      auth: auth.value,
    }
    await postHistorico(payloadPostHistorico)
  }
  resetState()
  iniciarParsons()
}

const resetState = () => {
  limparErros()
  document.getElementById('modal-success').close()
}

const addTriesCount = () => {
  triesCount.value += 1
  // console.log('triesCount: ', triesCount.value);
}

const resetTriesCount = () => {
  triesCount.value = 1
}

const mostrarErros = (feedback) => {
  resetState()

  let errosHtml = feedback.errors.map((error) => `"log_error" ${error}`).join('<br>')

  if (feedback.errors.length > 0) {
    addTriesCount()
  }

  const divErrosTela = document.getElementById('erros')
  const divErrosModal = document.getElementById('erros-modal')

  if (divErrosTela) divErrosTela.innerHTML = `console > ${errosHtml}`
  if (divErrosModal) divErrosModal.innerHTML = `console > ${errosHtml}`
}

const limparErros = () => {
  const divErrosTela = document.getElementById('erros')
  const divErrosModal = document.getElementById('erros-modal')

  if (divErrosTela) divErrosTela.innerHTML = 'console >'
  if (divErrosModal) divErrosModal.innerHTML = 'console >'
}

onMounted(() => {
  iniciarParsons()
})
</script>

<template>
  <main>
    <div class="flex items-start flex-wrap justify-center min-h-2xl px-20 my-2">
      <!-- Tela de Loading com tema de jogo -->
      <div v-show="loading" class="fixed inset-0 flex flex-col justify-center items-center z-50">
        <div
          class="bg-base-100 px-8 py-6 rounded-lg shadow-lg text-center bg-opacity-50 flex flex-col items-center"
        >
          <p class="text-lg font-mono">Carregando novo desafio...</p>
          <div class="loader mt-10"></div>
        </div>
      </div>

      <!-- eslint-disable-next-line no-undef -->
      <div
        :class="{ 'blur-sm': loading }"
        class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300 flex justify-center gap-8 overflow-auto"
      >
        <!-- Coluna do Enunciado -->
        <div class="w-1/4">
          <div>
            <div class="w-full flex justify-evenly items-center my-4">
              <div class="join">
                <button @click="resortearParsons" class="btn btn-secondary join-item">
                  Resortear
                </button>
                <button @click="enviarCodigo" class="btn btn-primary join-item">Enviar</button>
              </div>
            </div>
            <div class="divider"></div>
            <h1 class="text-2xl font-bold mb-4 text-center">Enunciado:</h1>
            <div class="bg-code text-primary-content p-4 rounded">
              {{ exercicio.enunciado }}
            </div>
          </div>
        </div>

        <!-- Coluna do Código -->
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
          <div class="divider"></div>
          <div id="erros" class="mt-4 p-4 bg-info-content rounded">console ></div>
        </div>
      </div>
    </div>

    <!-- Modal de Erro ao procurar exercicio -->
    <dialog id="modal-error" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Por enqunto não temos mais exercícios para você!</h3>
        <p class="mt-4 p-4">
          <br />
          Você pode tentar novamente mais tarde, ou entrar em contato com o suporte.
        </p>
        <div class="collapse bg-base-200">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">Mostrar motivos</div>
          <div class="collapse-content">
            <!-- lista de motivos -->
            <ul class="list-disc list-inside">
              <li>Não existe exercícios para seu nível</li>
              <li>Erro de conexão</li>
              <li>Erro no servidor</li>
              <li>Erro no banco de dados</li>
            </ul>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn mr-2">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Modal de Sucesso -->
    <dialog id="modal-success" class="modal">
      <div class="modal-box w-full max-w-7xl">
        <!-- Título -->
        <h3 class="text-lg font-bold">Parabéns! Você acertou o exercício!</h3>

        <!-- Tabs + conteúdo -->
        <div class="flex gap-4">
          <div role="tablist" class="tabs tabs-lifted pb-5 px-0 w-full">
            <!-- Aba Python Tutor -->
            <input
              type="radio"
              name="tabs-2"
              role="tab"
              class="tab"
              aria-label="Python Tutor"
              checked
              v-if="exercicio.pythonTutor"
            />
            <div
              role="tabpanel"
              class="tab-content p-5 bg-base-100 border rounded h-[55vh] w-full"
              v-if="exercicio.pythonTutor"
            >
              <iframe
                :src="exercicio.pythonTutor"
                class="w-full h-full rounded-lg"
                title="Python Tutor"
              ></iframe>
            </div>

            <!-- Aba OneCompiler -->
            <input
              type="radio"
              name="tabs-2"
              role="tab"
              class="tab"
              aria-label="OneCompiler"
              v-if="exercicio.linkOneCompiler"
            />
            <div
              role="tabpanel"
              class="tab-content p-5 bg-base-100 border rounded h-[55vh] w-full"
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

        <!-- Botão -->
        <div class="modal-action mt-6">
          <form method="dialog">
            <button class="btn mr-2">Fechar</button>
            <button class="btn btn-primary" @click="proximoExercicio">Próximo Exercício</button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Modal de Feedback -->
    <dialog id="modal-feedback" class="modal">
      <div class="modal-box max-w-5xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold">Feedback do Exercício</h3>
        <p class="mt-4">Verifique os erros e acertos do seu exercício.</p>
        <div class="divider"></div>
        <div id="erros-modal" class="mt-4 p-4 bg-info-content rounded">console ></div>
        <p class="text-sm mt-2 text-right italic text-code">
          O feedback te ajuda a enteder os erros da sua solução.
        </p>
      </div>
    </dialog>
  </main>
</template>

<style>
/* HTML: <div class="loader"></div> */
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
