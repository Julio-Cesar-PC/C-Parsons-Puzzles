<script setup>
import { ref, onMounted } from 'vue';
import { getExercicioAleatorio } from '../api/exercicios';
import { postHistorico } from '@/api/usuarios';
import { useAuth } from '@/composables/useAuth';

const exercicio = ref("");
const loading = ref(true);
let parson = null;
const { userData, auth } = useAuth();


const iniciarParsons = async () => {
  try {
    console.log('auth: ', auth.value)
    loading.value = true;
    getExercicioAleatorio(userData.value).then((response) => {
      loading.value = false;
      console.log('getExercicioAleatorio: ', response);
      exercicio.value = response.exercicio;

      if (parson) {
        document.getElementById("sortable").innerHTML = "";
        document.getElementById("sortableTrash").innerHTML = "";
      }

      // eslint-disable-next-line no-undef
      parson = new ParsonsWidget({
        sortableId: "sortable",
        trashId: "sortableTrash",
        max_wrong_lines: 1,
        feedback_cb: mostrarErros,
        lang: "ptbr"
      });

      parson.init(exercicio.value.exercicio);
      parson.shuffleLines();
    })
  } catch (error) {
    console.error("Erro ao buscar exercício", error);
  }
};

const resortearParsons = async () => {
  iniciarParsons()
};

const enviarCodigo = () => {
  if (parson) {
    let feedback = parson.getFeedback();
    if (feedback.length === 0) {
      mostrarFeedback("Parabéns! Você acertou o exercício!");
      document.getElementById('btn-proximo-exercicio').removeAttribute('disabled')
    }
  }
};

const proximoExercicio = async () => {
  loading.value = true
  if (auth.value) {
    const payloadPostHistorico = {
      "actionRequest": "postHistorico",
      "payload": {
        "userId": userData.value.id,
        "startDate": new Date(),
        "submitDate": new Date(),
        "state": "completo",
        "exerciseId": exercicio.value.id,
        "triesCount": '1',
        "exerciseDifficulty": exercicio.value.dificuldade
      },
      "auth": auth.value
    }
    await postHistorico(payloadPostHistorico)
  }
  resetState();
  iniciarParsons();
};

const resetState = () => {
  limparFeedback();
  limparErros();
  resetBtnProximoExercicio();
};

const resetBtnProximoExercicio = () => {
  document.getElementById('btn-proximo-exercicio').setAttribute('disabled', true)
}

const mostrarErros = (feedback) => {
  resetState();
  let errosHtml = feedback.errors.map(error => `${error}`).join('');
  document.getElementById("erros").innerHTML = `console > ${errosHtml}`;
};

const limparErros = () => {
  document.getElementById("erros").innerHTML = "";
};

const mostrarFeedback = (mensagem) => {
  document.getElementById("feedback").innerHTML = mensagem;
  document.getElementById("feedback").removeAttribute("hidden");
};

const limparFeedback = () => {
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("feedback").setAttribute("hidden", true);
};

onMounted(() => {
  iniciarParsons();
});

</script>

<template>
  <main>
    <div class="flex items-start flex-wrap justify-center min-h-2xl px-20 my-2">
      <div v-show="loading" class="fixed inset-0 flex justify-center items-center z-50">
        <span class="loading loading-dots loading-lg"></span>
      </div>
      <!-- eslint-disable-next-line no-undef -->
      <div :class="{ 'blur-sm': loading }"
        class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[90vh] bg-base-300 flex justify-center gap-8">
        <!-- Coluna do Enunciado -->
        <div class="w-1/4">
          <div>
            <h1 class="text-2xl font-bold mb-6 text-center">Enunciado:</h1>
            <div class="bg-code text-primary-content p-4 rounded">
              {{ exercicio.enunciado }}
            </div>
            <div id="feedback" class="mt-4 p-4 bg-success rounded text-primary-content" hidden></div>
            <div class="divider"></div>
            <div class="w-full flex justify-evenly items-center mt-4">
              <div class="join">
                <button @click="enviarCodigo" class="btn btn-primary join-item">Enviar</button>
                <button @click="resortearParsons" class="btn btn-secondary join-item">Resortear</button>
                <button @click="proximoExercicio" id="btn-proximo-exercicio" class="btn btn-accent join-item"
                  disabled>Próximo</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Coluna do Código -->
        <div class="w-3/4">
          <div class="flex flex-wrap justify-evenly rounded mt-4 h-[70vh] max-h text-secondary-content">
            <div id="sortableTrash" class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded">
            </div>
            <div id="sortable" class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded">
            </div>
          </div>
          <div class="divider"></div>
          <div id="erros" class="mt-4 p-4 bg-info-content rounded">
            console >
          </div>
        </div>

      </div>
    </div>
  </main>
</template>
