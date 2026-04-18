<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import EditorView from '@/views/EditorView.vue'
import PreviewView from '@/views/PreviewView.vue'
import { useResumeStore } from '@/stores/resumeStore'

const { locale, t } = useI18n()
const store = useResumeStore()
const isDev = import.meta.env.DEV

const previewViewRef = ref(null)

function getPreviewRef() {
  return previewViewRef.value?.previewRef?.previewRef
}

function changeLanguage(lang) {
  locale.value = lang
}
</script>

<template>
  <div class="flex h-screen bg-slate-900 font-sans">
    <!-- Left panel: Editor -->
    <div class="w-[480px] min-w-[480px] flex flex-col bg-slate-800 border-r border-slate-700/50">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-base font-semibold text-white tracking-tight">{{ t('app.title') }}</h1>
        </div>
        <div class="flex items-center gap-2">
          <button
            v-if="isDev"
            @click="store.fillTestData()"
            class="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-all duration-200"
          >
            Test Data
          </button>
        </div>
        <div class="flex gap-1 bg-slate-700/50 rounded-lg p-0.5">
          <button
            @click="changeLanguage('en')"
            :class="[
              'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
              locale === 'en'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            EN
          </button>
          <button
            @click="changeLanguage('ru')"
            :class="[
              'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
              locale === 'ru'
                ? 'bg-indigo-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            ]"
          >
            RU
          </button>
        </div>
      </div>

      <!-- Scrollable editor content -->
      <div class="flex-1 overflow-y-auto editor-panel px-5 py-4">
        <EditorView :preview-ref="getPreviewRef()" />
      </div>
    </div>

    <!-- Right panel: Preview (A4 document view) -->
    <div class="flex-1 overflow-y-auto bg-slate-700/30 flex justify-center py-8 px-6">
      <div class="flex-shrink-0">
        <PreviewView ref="previewViewRef" />
      </div>
    </div>
  </div>
</template>
