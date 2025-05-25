<template>
  <div ref="editorContainer" class="rounded-xl border border-base-200 bg-[#1e1e2e]" />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap } from '@codemirror/commands'
import { lineNumbers } from '@codemirror/view'
import { highlightSpecialChars, drawSelection } from '@codemirror/view'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const editorContainer = ref(null)
let view = null
const initialCode = `void main() {
  int a = 0;
  int b = 1;
  int c = a + b;
  printf("%d\\n", c);
}`

onMounted(() => {
  view = new EditorView({
    state: EditorState.create({
      doc: props.modelValue || initialCode,
      extensions: [
        lineNumbers(),
        highlightSpecialChars(),
        drawSelection(),
        highlightActiveLine(),
        keymap.of(defaultKeymap),
        cpp(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            emit('update:modelValue', view.state.doc.toString())
          }
        }),
        EditorView.theme({
          '&': {
            height: 'auto',
            minHeight: '300px',
            fontSize: '14px',
            fontFamily: 'Fira Code, monospace',
            padding: '12px',
            backgroundColor: '#1e1e2e',
            borderRadius: '12px',
          },
          '.cm-content': {
            paddingBottom: '20px',
          },
        }),
      ],
    }),
    parent: editorContainer.value,
  })
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (view && newVal !== view.state.doc.toString()) {
      view.dispatch({
        changes: {
          from: 0,
          to: view.state.doc.length,
          insert: newVal,
        },
      })
    }
  },
)
</script>

<style scoped>
/* Melhora a renderização da fonte */
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
</style>
