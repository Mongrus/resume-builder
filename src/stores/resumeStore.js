import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
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

    fillTestData() {
      this.personal = {
        name: 'Алексей Петров',
        title: 'Senior Frontend Developer',
        email: 'alexey.petrov@example.com',
        phone: '+7 (999) 123-45-67',
        location: 'Москва, Россия',
        linkedin: 'linkedin.com/in/alexeypetrov',
        github: 'github.com/alexeypetrov',
        website: 'alexeypetrov.dev'
      }
      this.summary = 'Опытный фронтенд-разработчик с 6+ годами коммерческой разработки. Специализируюсь на Vue.js и React. Имею опыт построения сложных SPA, оптимизации производительности и менторства junior-разработчиков.'
      this.experience = [
        {
          id: crypto.randomUUID(),
          company: 'Яндекс',
          position: 'Senior Frontend Developer',
          startDate: '2022-03',
          endDate: '',
          current: true,
          description: 'Разработка и поддержка внутренних инструментов на Vue 3. Оптимизация производительности, код-ревью, менторство.'
        },
        {
          id: crypto.randomUUID(),
          company: 'Сбер',
          position: 'Frontend Developer',
          startDate: '2019-06',
          endDate: '2022-02',
          current: false,
          description: 'Разработка интерфейсов для интернет-банкинга на React. Внедрение дизайн-системы, написание unit-тестов.'
        }
      ]
      this.education = [
        {
          id: crypto.randomUUID(),
          institution: 'МГТУ им. Баумана',
          degree: 'Бакалавр',
          field: 'Информатика и вычислительная техника',
          startDate: '2015-09',
          endDate: '2019-06'
        }
      ]
      this.skills = ['JavaScript', 'TypeScript', 'Vue.js', 'React', 'Node.js', 'Tailwind CSS', 'Git', 'Docker', 'REST API', 'GraphQL']
      this.projects = [
        {
          id: crypto.randomUUID(),
          name: 'TaskFlow',
          description: 'Канбан-доска для управления задачами с real-time синхронизацией через WebSocket.',
          tech: ['Vue 3', 'Pinia', 'Node.js', 'Socket.io'],
          url: 'https://github.com/alexeypetrov/taskflow'
        },
        {
          id: crypto.randomUUID(),
          name: 'DevBlog',
          description: 'Персональный блог с SSR на Nuxt 3 и CMS на Strapi.',
          tech: ['Nuxt 3', 'Strapi', 'PostgreSQL'],
          url: 'https://alexeypetrov.dev/blog'
        }
      ]
      this.languages = [
        { name: 'Русский', level: 'native' },
        { name: 'English', level: 'B2' }
      ]
    }
  }
})
