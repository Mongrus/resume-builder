<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'

const { t } = useI18n()
const store = useResumeStore()
const previewRef = ref(null)

defineExpose({ previewRef })

function getLevelDisplay(level) {
  const levelMap = {
    'Basic': 'basic',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced',
    'Fluent': 'fluent',
    'Native': 'native'
  }
  return t(`proficiencyLevels.${levelMap[level] || level}`)
}
</script>

<template>
  <!-- A4 page: 210mm x 297mm — this div IS the PDF source -->
  <div
    ref="previewRef"
    class="a4-page"
    style="box-shadow: 0 4px 40px rgba(0,0,0,0.4);"
  >
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 18pt; padding-bottom: 14pt; border-bottom: 2pt solid #4338ca;">
      <h1 style="font-size: 22pt; font-weight: 700; color: #1e293b; margin: 0; letter-spacing: -0.5px; line-height: 1.2;">
        {{ store.personal.name || 'Your Name' }}
      </h1>
      <p v-if="store.personal.title" style="font-size: 11pt; color: #4338ca; margin: 4pt 0 0 0; font-weight: 500;">
        {{ store.personal.title }}
      </p>
      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6pt; margin-top: 10pt; font-size: 8.5pt; color: #475569;">
        <span v-if="store.personal.email" style="display: inline-flex; align-items: center; gap: 3pt;">
          {{ store.personal.email }}
        </span>
        <span v-if="store.personal.email && store.personal.phone" style="color: #cbd5e1;">|</span>
        <span v-if="store.personal.phone">{{ store.personal.phone }}</span>
        <span v-if="store.personal.phone && store.personal.location" style="color: #cbd5e1;">|</span>
        <span v-if="store.personal.location">{{ store.personal.location }}</span>
        <span v-if="store.personal.location && (store.personal.linkedin || store.personal.github || store.personal.website)" style="color: #cbd5e1;">|</span>
        <span v-if="store.personal.linkedin" style="color: #4338ca;">LinkedIn</span>
        <span v-if="store.personal.github" style="color: #4338ca;">GitHub</span>
        <span v-if="store.personal.website" style="color: #4338ca;">Website</span>
      </div>
    </div>

    <!-- Summary -->
    <section v-if="store.summary" style="margin-bottom: 16pt;">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.summary') }}
      </h2>
      <p style="font-size: 9pt; line-height: 1.6; color: #334155; margin: 0; white-space: pre-line;">{{ store.summary }}</p>
    </section>

    <!-- Experience -->
    <section v-if="store.experience.length" style="margin-bottom: 16pt;">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.experience') }}
      </h2>
      <div v-for="(exp, idx) in store.experience" :key="exp.id" :style="{ marginBottom: idx < store.experience.length - 1 ? '12pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <span style="font-size: 10pt; font-weight: 600; color: #1e293b;">{{ exp.position }}</span>
            <span v-if="exp.company" style="font-size: 9pt; color: #64748b;"> — {{ exp.company }}</span>
          </div>
          <span style="font-size: 8pt; color: #94a3b8; white-space: nowrap; margin-left: 8pt;">
            {{ exp.startDate }} — {{ exp.current ? t('resume.present') : exp.endDate }}
          </span>
        </div>
        <p v-if="exp.description" style="font-size: 8.5pt; line-height: 1.6; color: #475569; margin: 4pt 0 0 0; white-space: pre-line;">{{ exp.description }}</p>
      </div>
    </section>

    <!-- Education -->
    <section v-if="store.education.length" style="margin-bottom: 16pt;">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.education') }}
      </h2>
      <div v-for="(edu, idx) in store.education" :key="edu.id" :style="{ marginBottom: idx < store.education.length - 1 ? '10pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <span style="font-size: 10pt; font-weight: 600; color: #1e293b;">{{ edu.degree }}</span>
            <span v-if="edu.field" style="font-size: 9pt; color: #64748b;"> — {{ edu.field }}</span>
          </div>
          <span style="font-size: 8pt; color: #94a3b8; white-space: nowrap; margin-left: 8pt;">
            {{ edu.startDate }} — {{ edu.endDate }}
          </span>
        </div>
        <p v-if="edu.institution" style="font-size: 8.5pt; color: #64748b; margin: 2pt 0 0 0;">{{ edu.institution }}</p>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="store.skills.length" style="margin-bottom: 16pt;">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.skills') }}
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 4pt;">
        <span
          v-for="(skill, index) in store.skills"
          :key="index"
          style="display: inline-block; background: #eef2ff; color: #4338ca; font-size: 8pt; padding: 3pt 8pt; border-radius: 3pt; font-weight: 500;"
        >
          {{ skill }}
        </span>
      </div>
    </section>

    <!-- Projects -->
    <section v-if="store.projects.length" style="margin-bottom: 16pt;">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.projects') }}
      </h2>
      <div v-for="(proj, idx) in store.projects" :key="proj.id" :style="{ marginBottom: idx < store.projects.length - 1 ? '10pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span style="font-size: 10pt; font-weight: 600; color: #1e293b;">{{ proj.name }}</span>
          <span v-if="proj.url" style="font-size: 7.5pt; color: #4338ca;">{{ proj.url }}</span>
        </div>
        <p v-if="proj.description" style="font-size: 8.5pt; line-height: 1.6; color: #475569; margin: 3pt 0 0 0; white-space: pre-line;">{{ proj.description }}</p>
        <div v-if="proj.tech.length" style="display: flex; flex-wrap: wrap; gap: 3pt; margin-top: 5pt;">
          <span v-for="(tech, index) in proj.tech" :key="index" style="font-size: 7.5pt; background: #f1f5f9; color: #475569; padding: 2pt 6pt; border-radius: 2pt;">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- Languages -->
    <section v-if="store.languages.length">
      <h2 style="font-size: 11pt; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8pt 0; padding-bottom: 4pt; border-bottom: 1pt solid #e2e8f0;">
        {{ t('resume.languages') }}
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 12pt;">
        <div v-for="lang in store.languages" :key="lang.id" style="font-size: 9pt;">
          <span style="font-weight: 600; color: #1e293b;">{{ lang.name }}</span>
          <span style="color: #64748b;"> — {{ getLevelDisplay(lang.level) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
