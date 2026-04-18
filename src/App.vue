<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import EditorView from '@/views/EditorView.vue'
import PreviewView from '@/views/PreviewView.vue'
import { useResumeStore, hasSavedResume } from '@/stores/resumeStore'
import { useThemeStore } from '@/stores/themeStore'

const { locale, t } = useI18n()
const store = useResumeStore()
const themeStore = useThemeStore()

const showRestoreDialog = ref(false)

const previewViewRef = ref(null)
const mobilePreviewRef = ref(null)
const previewPanelRef = ref(null)
const mobilePreviewContainerRef = ref(null)
const showPicker = ref(false)
const showMobilePreview = ref(false)
const previewScale = ref(1)
const mobilePreviewScale = ref(1)

const btnRef = ref(null)
const pickerStyle = ref({})

function getPreviewRef() {
  return previewViewRef.value?.previewRef?.previewRef
}

const A4_WIDTH = 793 // 210mm in px
const A4_HEIGHT = 1122 // 297mm in px
const PREVIEW_PADDING = 48 // px-6 = 24px * 2
const MOBILE_PADDING = 32 // p-4 = 16px * 2

let resizeObserver = null

function calcPreviewScale() {
  if (!previewPanelRef.value) return
  const available = previewPanelRef.value.clientWidth - PREVIEW_PADDING
  previewScale.value = Math.min(1, available / A4_WIDTH)
}

function calcMobilePreviewScale() {
  if (!mobilePreviewContainerRef.value) return
  const available = mobilePreviewContainerRef.value.clientWidth - MOBILE_PADDING
  mobilePreviewScale.value = Math.min(1, available / A4_WIDTH)
}

onMounted(() => {
  calcPreviewScale()
  resizeObserver = new ResizeObserver(() => {
    calcPreviewScale()
    calcMobilePreviewScale()
  })
  if (previewPanelRef.value) {
    resizeObserver.observe(previewPanelRef.value)
  }

  if (hasSavedResume()) {
    showRestoreDialog.value = true
  } else {
    startAutoSave()
  }
})

function startAutoSave() {
  store.initAutoSave()
  themeStore.$subscribe(() => {
    localStorage.setItem('resume-builder-theme', themeStore.activeTheme)
  })
  watch(locale, (val) => {
    localStorage.setItem('resume-builder-locale', val)
  })
}

function restoreResume() {
  store.loadFromStorage()
  const savedTheme = localStorage.getItem('resume-builder-theme')
  const savedLocale = localStorage.getItem('resume-builder-locale')
  if (savedTheme) themeStore.setTheme(savedTheme)
  if (savedLocale) locale.value = savedLocale
  startAutoSave()
  showRestoreDialog.value = false
}

function startFresh() {
  store.clearStorage()
  store.resetResume()
  localStorage.removeItem('resume-builder-theme')
  localStorage.removeItem('resume-builder-locale')
  startAutoSave()
  showRestoreDialog.value = false
}

function changeLanguage(lang) {
  locale.value = lang
}

function toggleMobilePreview() {
  showMobilePreview.value = !showMobilePreview.value
  if (showMobilePreview.value) {
    document.body.style.overflow = 'hidden'
    nextTick(() => {
      calcMobilePreviewScale()
      if (mobilePreviewContainerRef.value && resizeObserver) {
        resizeObserver.observe(mobilePreviewContainerRef.value)
      }
    })
  } else {
    document.body.style.overflow = ''
    if (mobilePreviewContainerRef.value && resizeObserver) {
      resizeObserver.unobserve(mobilePreviewContainerRef.value)
    }
  }
}

