<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import DraggableList from '@/components/shared/DraggableList.vue'

const { t } = useI18n()
const store = useResumeStore()
const { experience } = storeToRefs(store)

function addExperience() {
  store.addItem('experience', {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  })
}

function handleReorder(event) {
  store.reorderItems('experience', event.from, event.to)
}
</script>

<template>
  <div>
    <DraggableList :items="experience" @reorder="handleReorder">
      <template #default="{ item }">
        <div class="space-y-2.5">
          <div class="grid grid-cols-2 gap-2.5">
            <input
              v-model="item.position"
              type="text"
              :placeholder="t('fields.position')"
              class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
            <input
              v-model="item.company"
              type="text"
              :placeholder="t('fields.company')"
              class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <input
              v-model="item.startDate"
              type="month"
              :placeholder="t('fields.startDate')"
              class="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
            <input
              v-model="item.endDate"
              type="month"
              :placeholder="t('fields.endDate')"
              :disabled="item.current"
              class="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 disabled:opacity-40"
            />
          </div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="item.current"
              type="checkbox"
              class="w-3.5 h-3.5 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/25 focus:ring-offset-0"
            />
            <span class="text-xs text-slate-400">{{ t('fields.current') }}</span>
          </label>
          <textarea
            v-model="item.description"
            :placeholder="t('fields.description')"
            rows="3"
            class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 resize-none"
          />
          <button
            @click="store.removeItem('experience', item.id)"
            class="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-1.5 rounded-md transition-colors"
          >
            {{ t('buttons.remove') }}
          </button>
        </div>
      </template>
    </DraggableList>
    <button
      @click="addExperience"
      class="mt-3 w-full border border-dashed border-slate-600 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      {{ t('buttons.addExperience') }}
    </button>
  </div>
</template>
