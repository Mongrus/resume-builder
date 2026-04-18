<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'

const { t } = useI18n()
const store = useResumeStore()
const { summary } = storeToRefs(store)
</script>

<template>
  <div>
    <textarea
      v-model="summary"
      :placeholder="t('fields.summary')"
      rows="4"
      class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 resize-none"
    />
  </div>
</template>
