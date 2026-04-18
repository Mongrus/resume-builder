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
    }
  }
})
