<script setup>
import { ref } from 'vue'
import ResumePreview from '@/components/preview/ResumePreview.vue'

const previewRef = ref(null)

defineExpose({ previewRef })
</script>

<template>
  <ResumePreview ref="previewRef" />
</template>
