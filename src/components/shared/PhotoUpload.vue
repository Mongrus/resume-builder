<script setup>
import { ref, nextTick, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'

const { t } = useI18n()

const emit = defineEmits(['cropped'])

const showModal = ref(false)
const imageSrc = ref('')
const imageEl = ref(null)
let cropper = null

function onFileSelect(event) {
  const file = event.target.files[0]
  if (!file) return
  if (!file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = (e) => {
    imageSrc.value = e.target.result
    showModal.value = true
    nextTick(() => {
      initCropper()
    })
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

function initCropper() {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
  if (!imageEl.value) return
  cropper = new Cropper(imageEl.value, {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 0.8,
    cropBoxResizable: true,
    cropBoxMovable: true,
    background: true,
    guides: true,
    center: true,
    highlight: true,
    responsive: true
  })
}

function applyCrop() {
  if (!cropper) return
  const canvas = cropper.getCroppedCanvas({
    width: 300,
    height: 300,
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high'
  })
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
  emit('cropped', dataUrl)
  closeModal()
}

function closeModal() {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
  showModal.value = false
  imageSrc.value = ''
}

onBeforeUnmount(() => {
  if (cropper) {
    cropper.destroy()
  }
})

defineExpose({ onFileSelect })
</script>

<template>
  <!-- Crop Modal -->
  <Teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      @click.self="closeModal"
    >
      <div class="bg-slate-800 rounded-xl shadow-2xl w-[90vw] max-w-lg overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-3 border-b border-slate-700">
          <h3 class="text-sm font-medium text-slate-200">{{ t('photo.cropTitle') }}</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-200 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cropper area -->
        <div class="p-4" style="max-height: 60vh;">
          <div style="max-height: 55vh; overflow: hidden;">
            <img ref="imageEl" :src="imageSrc" style="display: block; max-width: 100%;" />
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3 px-5 py-3 border-t border-slate-700">
          <button
            @click="closeModal"
            class="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors"
          >
            {{ t('photo.cancel') }}
          </button>
          <button
            @click="applyCrop"
            class="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {{ t('photo.apply') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
