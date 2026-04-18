<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import PhotoUpload from '@/components/shared/PhotoUpload.vue'

const { t } = useI18n()
const store = useResumeStore()
const { personal, showPhoto, photo } = storeToRefs(store)

const fileInput = ref(null)
const photoUpload = ref(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(event) {
  photoUpload.value?.onFileSelect(event)
}

function onPhotoCropped(dataUrl) {
  store.photo = dataUrl
}

function removePhoto() {
  store.photo = ''
}
</script>

<template>
  <div class="space-y-2.5">
    <!-- Photo toggle -->
    <label class="flex items-center gap-2 cursor-pointer select-none">
      <input
        v-model="showPhoto"
        type="checkbox"
        class="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500/25 focus:ring-offset-0 cursor-pointer"
      />
      <span class="text-sm text-slate-300">{{ t('photo.addPhoto') }}</span>
    </label>

    <!-- Photo upload area -->
    <div v-if="showPhoto" class="flex items-center gap-3">
      <!-- Preview / placeholder -->
      <div
        @click="triggerFileInput"
        class="relative w-16 h-16 rounded-full border-2 border-dashed border-slate-600 hover:border-indigo-500/50 flex items-center justify-center cursor-pointer overflow-hidden transition-colors group"
      >
        <img
          v-if="photo"
          :src="photo"
          class="w-full h-full object-cover"
        />
        <svg v-else class="w-6 h-6 text-slate-500 group-hover:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <div class="flex flex-col gap-1.5">
        <button
          @click="triggerFileInput"
          class="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg transition-colors"
        >
          {{ photo ? t('photo.change') : t('photo.upload') }}
        </button>
        <button
          v-if="photo"
          @click="removePhoto"
          class="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs rounded-lg transition-colors"
        >
          {{ t('photo.remove') }}
        </button>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
      <PhotoUpload ref="photoUpload" @cropped="onPhotoCropped" />
    </div>
    <div class="grid grid-cols-2 gap-2.5">
      <input
        v-model="personal.name"
        type="text"
        :placeholder="t('fields.fullName')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
      <input
        v-model="personal.title"
        type="text"
        :placeholder="t('fields.jobTitle')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
    </div>
    <div class="grid grid-cols-2 gap-2.5">
      <input
        v-model="personal.email"
        type="email"
        :placeholder="t('fields.email')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
      <input
        v-model="personal.phone"
        type="tel"
        :placeholder="t('fields.phone')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
    </div>
    <input
      v-model="personal.location"
      type="text"
      :placeholder="t('fields.location')"
      class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
    />
    <div class="grid grid-cols-2 gap-2.5">
      <input
        v-model="personal.linkedin"
        type="url"
        :placeholder="t('fields.linkedinUrl')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
      <input
        v-model="personal.github"
        type="url"
        :placeholder="t('fields.githubUrl')"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
      />
    </div>
    <input
      v-model="personal.website"
      type="url"
      :placeholder="t('fields.website')"
      class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25"
    />
  </div>
</template>
