<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import EditorView from '@/views/EditorView.vue'
import PreviewView from '@/views/PreviewView.vue'
import { useResumeStore } from '@/stores/resumeStore'

const { locale, t } = useI18n()
const store = useResumeStore()

const previewViewRef = ref(null)
const showPicker = ref(false)

const btnRef = ref(null)
const pickerStyle = ref({})

function getPreviewRef() {
  return previewViewRef.value?.previewRef?.previewRef
}

function changeLanguage(lang) {
  locale.value = lang
}

function updatePosition() {
  if (!btnRef.value) return

  const rect = btnRef.value.getBoundingClientRect()

  const pickerHeight = 260 // approximate
  const spaceBelow = window.innerHeight - rect.bottom

  let top = rect.bottom + 8

  // если не помещается снизу — открываем вверх
  if (spaceBelow < pickerHeight) {
    top = rect.top - pickerHeight - 8
  }

  pickerStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${rect.left}px`
  }
}

function togglePicker() {
  showPicker.value = !showPicker.value

  if (showPicker.value) {
    nextTick(() => {
      updatePosition()
      document.addEventListener('click', outsideClick)
      window.addEventListener('resize', updatePosition)
      window.addEventListener('scroll', updatePosition, true)
    })
  } else {
    cleanup()
  }
}

function loadExample(lang) {
  store.fillTestData(lang)
  showPicker.value = false
  cleanup()
}

function outsideClick(e) {
  if (!e.target.closest('.picker-box') && !e.target.closest('.picker-btn')) {
    showPicker.value = false
    cleanup()
  }
}

function cleanup() {
  document.removeEventListener('click', outsideClick)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
}

onBeforeUnmount(() => cleanup())
</script>

<template>
  <div class="flex h-screen bg-slate-900 font-sans relative">

    <!-- Left panel -->
    <div class="w-[480px] min-w-[480px] flex flex-col bg-slate-800 border-r border-slate-700/50">

      <!-- Header -->
      <div class="relative flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">

        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-base font-semibold text-white tracking-tight">
            {{ t('app.title') }}
          </h1>
        </div>

        <div class="flex items-center gap-2">

          <!-- BUTTON (ANCHOR) -->
          <button
            ref="btnRef"
            class="picker-btn px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-all duration-200"
            @click="togglePicker"
          >
            {{ t('buttons.exampleData') }}
          </button>

          <!-- language -->
          <div class="flex gap-1 bg-slate-700/50 rounded-lg p-0.5">
            <button
              @click="changeLanguage('en')"
              :class="[
                'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
                locale === 'en' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              ]"
            >
              EN
            </button>

            <button
              @click="changeLanguage('ru')"
              :class="[
                'px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
                locale === 'ru' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              ]"
            >
              RU
            </button>
          </div>

        </div>
      </div>

      <!-- Editor -->
      <div class="flex-1 overflow-y-auto px-5 py-4">
        <EditorView :preview-ref="getPreviewRef()" />
      </div>

    </div>

    <!-- Right panel -->
    <div class="flex-1 overflow-y-auto bg-slate-700/30 flex justify-center py-8 px-6">
      <div class="flex-shrink-0">
        <PreviewView ref="previewViewRef" />
      </div>
    </div>

    <!-- TELEPORT DROPDOWN -->
    <Teleport to="body">
      <div
        v-show="showPicker"
        class="picker-box w-72 bg-slate-700 border border-slate-600 rounded-lg shadow-2xl p-4 z-[99999]"
        :style="pickerStyle"
      >

        <div class="space-y-2">

          <button
            @click="loadExample('ru')"
            class="w-full p-3 rounded-lg bg-slate-600/50 hover:bg-slate-600 transition-colors text-left border border-slate-600 hover:border-indigo-500/50"
          >
            <div class="font-semibold text-white text-sm">
              {{ t('buttons.exampleRu') }}
            </div>
            <div class="text-slate-300 text-xs mt-1">Алексей Петров</div>
            <div class="text-slate-400 text-xs">Senior Frontend Developer</div>
          </button>

          <button
            @click="loadExample('en')"
            class="w-full p-3 rounded-lg bg-slate-600/50 hover:bg-slate-600 transition-colors text-left border border-slate-600 hover:border-indigo-500/50"
          >
            <div class="font-semibold text-white text-sm">
              {{ t('buttons.exampleEn') }}
            </div>
            <div class="text-slate-300 text-xs mt-1">Alex Mitchell</div>
            <div class="text-slate-400 text-xs">Senior Frontend Engineer</div>
          </button>

        </div>
      </div>
    </Teleport>

  </div>
</template>