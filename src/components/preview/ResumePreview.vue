<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import { useThemeStore } from '@/stores/themeStore'
import { getTheme } from '@/themes'

const { t } = useI18n()
const store = useResumeStore()
const themeStore = useThemeStore()
const previewRef = ref(null)

const theme = computed(() => getTheme(themeStore.activeTheme))

defineExpose({ previewRef })

function normalizeUrl(url) {
  if (!url) return url
  if (/^https?:\/\//i.test(url)) return url
  return 'https://' + url
}

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
    :style="[{ boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }, theme.page]"
  >
    <!-- Header -->
    <div :style="[theme.header, store.showPhoto && store.photo ? theme.headerWithPhoto : {}]">
      <!-- Photo -->
      <img
        v-if="store.showPhoto && store.photo"
        :src="store.photo"
        :style="theme.photo"
      />
      <div :style="store.showPhoto && store.photo ? { flex: '1' } : {}">
        <h1 :style="theme.name">
          {{ store.personal.name || 'Your Name' }}
        </h1>
        <p v-if="store.personal.title" :style="theme.title">
          {{ store.personal.title }}
        </p>
      </div>
      <div :style="theme.contacts">
        <a v-if="store.personal.email" :href="'mailto:' + store.personal.email" style="display: inline-flex; align-items: center; gap: 3pt; color: inherit; text-decoration: none;">
          {{ store.personal.email }}
        </a>
        <span v-if="store.personal.email && store.personal.phone" :style="theme.contactSeparator">|</span>
        <span v-if="store.personal.phone">{{ store.personal.phone }}</span>
        <span v-if="store.personal.phone && store.personal.location" :style="theme.contactSeparator">|</span>
        <span v-if="store.personal.location">{{ store.personal.location }}</span>
        <span v-if="store.personal.location && (store.personal.linkedin || store.personal.github || store.personal.website)" :style="theme.contactSeparator">|</span>
        <a v-if="store.personal.linkedin" :href="normalizeUrl(store.personal.linkedin)" target="_blank" :style="[theme.contactLink, { textDecoration: 'none' }]">LinkedIn</a>
        <a v-if="store.personal.github" :href="normalizeUrl(store.personal.github)" target="_blank" :style="[theme.contactLink, { textDecoration: 'none' }]">GitHub</a>
        <a v-if="store.personal.website" :href="normalizeUrl(store.personal.website)" target="_blank" :style="[theme.contactLink, { textDecoration: 'none' }]">Website</a>
      </div>
    </div>

    <!-- Summary -->
    <section v-if="store.summary" :style="{ marginBottom: theme.sectionMargin }">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.summary') }}
      </h2>
      <p :style="theme.itemDescription">{{ store.summary }}</p>
    </section>

    <!-- Experience -->
    <section v-if="store.experience.length" :style="{ marginBottom: theme.sectionMargin }">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.experience') }}
      </h2>
      <div v-for="(exp, idx) in store.experience" :key="exp.id" :style="{ marginBottom: idx < store.experience.length - 1 ? '12pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <span :style="theme.itemTitle">{{ exp.position }}</span>
            <span v-if="exp.company" :style="theme.itemSubtitle"> — {{ exp.company }}</span>
          </div>
          <span :style="theme.itemDate">
            {{ exp.startDate }} — {{ exp.current ? t('resume.present') : exp.endDate }}
          </span>
        </div>
        <p v-if="exp.description" :style="theme.itemDescription">{{ exp.description }}</p>
      </div>
    </section>

    <!-- Education -->
    <section v-if="store.education.length" :style="{ marginBottom: theme.sectionMargin }">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.education') }}
      </h2>
      <div v-for="(edu, idx) in store.education" :key="edu.id" :style="{ marginBottom: idx < store.education.length - 1 ? '10pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <span :style="theme.itemTitle">{{ edu.degree }}</span>
            <span v-if="edu.field" :style="theme.itemSubtitle"> — {{ edu.field }}</span>
          </div>
          <span :style="theme.itemDate">
            {{ edu.startDate }} — {{ edu.endDate }}
          </span>
        </div>
        <p v-if="edu.institution" :style="[theme.itemSubtitle, { margin: '2pt 0 0 0' }]">{{ edu.institution }}</p>
      </div>
    </section>

    <!-- Skills -->
    <section v-if="store.skills.length" :style="{ marginBottom: theme.sectionMargin }">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.skills') }}
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 4pt;">
        <span
          v-for="(skill, index) in store.skills"
          :key="index"
          :style="theme.skillTag"
        >
          {{ skill }}
        </span>
      </div>
    </section>

    <!-- Projects -->
    <section v-if="store.projects.length" :style="{ marginBottom: theme.sectionMargin }">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.projects') }}
      </h2>
      <div v-for="(proj, idx) in store.projects" :key="proj.id" :style="{ marginBottom: idx < store.projects.length - 1 ? '10pt' : '0' }">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span :style="theme.itemTitle">{{ proj.name }}</span>
          <a v-if="proj.url" :href="proj.url" target="_blank" :style="[theme.contactLink, { fontSize: '9.5pt', textDecoration: 'none' }]">{{ proj.url }}</a>
        </div>
        <p v-if="proj.description" :style="[theme.itemDescription, { margin: '3pt 0 0 0' }]">{{ proj.description }}</p>
        <div v-if="proj.tech.length" style="display: flex; flex-wrap: wrap; gap: 3pt; margin-top: 5pt;">
          <span v-for="(tech, index) in proj.tech" :key="index" :style="theme.techTag">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <!-- Languages -->
    <section v-if="store.languages.length">
      <h2 :style="theme.sectionTitle">
        {{ theme.sectionPrefix }}{{ t('resume.languages') }}
      </h2>
      <div style="display: flex; flex-wrap: wrap; gap: 12pt;">
        <div v-for="lang in store.languages" :key="lang.id" style="font-size: 10pt;">
          <span :style="theme.itemTitle">{{ lang.name }}</span>
          <span :style="theme.itemSubtitle"> — {{ getLevelDisplay(lang.level) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
