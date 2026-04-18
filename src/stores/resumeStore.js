import { defineStore } from 'pinia'
import testPhoto from '@/assets/testPhoto.js'

const testDataRu = {
  personal: {
    name: 'Алексей Петров',
    title: 'Senior Frontend Developer',
    email: 'alexey.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    location: 'Москва, Россия',
    linkedin: 'https://linkedin.com/in/alexeypetrov',
    github: 'https://github.com/alexeypetrov',
    website: 'https://alexeypetrov.dev'
  },
  summary: 'Опытный фронтенд-разработчик с 6+ годами коммерческой разработки. Специализируюсь на Vue.js и React. Имею опыт построения сложных SPA, оптимизации производительности и менторства junior-разработчиков.',
  experience: [
    {
      company: 'Яндекс',
      position: 'Senior Frontend Developer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: 'Разработка и поддержка внутренних инструментов на Vue 3. Оптимизация производительности, код-ревью, менторство.'
    },
    {
      company: 'Сбер',
      position: 'Frontend Developer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: 'Разработка интерфейсов для интернет-банкинга на React. Внедрение дизайн-системы, написание unit-тестов.'
    }
  ],
  education: [
    {
      institution: 'МГТУ им. Баумана',
      degree: 'Бакалавр',
      field: 'Информатика и вычислительная техника',
      startDate: '2015-09',
      endDate: '2019-06'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Tailwind CSS', 'Git', 'Docker', 'REST API', 'GraphQL'],
  projects: [
    {
      name: 'TaskFlow',
      description: 'Канбан-доска для управления задачами с real-time синхронизацией через WebSocket.',
      tech: ['Vue 3', 'Pinia', 'Node.js', 'Socket.io'],
      url: 'https://github.com/alexeypetrov/taskflow'
    },
    {
      name: 'DevBlog',
      description: 'Персональный блог с SSR на Nuxt 3 и CMS на Strapi.',
      tech: ['Nuxt 3', 'Strapi', 'PostgreSQL'],
      url: 'https://alexeypetrov.dev/blog'
    }
  ],
  languages: [
    { name: 'Русский', level: 'Native' },
    { name: 'English', level: 'Advanced' }
  ]
}

const testDataEn = {
  personal: {
    name: 'Alex Mitchell',
    title: 'Senior Frontend Developer',
    email: 'alex.mitchell@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/alexmitchell',
    github: 'https://github.com/alexmitchell',
    website: 'https://alexmitchell.dev'
  },
  summary: 'Results-driven frontend engineer with 6+ years of professional experience building scalable applications. Specialized in Vue.js and React. Proven track record in architecting complex SPAs, performance optimization, and mentoring junior developers.',
  experience: [
    {
      company: 'Google',
      position: 'Senior Frontend Engineer',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: 'Architecting and maintaining internal tools using Vue 3. Led performance optimization initiatives resulting in 40% improvement. Code review and mentoring senior engineers.'
    },
    {
      company: 'Meta',
      position: 'Frontend Engineer',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: 'Developed user-facing React interfaces for mobile and web. Implemented design system components and comprehensive unit test coverage.'
    }
  ],
  education: [
    {
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-06'
    }
  ],
  skills: ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Tailwind CSS', 'Git', 'Docker', 'REST API', 'GraphQL'],
  projects: [
    {
      name: 'TaskFlow',
      description: 'Real-time collaborative kanban board with WebSocket synchronization and offline support.',
      tech: ['Vue 3', 'Pinia', 'Node.js', 'Socket.io'],
      url: 'https://github.com/alexmitchell/taskflow'
    },
    {
      name: 'DevBlog',
      description: 'Personal tech blog built with Nuxt 3 and headless CMS integration with million+ monthly visitors.',
      tech: ['Nuxt 3', 'Strapi', 'PostgreSQL'],
      url: 'https://alexmitchell.dev/blog'
    }
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Spanish', level: 'Intermediate' }
  ]
}

const STORAGE_KEY = 'resume-builder-data'

export function hasSavedResume() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return false
    const data = JSON.parse(saved)
    return !!(data.personal?.name || data.summary || data.experience?.length || data.education?.length || data.skills?.length || data.projects?.length)
  } catch {
    return false
  }
}

export const useResumeStore = defineStore('resume', {
  state: () => ({
    showPhoto: false,
    photo: '',
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: []
  }),

  actions: {
    saveToStorage() {
      try {
        const data = {
          showPhoto: this.showPhoto,
          photo: this.photo,
          personal: this.personal,
          summary: this.summary,
          experience: this.experience,
          education: this.education,
          skills: this.skills,
          projects: this.projects,
          languages: this.languages
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      } catch { /* storage full or unavailable */ }
    },

    loadFromStorage() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const data = JSON.parse(saved)
          Object.assign(this, data)
        }
      } catch { /* corrupted data */ }
    },

    clearStorage() {
      localStorage.removeItem(STORAGE_KEY)
    },

    initAutoSave() {
      this.$subscribe(() => {
        this.saveToStorage()
      })
    },

    updateField(section, data) {
      if (typeof data === 'object') {
        Object.assign(this[section], data)
      } else {
        this[section] = data
      }
    },

    addItem(section, defaults = {}) {
      const id = crypto.randomUUID()
      this[section].push({ id, ...defaults })
      return id
    },

    removeItem(section, id) {
      this[section] = this[section].filter(item => item.id !== id)
    },

    updateItem(section, id, field, value) {
      const item = this[section].find(i => i.id === id)
      if (item) {
        item[field] = value
      }
    },

    reorderItems(section, fromIndex, toIndex) {
      const arr = [...this[section]]
      const [removed] = arr.splice(fromIndex, 1)
      arr.splice(toIndex, 0, removed)
      this[section] = arr
    },

    loadResume(data) {
      Object.assign(this, data)
    },

    resetResume() {
      this.$reset()
    },

    fillTestData(lang = 'ru') {
      const data = lang === 'en' ? testDataEn : testDataRu

      this.showPhoto = !!testPhoto
      this.photo = testPhoto
      this.personal = data.personal
      this.summary = data.summary
      this.experience = data.experience.map(item => ({
        id: crypto.randomUUID(),
        ...item
      }))
      this.education = data.education.map(item => ({
        id: crypto.randomUUID(),
        ...item
      }))
      this.skills = data.skills
      this.projects = data.projects.map(item => ({
        id: crypto.randomUUID(),
        ...item
      }))
      this.languages = data.languages.map(item => ({
        id: crypto.randomUUID(),
        ...item
      }))
    }
  }
})
