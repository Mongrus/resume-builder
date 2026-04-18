<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import DraggableList from '@/components/shared/DraggableList.vue'

const { t } = useI18n()
const store = useResumeStore()
const { education } = storeToRefs(store)

function addEducation() {
  store.addItem('education', {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  })
}

function handleReorder(event) {
  store.reorderItems('education', event.from, event.to)
}
</script>

<template>
  <div>
    <DraggableList :items="education" @reorder="handleReorder">
      <template #default="{ item }">
        <div class="space-y-2.5">
          <input
            v-model="item.institution"
            type="text"
            :placeholder="t('fields.institution')"
            class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
          />
          <div class="grid grid-cols-2 gap-2.5">
            <input
              v-model="item.degree"
              type="text"
              :placeholder="t('fields.degree')"
              class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
            <input
              v-model="item.field"
              type="text"
              :placeholder="t('fields.field')"
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
              class="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
          </div>
          <button
            @click="store.removeItem('education', item.id)"
            class="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-1.5 rounded-md transition-colors"
          >
            {{ t('buttons.remove') }}
          </button>
        </div>
      </template>
    </DraggableList>
    <button
      @click="addEducation"
      class="mt-3 w-full border border-dashed border-slate-600 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      {{ t('buttons.addEducation') }}
    </button>
  </div>
</template>
