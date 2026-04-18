<script setup>
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '@/stores/themeStore'
import { themeList } from '@/themes'

const { t } = useI18n()
const themeStore = useThemeStore()
</script>

<template>
  <div class="mb-5">
    <div class="flex items-center gap-2 mb-3">
      <svg class="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
      <span class="text-sm font-medium text-slate-200">{{ t('themes.title') }}</span>
    </div>
    <div class="flex gap-2">
      <button
        v-for="theme in themeList"
        :key="theme.id"
        @click="themeStore.setTheme(theme.id)"
        :class="[
          'flex-1 group relative rounded-lg p-2 transition-all duration-200 border-2',
          themeStore.activeTheme === theme.id
            ? 'border-indigo-500 bg-slate-700/50 shadow-lg shadow-indigo-500/10'
            : 'border-slate-700/50 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-700/30'
        ]"
      >
        <!-- Mini preview -->
        <div
          class="w-full aspect-[210/297] rounded overflow-hidden mb-1.5 relative"
          :style="{
            background: theme.id === 'bold' ? '#0f172a' : '#ffffff',
            borderLeft: theme.id === 'modern' ? '3px solid ' + theme.accent : 'none'
          }"
        >
          <!-- Mini header bar -->
          <div
            :style="{
              height: theme.id === 'bold' ? '35%' : '4px',
              background: theme.id === 'bold' ? '#0f172a' : theme.accent,
              margin: theme.id === 'bold' ? '0' : '6px 6px 0 6px',
              borderRadius: theme.id === 'bold' ? '0' : '1px',
              borderBottom: theme.id === 'terminal' ? '1px dashed ' + theme.accent : 'none',
              position: 'relative'
            }"
          >
            <div
              v-if="theme.id === 'bold'"
              style="position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%); width: 60%; height: 3px; border-radius: 1px;"
              :style="{ background: theme.accent }"
            />
          </div>
          <!-- Mini content lines -->
          <div :style="{ padding: theme.id === 'bold' ? '4px 6px' : '5px 6px' }">
            <div
              :style="{ height: '2px', width: '50%', background: theme.accent, marginBottom: '3px', borderRadius: '1px', marginLeft: theme.id === 'classic' || theme.id === 'minimal' ? 'auto' : '0', marginRight: theme.id === 'classic' || theme.id === 'minimal' ? 'auto' : '0' }"
            />
            <div style="height: 1.5px; width: 80%; background: #e2e8f0; margin-bottom: 2px; border-radius: 1px;" />
            <div style="height: 1.5px; width: 65%; background: #e2e8f0; margin-bottom: 4px; border-radius: 1px;" />
            <div
              :style="{ height: '2px', width: '40%', background: theme.accent, marginBottom: '3px', borderRadius: '1px', opacity: '0.6' }"
            />
            <div style="height: 1.5px; width: 90%; background: #e2e8f0; margin-bottom: 2px; border-radius: 1px;" />
            <div style="height: 1.5px; width: 70%; background: #e2e8f0; border-radius: 1px;" />
          </div>
        </div>
        <!-- Theme name -->
        <p
          :class="[
            'text-center text-[10px] font-medium transition-colors',
            themeStore.activeTheme === theme.id ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-400'
          ]"
        >
          {{ t(`themes.${theme.id}`) }}
        </p>
        <!-- Active indicator -->
        <div
          v-if="themeStore.activeTheme === theme.id"
          class="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center"
        >
          <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
