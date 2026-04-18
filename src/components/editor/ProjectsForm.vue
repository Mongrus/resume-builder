<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import DraggableList from '@/components/shared/DraggableList.vue'
import TagInput from '@/components/shared/TagInput.vue'

const { t } = useI18n()
const store = useResumeStore()
const { projects } = storeToRefs(store)

function addProject() {
  store.addItem('projects', {
    name: '',
    description: '',
    tech: [],
    url: ''
  })
}

function handleReorder(event) {
  store.reorderItems('projects', event.from, event.to)
}
</script>

<template>
  <div>
    <DraggableList :items="projects" @reorder="handleReorder">
      <template #default="{ item }">
        <div class="space-y-2.5">
          <div class="grid grid-cols-2 gap-2.5">
            <input
              v-model="item.name"
              type="text"
              :placeholder="t('fields.projectName')"
              class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
            <input
              v-model="item.url"
              type="url"
              :placeholder="t('fields.projectUrl')"
              class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
            />
          </div>
          <textarea
            v-model="item.description"
            :placeholder="t('fields.projectDescription')"
            rows="2"
            class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 resize-none"
          />
          <div>
            <label class="text-xs font-medium text-slate-400 mb-1.5 block">{{ t('fields.technologiesUsed') }}</label>
            <TagInput v-model="item.tech" />
          </div>
          <button
            @click="store.removeItem('projects', item.id)"
            class="w-full text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-1.5 rounded-md transition-colors"
          >
            {{ t('buttons.remove') }}
          </button>
        </div>
      </template>
    </DraggableList>
    <button
      @click="addProject"
      class="mt-3 w-full border border-dashed border-slate-600 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-400 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      {{ t('buttons.addProject') }}
    </button>
  </div>
</template>
