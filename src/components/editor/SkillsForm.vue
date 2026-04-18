<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'
import TagInput from '@/components/shared/TagInput.vue'

const { t } = useI18n()
const store = useResumeStore()
const { skills } = storeToRefs(store)
</script>

<template>
  <div>
    <TagInput v-model="skills" />
  </div>
</template>
