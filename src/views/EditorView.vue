<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import { downloadPdf } from '@/utils/pdfExport'
import { downloadJson, importJson } from '@/utils/jsonExport'
import ThemeSelector from '@/components/editor/ThemeSelector.vue'
import PersonalInfoForm from '@/components/editor/PersonalInfoForm.vue'
import SummaryForm from '@/components/editor/SummaryForm.vue'
import ExperienceForm from '@/components/editor/ExperienceForm.vue'
import EducationForm from '@/components/editor/EducationForm.vue'
import SkillsForm from '@/components/editor/SkillsForm.vue'
import ProjectsForm from '@/components/editor/ProjectsForm.vue'
import LanguagesForm from '@/components/editor/LanguagesForm.vue'

const { t } = useI18n()
const store = useResumeStore()

const props = defineProps({
  previewRef: {
    type: Object,
    default: null
  }
})

const openSections = ref({
  personal: true,
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  languages: true
})

function toggleSection(key) {
  openSections.value[key] = !openSections.value[key]
}

async function handlePdfExport() {
  if (!props.previewRef) return
  await downloadPdf(props.previewRef)
}

function handleJsonExport() {
  const data = {
    personal: store.personal,
    summary: store.summary,
    experience: store.experience,
    education: store.education,
    skills: store.skills,
    projects: store.projects,
    languages: store.languages
  }
  downloadJson(data)
}

async function handleJsonImport(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const data = await importJson(file)
    store.loadResume(data)
    event.target.value = ''
  } catch (error) {
    alert(t('export.importError') + error.message)
  }
}
</script>

<template>
  <div>
    <!-- Export buttons -->
    <div class="flex gap-2 mb-5">
      <button
        @click="handlePdfExport"
        class="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm shadow-indigo-500/25"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        PDF
      </button>
      <button
        @click="handleJsonExport"
        class="flex-1 flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        JSON
      </button>
      <label class="flex-1 flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {{ t('export.import') }}
        <input type="file" accept=".json" class="hidden" @change="handleJsonImport" />
      </label>
    </div>

    <!-- Theme Selector -->
    <ThemeSelector />

    <!-- Sections -->
    <div class="space-y-2">
      <!-- Personal Info -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('personal')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ t('forms.personalInfo') }}
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.personal ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.personal" class="px-4 pb-4">
          <PersonalInfoForm />
        </div>
      </div>

      <!-- Summary -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('summary')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
            {{ t('forms.summary') }}
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.summary ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.summary" class="px-4 pb-4">
          <SummaryForm />
        </div>
      </div>

      <!-- Experience -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('experience')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ t('forms.experience') }}
            <span v-if="store.experience.length" class="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full">{{ store.experience.length }}</span>
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.experience ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.experience" class="px-4 pb-4">
          <ExperienceForm />
        </div>
      </div>

      <!-- Education -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('education')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            {{ t('forms.education') }}
            <span v-if="store.education.length" class="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full">{{ store.education.length }}</span>
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.education ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.education" class="px-4 pb-4">
          <EducationForm />
        </div>
      </div>

      <!-- Skills -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('skills')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {{ t('forms.skills') }}
            <span v-if="store.skills.length" class="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full">{{ store.skills.length }}</span>
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.skills ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.skills" class="px-4 pb-4">
          <SkillsForm />
        </div>
      </div>

      <!-- Projects -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('projects')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {{ t('forms.projects') }}
            <span v-if="store.projects.length" class="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full">{{ store.projects.length }}</span>
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.projects ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.projects" class="px-4 pb-4">
          <ProjectsForm />
        </div>
      </div>

      <!-- Languages -->
      <div class="rounded-lg overflow-hidden bg-slate-700/30 border border-slate-700/50">
        <button
          @click="toggleSection('languages')"
          class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-700/30 transition-colors"
        >
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            {{ t('forms.languages') }}
            <span v-if="store.languages.length" class="text-xs bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full">{{ store.languages.length }}</span>
          </div>
          <svg :class="['w-4 h-4 text-slate-400 transition-transform duration-200', openSections.languages ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="openSections.languages" class="px-4 pb-4">
          <LanguagesForm />
        </div>
      </div>
    </div>
  </div>
</template>
