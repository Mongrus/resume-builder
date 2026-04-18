<script setup>
import { ref } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['reorder'])

const dragFrom = ref(null)
const dragOverIndex = ref(null)

function onDragStart(index) {
  dragFrom.value = index
}

function onDragOver(event) {
  event.preventDefault()
}

function onDragEnter(index) {
  dragOverIndex.value = index
}

function onDragLeave() {
  dragOverIndex.value = null
}

function onDrop(toIndex) {
  if (dragFrom.value !== null && dragFrom.value !== toIndex) {
    emit('reorder', { from: dragFrom.value, to: toIndex })
  }
  dragFrom.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div class="space-y-2">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      draggable="true"
      @dragstart="onDragStart(index)"
      @dragover="onDragOver"
      @dragenter="onDragEnter(index)"
      @dragleave="onDragLeave"
      @drop="onDrop(index)"
      :class="[
        'p-3 rounded-lg cursor-move transition-all duration-150',
        dragOverIndex === index
          ? 'border border-indigo-500/50 bg-indigo-500/5'
          : 'border border-slate-600/30 bg-slate-800/20 hover:bg-slate-800/40'
      ]"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>
