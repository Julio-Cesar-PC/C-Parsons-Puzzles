<script setup>
import { ref, onMounted } from 'vue';
import { getExercicioAleatorio } from '../api/exercicios';

const exercicio = ref(null);
const loading = ref(true);
let parson = null;

const iniciarParsons = async () => {
  try {
    loading.value = true;
    const response = await getExercicioAleatorio();
    console.log(response);
    exercicio.value = response.exercicio;
    console.log(exercicio.value);

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
  } catch (error) {
    console.error("Erro ao buscar exercício", error);
  } finally {
    loading.value = false;
  }
};

const enviarCodigo = () => {
  if (parson) {
    let feedback = parson.getFeedback();
    if (feedback.length === 0) {
      mostrarFeedback("Parabéns! Você acertou o exercício!");
    } else {
      mostrarErros(feedback);
    }
  }
};

const mostrarErros = (feedback) => {
  let errosHtml = feedback.errors.map(error => `<p>${error}</p>`).join('');
  document.getElementById("erros").innerHTML = `<h2>Erros:</h2> ${errosHtml}`;
};

const mostrarFeedback = (mensagem) => {
  document.getElementById("feedback").innerHTML = mensagem;
  document.getElementById("feedback").removeAttribute("hidden");
};

onMounted(() => {
  iniciarParsons();
});

</script>

<template>
  <main>
    <div class="flex items-start flex-wrap justify-center min-h-2xl px-20 my-2">
      <div class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[90vh] bg-base-300 flex flex-wrap">

        <!-- Coluna do Enunciado -->
        <div class="w-1/3">
          <div v-if="loading" class="text-center text-sm mb-4 align-middle">
            <p>Carregando exercício...</p>
          </div>
          <div v-if="exercicio">
            <h1 class="text-2xl font-bold mb-6 text-center">Enunciado:</h1>
            <div class="bg-base-100 p-4 rounded">
              {{ exercicio.enunciado }}
            </div>
            <div id="erros" class="mt-4 p-4 bg-info-content rounded"></div>
            <div id="feedback" class="mt-4 p-4 bg-success rounded text-primary-content" hidden></div>
          </div>
        </div>

        <!-- Coluna do Código -->
        <div class="w-2/3">
          <div class="flex flex-wrap justify-center rounded mb-4 h-[70vh] max-h text-secondary-content">
            <div id="sortableTrash" class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded">
            </div>
            <div id="sortable" class="py-4 px-2 sortable-code bg-code overflow-auto h-full max-h rounded"></div>
          </div>

          <button @click="enviarCodigo" class="btn btn-primary w-full">
            Enviar Código
          </button>
        </div>

      </div>
    </div>
  </main>
</template>