function updatePosition() {
  if (!btnRef.value) return

  const rect = btnRef.value.getBoundingClientRect()

  const pickerHeight = 260 // approximate
  const pickerWidth = 288 // w-72 = 18rem = 288px
  const spaceBelow = window.innerHeight - rect.bottom

  let top = rect.bottom + 8

  // если не помещается снизу — открываем вверх
  if (spaceBelow < pickerHeight) {
    top = rect.top - pickerHeight - 8
  }

  // Constrain left so picker stays within viewport
  let left = rect.left
  const maxLeft = window.innerWidth - pickerWidth - 8
  if (left > maxLeft) {
    left = Math.max(8, maxLeft)
  }

  pickerStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`
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

onBeforeUnmount(() => {
  cleanup()
  if (resizeObserver) resizeObserver.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen bg-slate-900 font-sans relative">

    <!-- Left panel (editor) -->
    <div class="w-full md:w-[480px] md:min-w-[420px] md:max-w-[520px] flex flex-col bg-slate-800 border-r border-slate-700/50 h-full pb-16 md:pb-0">

      <!-- Header -->
      <div class="relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-700/50 bg-slate-800/80 backdrop-blur-sm shrink-0">

        <div class="flex items-center gap-2 sm:gap-3 min-w-0">
          <div class="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-sm sm:text-base font-semibold text-white tracking-tight truncate">
            {{ t('app.title') }}
          </h1>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">

          <!-- BUTTON (ANCHOR) -->
          <button
            ref="btnRef"
            class="picker-btn px-2 sm:px-3 py-1.5 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-all duration-200"
            @click="togglePicker"
          >
            {{ t('buttons.exampleData') }}
          </button>

          <!-- language -->
          <div class="flex gap-1 bg-slate-700/50 rounded-lg p-0.5">
            <button
              @click="changeLanguage('en')"
              :class="[
                'px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
                locale === 'en' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              ]"
            >
              EN
            </button>

            <button
              @click="changeLanguage('ru')"
              :class="[
                'px-2 sm:px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200',
                locale === 'ru' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              ]"
            >
              RU
            </button>
          </div>

        </div>
      </div>

      <!-- Editor -->
      <div class="flex-1 overflow-y-auto px-4 sm:px-5 py-4">
        <EditorView :preview-ref="getPreviewRef()" />
      </div>

    </div>

    <!-- Right panel (preview) — desktop only -->
    <div ref="previewPanelRef" class="hidden md:flex flex-1 overflow-y-auto overflow-x-hidden bg-slate-700/30 justify-center items-start py-8 px-6">
      <div
        :style="{ transform: `scale(${previewScale})`, transformOrigin: 'top center', marginBottom: `-${(1 - previewScale) * 100}%` }"
      >
        <PreviewView ref="previewViewRef" />
      </div>
    </div>

    <!-- Mobile preview button — fixed at bottom -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-slate-800 border-t border-slate-700/50">
      <button
        @click="toggleMobilePreview"
        class="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white py-3.5 rounded-xl text-base font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/30"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        {{ t('buttons.preview') }}
      </button>
    </div>

    <!-- Mobile preview overlay -->
    <Transition name="slide-up">
      <div
        v-if="showMobilePreview"
        class="md:hidden fixed inset-0 z-50 flex flex-col bg-slate-900"
      >
        <!-- Overlay header with close button -->
        <div class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700/50 shrink-0">
          <h2 class="text-white font-semibold text-sm">{{ t('buttons.preview') }}</h2>
          <button
            @click="toggleMobilePreview"
            class="text-slate-400 hover:text-white transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Preview content — scrollable, scaled -->
        <div ref="mobilePreviewContainerRef" class="flex-1 overflow-x-hidden overflow-y-auto bg-slate-700/30 p-4">
          <div
            :style="{
              width: A4_WIDTH + 'px',
              transform: `scale(${mobilePreviewScale})`,
              transformOrigin: 'top left',
              marginBottom: `-${A4_HEIGHT * (1 - mobilePreviewScale)}px`
            }"
          >
            <PreviewView ref="mobilePreviewRef" />
          </div>
        </div>

        <!-- Bottom close button -->
        <div class="p-3 bg-slate-800 border-t border-slate-700/50 shrink-0">
          <button
            @click="toggleMobilePreview"
            class="w-full flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white py-3.5 rounded-xl text-base font-semibold transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            {{ t('buttons.preview') }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Restore dialog -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showRestoreDialog"
          class="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div class="bg-slate-800 border border-slate-600 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h2 class="text-lg font-semibold text-white">{{ t('restore.title') }}</h2>
            </div>
            <p class="text-slate-300 text-sm mb-6">{{ t('restore.message') }}</p>
            <div class="flex gap-3">
              <button
                @click="startFresh"
                class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-600 hover:bg-slate-500 text-slate-200 transition-colors duration-200"
              >
                {{ t('restore.startFresh') }}
              </button>
              <button
                @click="restoreResume"
                class="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white transition-colors duration-200 shadow-lg shadow-indigo-500/30"
              >
                {{ t('restore.continue') }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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
