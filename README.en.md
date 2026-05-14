# IT Resume Builder

[![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3-ffd859?logo=pinia&logoColor=white)](https://pinia.vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![jsPDF](https://img.shields.io/badge/jsPDF-4-F40F02)](https://github.com/parallax/jsPDF)

> [Русская версия](README.md)

A client-side SPA for creating, previewing, and exporting IT resumes as PDF or JSON. No backend required — all logic (PDF generation, JSON import/export, data persistence) runs entirely in the browser.

Built with **Vue 3** (Composition API) + **Pinia** for state management. 10 built-in themes, bilingual interface (RU/EN), responsive design for desktop and mobile.

<p align="center">
  <img src="docs/assets/screenshot.png" alt="IT Resume Builder — resume constructor" width="800">
</p>

---

## Features

- **Visual editor** — forms for all resume sections: personal info, experience, education, skills, projects, languages
- **Live preview** — instant A4-format preview alongside the editor
- **10 themes** — Classic, Modern, Terminal, Minimal, Bold, Royal, Noir, Ocean, Coral, Forest
- **PDF export** — print via system dialog (desktop/iOS) or html2canvas + jsPDF (Android)
- **JSON import/export** — save and load resume data as JSON files
- **Photo** — upload and crop profile photo (cropperjs), displayed in the resume
- **Auto-save** — data persists in localStorage; restore dialog on return visits
- **Demo data** — quick-fill with sample data in Russian or English
- **Bilingual UI** — RU/EN toggle via vue-i18n
- **Responsive** — full mobile support with overlay preview
- **Drag & Drop** — reorder items within sections

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Framework | Vue 3 (Composition API), Vue Router 4 |
| State | Pinia 3 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| PDF | html2canvas 1 + jsPDF 4 |
| i18n | vue-i18n 10 |
| Images | cropperjs 1, sharp (dev) |

---

## Architecture

### Data Flow

```
[Editor Forms] ──────────► [Pinia Store] ◄──────── [Preview Component]
                          (resumeData)             (live sync)
                               │
                    ┌──────────┼──────────────┐
                    ▼          ▼              ▼
              [PDF Export] [JSON Export]  [JSON Import]
              print / jsPDF  Blob → download FileReader → store
                    │          │              │
                    ▼          ▼              ▼
               resume.pdf  resume.json    restore data
                                          in store
```

### Single Source of Truth

The Pinia store (`src/stores/resumeStore.js`) holds all resume data. UI components react to state changes automatically. State modification — only through actions:

```js
// ✅ Correct
const store = useResumeStore()
store.updateField('personal', newData)

// ❌ Wrong — direct mutation
store.personal = newData
```

### PDF Export: Cross-Platform Strategy

| Platform | Method | Result |
|----------|--------|--------|
| Desktop | `window.open` → `print()` | Vector PDF, clickable links |
| iOS / iPad | `iframe` → `print()` | System print dialog |
| Android | `html2canvas` → `jsPDF` → `navigator.share` | Raster PDF, share sheet |

### Theming

10 themes defined as inline style objects (`src/themes/index.js`). Inline styles are required for correct rendering via html2canvas.

---

## Project Structure

```
resume/
├── src/
│   ├── components/
│   │   ├── editor/              # Editor forms
│   │   │   ├── PersonalInfoForm.vue
│   │   │   ├── SummaryForm.vue
│   │   │   ├── ExperienceForm.vue
│   │   │   ├── EducationForm.vue
│   │   │   ├── SkillsForm.vue
│   │   │   ├── ProjectsForm.vue
│   │   │   ├── LanguagesForm.vue
│   │   │   └── ThemeSelector.vue
│   │   ├── preview/
│   │   │   └── ResumePreview.vue   # HTML resume template (PDF source)
│   │   └── shared/
│   │       ├── TagInput.vue        # Reusable tag input
│   │       ├── DraggableList.vue   # Drag-to-reorder
│   │       └── PhotoUpload.vue     # Photo upload & crop
│   ├── views/
│   │   ├── EditorView.vue          # Left panel with forms
│   │   └── PreviewView.vue         # Right panel / preview
│   ├── stores/
│   │   ├── resumeStore.js          # Pinia — all resume data
│   │   └── themeStore.js           # Pinia — active theme
│   ├── themes/
│   │   └── index.js                # 10 themes with inline styles
│   ├── utils/
│   │   ├── pdfExport.js            # Cross-platform PDF export
│   │   └── jsonExport.js           # JSON export/import
│   ├── locales/                    # i18n translations (en.json, ru.json)
│   ├── i18n.js                     # vue-i18n configuration
│   ├── App.vue                     # Root component
│   └── main.js                     # Entry point
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── package.json
```

---

## Quick Start

### Requirements

- Node.js >= 20

### Install & Run

```bash
cd resume
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview    # preview the build
```

---

## Resume Data Structure

```js
{
  showPhoto: boolean,
  photo: string,              // base64 or URL
  personal: {
    name, title, email, phone, location, linkedin, github, website
  },
  summary: string,
  experience: [{ id, company, position, startDate, endDate, current, description }],
  education: [{ id, institution, degree, field, startDate, endDate }],
  skills: [string],
  projects: [{ id, name, description, tech[], url }],
  languages: [{ id, name, level }]
}
```

Each array item has an `id` (UUID) for unique identification when adding, removing, and reordering.

---

## Key Engineering Decisions

| Decision | Why |
|----------|-----|
| **Inline styles for themes** | html2canvas doesn't support external CSS classes during rendering — inline ensures identical PDF output |
| **print() over jsPDF on desktop** | Vector PDF, clickable links, sharp text — html2canvas produces raster images only |
| **jsPDF + share on Android** | Android browsers lack a convenient "save as PDF" UX in the print dialog |
| **localStorage for auto-save** | No backend — data persists between sessions; restore dialog on return visits |
| **Client-side UUID** | `crypto.randomUUID()` — stable item IDs without a server |
| **Pinia over Vuex** | Native Composition API support, TypeScript-friendly, simpler API |

---

## Roadmap

- [ ] Drag & Drop for reordering resume sections
- [ ] Multi-page PDF support
- [ ] Custom themes (user-defined color schemes)
- [ ] E2E tests (Playwright)
- [ ] PWA mode (offline access)
- [ ] Multiple resumes (switch between them)
- [ ] Resume sharing via link

---

## Authors

**Dmitry Trepachev** & **Roman Serenko**
