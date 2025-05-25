<script setup></script>

<template>
  <main>
    <div class="flex items-center flex-wrap justify-center min-h-2xl px-20 my-2">
      <div
        class="px-10 py-5 rounded-lg shadow-lg w-full mx-auto h-[88vh] bg-base-300 flex justify-center gap-8"
      >
        <div
          class="max-w-3xl mx-auto my-auto bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700 animate-fade-in"
        >
          <h1 class="text-2xl md:text-3xl font-semibold text-center mb-6 text-blue-400">
            Plataforma de Aprendizado de Lógica de Programação
          </h1>
          <p class="text-lg text-gray-300 leading-relaxed text-justify">
            Este site é uma plataforma para apoiar o aprendizado de lógica de programação, com
            exercícios em que você deve desembaralhar o código para resolver cada problema proposto.
            A plataforma está em desenvolvimento por estudantes e professoras na
            <span class="text-blue-400 font-medium">Universidade Federal de Santa Maria</span>,
            sendo tema de um
            <span class="text-blue-400 font-medium">Trabalho de Conclusão de Curso</span> em
            Sistemas de Informação no primeiro semestre de 2025.
          </p>

          <!-- Espaço para logos -->
          <div class="flex justify-center items-center gap-6 mt-6">
            <div class="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="text-gray-400 text-sm">Logo 1</span>
            </div>
            <div class="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="text-gray-400 text-sm">Logo 2</span>
            </div>
            <div class="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="text-gray-400 text-sm">Logo 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
