<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useResumeStore } from '@/stores/resumeStore'

const { t } = useI18n()
const store = useResumeStore()
const { personal } = storeToRefs(store)
</script>

<template>
  <div class="space-y-2.5">
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
