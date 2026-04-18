/**
 * 5 IT Resume Themes
 * Each theme returns inline style objects for ResumePreview sections.
 * Inline styles are required for html2canvas PDF compatibility.
 */

export const themes = {
  // ─── 1. CLASSIC ───────────────────────────────────────────────
  // Professional indigo, centered header, clean borders
  classic: {
    id: 'classic',
    preview: { accent: '#4338ca', bg: '#eef2ff' },
    page: {},
    header: {
      textAlign: 'center',
      marginBottom: '18pt',
      paddingBottom: '14pt',
      borderBottom: '2pt solid #4338ca'
    },
    name: {
      fontSize: '22pt',
      fontWeight: '700',
      color: '#1e293b',
      margin: '0',
      letterSpacing: '-0.5px',
      lineHeight: '1.2'
    },
    title: {
      fontSize: '13pt',
      color: '#4338ca',
      margin: '4pt 0 0 0',
      fontWeight: '500'
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '6pt',
      marginTop: '10pt',
      fontSize: '9.5pt',
      color: '#475569'
    },
    contactSeparator: { color: '#cbd5e1' },
    contactLink: { color: '#4338ca' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '700',
      color: '#1e293b',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 8pt 0',
      paddingBottom: '4pt',
      borderBottom: '1pt solid #e2e8f0'
    },
    sectionMargin: '14pt',
    itemTitle: { fontSize: '11pt', fontWeight: '600', color: '#1e293b' },
    itemSubtitle: { fontSize: '10pt', color: '#64748b' },
    itemDate: { fontSize: '9.5pt', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8pt' },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#eef2ff',
      color: '#4338ca',
      fontSize: '9.5pt',
      padding: '3pt 8pt',
      borderRadius: '3pt',
      fontWeight: '500'
    },
    techTag: {
      fontSize: '9pt',
      background: '#f1f5f9',
      color: '#475569',
      padding: '2pt 6pt',
      borderRadius: '2pt'
    },
    sectionPrefix: ''
  },

  // ─── 2. MODERN ────────────────────────────────────────────────
  // Teal/emerald accent, left-aligned, clean modern feel
  modern: {
    id: 'modern',
    preview: { accent: '#0d9488', bg: '#f0fdfa' },
    page: {
      borderLeft: '4pt solid #0d9488'
    },
    header: {
      marginBottom: '18pt',
      paddingBottom: '14pt',
      paddingLeft: '2pt'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '800',
      color: '#0f172a',
      margin: '0',
      letterSpacing: '-1px',
      lineHeight: '1.1'
    },
    title: {
      fontSize: '13pt',
      color: '#0d9488',
      margin: '6pt 0 0 0',
      fontWeight: '500',
      letterSpacing: '0.5px'
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#475569'
    },
    contactSeparator: { color: '#d1d5db' },
    contactLink: { color: '#0d9488' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '700',
      color: '#0d9488',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      margin: '0 0 10pt 0',
      paddingBottom: '6pt',
      borderBottom: '2pt solid #ccfbf1'
    },
    sectionMargin: '14pt',
    itemTitle: { fontSize: '11pt', fontWeight: '700', color: '#0f172a' },
    itemSubtitle: { fontSize: '10pt', color: '#64748b', fontStyle: 'italic' },
    itemDate: { fontSize: '9.5pt', color: '#0d9488', whiteSpace: 'nowrap', marginLeft: '8pt', fontWeight: '500' },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#f0fdfa',
      color: '#0d9488',
      fontSize: '9.5pt',
      padding: '3pt 10pt',
      borderRadius: '12pt',
      fontWeight: '500',
      border: '1pt solid #99f6e4'
    },
    techTag: {
      fontSize: '9pt',
      background: '#f0fdfa',
      color: '#0d9488',
      padding: '2pt 6pt',
      borderRadius: '8pt',
      border: '0.5pt solid #99f6e4'
    },
    sectionPrefix: ''
  },

  // ─── 3. TERMINAL ──────────────────────────────────────────────
  // Monospace, green on white, code/hacker aesthetic
  terminal: {
    id: 'terminal',
    preview: { accent: '#16a34a', bg: '#f0fdf4' },
    page: {
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    header: {
      marginBottom: '18pt',
      paddingBottom: '14pt',
      borderBottom: '1pt dashed #86efac'
    },
    name: {
      fontSize: '20pt',
      fontWeight: '700',
      color: '#14532d',
      margin: '0',
      lineHeight: '1.2',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    title: {
      fontSize: '12pt',
      color: '#16a34a',
      margin: '6pt 0 0 0',
      fontWeight: '500',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6pt',
      marginTop: '10pt',
      fontSize: '9pt',
      color: '#475569',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    contactSeparator: { color: '#86efac' },
    contactLink: { color: '#16a34a' },
    sectionTitle: {
      fontSize: '11.5pt',
      fontWeight: '700',
      color: '#14532d',
      textTransform: 'none',
      letterSpacing: '0',
      margin: '0 0 8pt 0',
      paddingBottom: '4pt',
      borderBottom: '1pt dashed #bbf7d0',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    sectionMargin: '14pt',
    itemTitle: {
      fontSize: '10.5pt',
      fontWeight: '700',
      color: '#14532d',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    itemSubtitle: {
      fontSize: '9.5pt',
      color: '#16a34a',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    itemDate: {
      fontSize: '9pt',
      color: '#86efac',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      background: '#14532d',
      padding: '2pt 6pt',
      borderRadius: '2pt'
    },
    itemDescription: {
      fontSize: '9.5pt',
      lineHeight: '1.6',
      color: '#334155',
      margin: '4pt 0 0 0',
      whiteSpace: 'pre-line',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    skillTag: {
      display: 'inline-block',
      background: '#14532d',
      color: '#4ade80',
      fontSize: '9pt',
      padding: '3pt 8pt',
      borderRadius: '2pt',
      fontWeight: '500',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    techTag: {
      fontSize: '8.5pt',
      background: '#f0fdf4',
      color: '#16a34a',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '1pt solid #bbf7d0',
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace"
    },
    sectionPrefix: '> '
  },

  // ─── 4. MINIMAL ───────────────────────────────────────────────
  // Black & white, serif headings, maximum whitespace, elegant
  minimal: {
    id: 'minimal',
    preview: { accent: '#18181b', bg: '#fafafa' },
    page: {},
    header: {
      textAlign: 'center',
      marginBottom: '24pt',
      paddingBottom: '16pt',
      borderBottom: '0.5pt solid #d4d4d8'
    },
    name: {
      fontSize: '26pt',
      fontWeight: '300',
      color: '#18181b',
      margin: '0',
      letterSpacing: '3px',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    title: {
      fontSize: '12pt',
      color: '#71717a',
      margin: '8pt 0 0 0',
      fontWeight: '400',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#71717a',
      letterSpacing: '0.5px'
    },
    contactSeparator: { color: '#d4d4d8' },
    contactLink: { color: '#18181b' },
    sectionTitle: {
      fontSize: '11pt',
      fontWeight: '400',
      color: '#18181b',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      margin: '0 0 12pt 0',
      paddingBottom: '6pt',
      borderBottom: '0.5pt solid #e4e4e7',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    sectionMargin: '16pt',
    itemTitle: {
      fontSize: '11pt',
      fontWeight: '600',
      color: '#18181b'
    },
    itemSubtitle: { fontSize: '10pt', color: '#a1a1aa' },
    itemDate: { fontSize: '9.5pt', color: '#a1a1aa', whiteSpace: 'nowrap', marginLeft: '8pt' },
    itemDescription: { fontSize: '10pt', lineHeight: '1.6', color: '#52525b', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: 'transparent',
      color: '#18181b',
      fontSize: '9.5pt',
      padding: '3pt 10pt',
      borderRadius: '0',
      fontWeight: '400',
      border: '0.5pt solid #d4d4d8'
    },
    techTag: {
      fontSize: '9pt',
      background: 'transparent',
      color: '#71717a',
      padding: '2pt 6pt',
      borderRadius: '0',
      border: '0.5pt solid #e4e4e7'
    },
    sectionPrefix: ''
  },

  // ─── 5. BOLD ──────────────────────────────────────────────────
  // Dark header block, orange accent, strong contrast, impactful
  bold: {
    id: 'bold',
    preview: { accent: '#ea580c', bg: '#fff7ed' },
    page: {},
    header: {
      background: '#0f172a',
      margin: '-20mm -18mm 18pt -18mm',
      padding: '20mm 18mm 16pt 18mm',
      textAlign: 'center'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '900',
      color: '#ffffff',
      margin: '0',
      letterSpacing: '-0.5px',
      lineHeight: '1.2',
      textTransform: 'uppercase'
    },
    title: {
      fontSize: '13pt',
      color: '#fb923c',
      margin: '6pt 0 0 0',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#94a3b8'
    },
    contactSeparator: { color: '#334155' },
    contactLink: { color: '#fb923c' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '800',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 8pt 0',
      paddingBottom: '6pt',
      borderBottom: '3pt solid #ea580c'
    },
    sectionMargin: '14pt',
    itemTitle: { fontSize: '11pt', fontWeight: '700', color: '#0f172a' },
    itemSubtitle: { fontSize: '10pt', color: '#64748b', fontWeight: '500' },
    itemDate: {
      fontSize: '9.5pt',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      background: '#ea580c',
      padding: '2pt 8pt',
      borderRadius: '2pt',
      fontWeight: '600'
    },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#0f172a',
      color: '#fb923c',
      fontSize: '9.5pt',
      padding: '4pt 10pt',
      borderRadius: '3pt',
      fontWeight: '600'
    },
    techTag: {
      fontSize: '9pt',
      background: '#fff7ed',
      color: '#ea580c',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '1pt solid #fed7aa'
    },
    sectionPrefix: ''
  }
}

export const themeList = Object.values(themes).map(t => ({
  id: t.id,
  accent: t.preview.accent,
  bg: t.preview.bg
}))

export function getTheme(id) {
  return themes[id] || themes.classic
}
