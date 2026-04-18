<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import DraggableList from '@/components/shared/DraggableList.vue'

const { t } = useI18n()
const store = useResumeStore()
const { languages } = storeToRefs(store)

const proficiencyLevels = [
  { key: 'basic', en: 'Basic' },
  { key: 'intermediate', en: 'Intermediate' },
  { key: 'advanced', en: 'Advanced' },
  { key: 'fluent', en: 'Fluent' },
  { key: 'native', en: 'Native' }
]

function addLanguage() {
  store.addItem('languages', {
    name: '',
    level: 'Intermediate'
  })
}

function handleReorder(event) {
  store.reorderItems('languages', event.from, event.to)
}

function getLevelDisplay(level) {
  const levelObj = proficiencyLevels.find(l => l.en === level)
  return levelObj ? t(`proficiencyLevels.${levelObj.key}`) : level
}
</script>

<template>
  <div>
    <DraggableList :items="languages" @reorder="handleReorder">
      <template #default="{ item }">
        <div class="flex gap-2.5 items-center">
          <input
            v-model="item.name"
            type="text"
            :placeholder="t('fields.languageName')"
            class="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
          />
          <select
            v-model="item.level"
            class="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
          >
            <option v-for="level in proficiencyLevels" :key="level.key" :value="level.en" class="bg-slate-800 text-slate-200">
              {{ t(`proficiencyLevels.${level.key}`) }}
            </option>
          </select>
          <button
            @click="store.removeItem('languages', item.id)"
            class="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </template>
    </DraggableList>
    <button
      @click="addLanguage"
      class="mt-3 w-full border border-dashed border-slate-600 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      {{ t('buttons.addLanguage') }}
    </button>
  </div>
</template>
