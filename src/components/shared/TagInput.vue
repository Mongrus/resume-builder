<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref('')

function addTag(tag = inputValue.value.trim()) {
  if (tag && !props.modelValue.includes(tag)) {
    emit('update:modelValue', [...props.modelValue, tag])
  }
  inputValue.value = ''
}

function removeTag(index) {
  const updated = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', updated)
}

function handleKeydown(event) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag()
  }
}
</script>

<template>
  <div>
    <div v-if="modelValue.length" class="flex flex-wrap gap-1.5 mb-2.5">
      <span
        v-for="(tag, index) in modelValue"
        :key="index"
        class="inline-flex items-center gap-1 bg-indigo-500/15 text-indigo-300 px-2.5 py-1 rounded-md text-xs font-medium"
      >
        {{ tag }}
        <button
          @click="removeTag(index)"
          class="ml-0.5 text-indigo-400 hover:text-indigo-200 font-bold leading-none"
        >
          &times;
        </button>
      </span>
    </div>
    <input
      v-model="inputValue"
      @keydown="handleKeydown"
      type="text"
      placeholder="Add tag (press Enter)"
      class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
    />
  </div>
</template>
