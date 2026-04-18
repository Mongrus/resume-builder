/**
 * 10 IT Resume Themes
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
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '14pt',
      textAlign: 'left'
    },
    photo: {
      width: '70pt',
      height: '70pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2pt solid #4338ca',
      flexShrink: '0'
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
      color: '#475569',
      width: '100%'
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
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '14pt'
    },
    photo: {
      width: '70pt',
      height: '70pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2.5pt solid #0d9488',
      flexShrink: '0'
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
      color: '#475569',
      width: '100%'
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
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '14pt'
    },
    photo: {
      width: '65pt',
      height: '65pt',
      borderRadius: '4pt',
      objectFit: 'cover',
      border: '2pt solid #16a34a',
      flexShrink: '0'
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
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
      width: '100%'
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
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '16pt',
      textAlign: 'left'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '0.5pt solid #d4d4d8',
      flexShrink: '0'
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
      letterSpacing: '0.5px',
      width: '100%'
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
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '16pt',
      textAlign: 'left'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3pt solid #fb923c',
      flexShrink: '0'
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
      color: '#94a3b8',
      width: '100%'
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
  },

  // ─── 6. ROYAL ──────────────────────────────────────────────────
  // Deep purple header, gold accent, elegant serif, luxurious
  royal: {
    id: 'royal',
    preview: { accent: '#d4a017', bg: '#fef9c3' },
    page: {},
    header: {
      background: '#1e1040',
      margin: '-20mm -18mm 18pt -18mm',
      padding: '20mm 18mm 16pt 18mm',
      textAlign: 'center'
    },
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '16pt',
      textAlign: 'left'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3pt solid #d4a017',
      flexShrink: '0'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '700',
      color: '#ffffff',
      margin: '0',
      letterSpacing: '2px',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    title: {
      fontSize: '13pt',
      color: '#d4a017',
      margin: '6pt 0 0 0',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#a5b4fc',
      width: '100%'
    },
    contactSeparator: { color: '#312e81' },
    contactLink: { color: '#d4a017' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '700',
      color: '#1e1040',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      margin: '0 0 8pt 0',
      paddingBottom: '6pt',
      borderBottom: '3pt solid #d4a017',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    sectionMargin: '14pt',
    itemTitle: {
      fontSize: '11pt',
      fontWeight: '700',
      color: '#1e1040',
      fontFamily: "'Georgia', 'Times New Roman', serif"
    },
    itemSubtitle: { fontSize: '10pt', color: '#6b7280', fontWeight: '500' },
    itemDate: {
      fontSize: '9.5pt',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      background: '#1e1040',
      padding: '2pt 8pt',
      borderRadius: '2pt',
      fontWeight: '600'
    },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#1e1040',
      color: '#d4a017',
      fontSize: '9.5pt',
      padding: '4pt 10pt',
      borderRadius: '3pt',
      fontWeight: '600'
    },
    techTag: {
      fontSize: '9pt',
      background: '#fef9c3',
      color: '#92400e',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '1pt solid #fde68a'
    },
    sectionPrefix: ''
  },

  // ─── 7. NOIR ──────────────────────────────────────────────────
  // Dark background, light text, luxury dark-mode resume
  noir: {
    id: 'noir',
    preview: { accent: '#e2e8f0', bg: '#0f172a' },
    page: {
      background: '#0f172a',
      color: '#cbd5e1'
    },
    header: {
      textAlign: 'center',
      marginBottom: '18pt',
      paddingBottom: '14pt',
      borderBottom: '1pt solid #1e293b'
    },
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '14pt',
      textAlign: 'left'
    },
    photo: {
      width: '70pt',
      height: '70pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2pt solid #334155',
      flexShrink: '0'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '300',
      color: '#f1f5f9',
      margin: '0',
      letterSpacing: '4px',
      lineHeight: '1.2',
      textTransform: 'uppercase'
    },
    title: {
      fontSize: '12pt',
      color: '#64748b',
      margin: '8pt 0 0 0',
      fontWeight: '400',
      letterSpacing: '3px',
      textTransform: 'uppercase'
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#64748b',
      width: '100%'
    },
    contactSeparator: { color: '#334155' },
    contactLink: { color: '#94a3b8' },
    sectionTitle: {
      fontSize: '10pt',
      fontWeight: '600',
      color: '#f8fafc',
      textTransform: 'uppercase',
      letterSpacing: '4px',
      margin: '0 0 10pt 0',
      paddingBottom: '6pt',
      borderBottom: '1pt solid #1e293b'
    },
    sectionMargin: '14pt',
    itemTitle: { fontSize: '11pt', fontWeight: '600', color: '#e2e8f0' },
    itemSubtitle: { fontSize: '10pt', color: '#64748b' },
    itemDate: { fontSize: '9.5pt', color: '#475569', whiteSpace: 'nowrap', marginLeft: '8pt' },
    itemDescription: { fontSize: '10pt', lineHeight: '1.6', color: '#94a3b8', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#1e293b',
      color: '#cbd5e1',
      fontSize: '9.5pt',
      padding: '3pt 10pt',
      borderRadius: '3pt',
      fontWeight: '500',
      border: '1pt solid #334155'
    },
    techTag: {
      fontSize: '9pt',
      background: '#1e293b',
      color: '#94a3b8',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '0.5pt solid #334155'
    },
    sectionPrefix: ''
  },

  // ─── 8. OCEAN ──────────────────────────────────────────────────
  // Deep navy header, vivid cyan accent, crisp sans-serif
  ocean: {
    id: 'ocean',
    preview: { accent: '#06b6d4', bg: '#ecfeff' },
    page: {},
    header: {
      background: '#0c1a2e',
      margin: '-20mm -18mm 18pt -18mm',
      padding: '20mm 18mm 16pt 18mm',
      textAlign: 'center'
    },
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '16pt',
      textAlign: 'left'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3pt solid #06b6d4',
      flexShrink: '0'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '900',
      color: '#ffffff',
      margin: '0',
      letterSpacing: '-0.5px',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    title: {
      fontSize: '13pt',
      color: '#22d3ee',
      margin: '6pt 0 0 0',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#94a3b8',
      width: '100%'
    },
    contactSeparator: { color: '#1e3a5f' },
    contactLink: { color: '#22d3ee' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '800',
      color: '#0c1a2e',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 8pt 0',
      paddingBottom: '6pt',
      borderBottom: '3pt solid #06b6d4',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    sectionMargin: '14pt',
    itemTitle: {
      fontSize: '11pt',
      fontWeight: '700',
      color: '#0c1a2e',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    itemSubtitle: { fontSize: '10pt', color: '#64748b', fontWeight: '500' },
    itemDate: {
      fontSize: '9.5pt',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      background: '#06b6d4',
      padding: '2pt 8pt',
      borderRadius: '2pt',
      fontWeight: '600'
    },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#0c1a2e',
      color: '#22d3ee',
      fontSize: '9.5pt',
      padding: '4pt 10pt',
      borderRadius: '3pt',
      fontWeight: '600'
    },
    techTag: {
      fontSize: '9pt',
      background: '#ecfeff',
      color: '#0891b2',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '1pt solid #a5f3fc'
    },
    sectionPrefix: ''
  },

  // ─── 9. CORAL ─────────────────────────────────────────────────
  // Warm coral/peach sidebar accent, split layout feel, friendly & inviting
  coral: {
    id: 'coral',
    preview: { accent: '#f43f5e', bg: '#fff1f2' },
    page: {
      borderTop: '6pt solid #f43f5e'
    },
    header: {
      marginBottom: '18pt',
      paddingBottom: '14pt',
      borderBottom: '2pt solid #fecdd3'
    },
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '14pt'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '12pt',
      objectFit: 'cover',
      border: '2.5pt solid #f43f5e',
      flexShrink: '0'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '800',
      color: '#1c1917',
      margin: '0',
      letterSpacing: '-0.5px',
      lineHeight: '1.15',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    title: {
      fontSize: '13pt',
      color: '#f43f5e',
      margin: '4pt 0 0 0',
      fontWeight: '600',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8pt',
      marginTop: '10pt',
      fontSize: '9.5pt',
      color: '#78716c',
      width: '100%'
    },
    contactSeparator: { color: '#fecdd3' },
    contactLink: { color: '#e11d48' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '800',
      color: '#f43f5e',
      textTransform: 'none',
      letterSpacing: '0.5px',
      margin: '0 0 8pt 0',
      paddingBottom: '4pt',
      paddingLeft: '10pt',
      borderBottom: 'none',
      borderLeft: '4pt solid #f43f5e',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    sectionMargin: '14pt',
    itemTitle: {
      fontSize: '11pt',
      fontWeight: '700',
      color: '#1c1917',
      fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif"
    },
    itemSubtitle: { fontSize: '10pt', color: '#a8a29e', fontWeight: '500' },
    itemDate: {
      fontSize: '9.5pt',
      color: '#f43f5e',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      fontWeight: '600'
    },
    itemDescription: { fontSize: '10pt', lineHeight: '1.55', color: '#57534e', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#fff1f2',
      color: '#e11d48',
      fontSize: '9.5pt',
      padding: '3pt 10pt',
      borderRadius: '6pt',
      fontWeight: '600',
      border: '1pt solid #fecdd3'
    },
    techTag: {
      fontSize: '9pt',
      background: '#fff1f2',
      color: '#f43f5e',
      padding: '2pt 7pt',
      borderRadius: '4pt',
      border: '0.5pt solid #fda4af'
    },
    sectionPrefix: ''
  },

  // ─── 10. FOREST ────────────────────────────────────────────────
  // Dark forest green header, lime/chartreuse accent, natural & fresh
  forest: {
    id: 'forest',
    preview: { accent: '#84cc16', bg: '#f7fee7' },
    page: {},
    header: {
      background: '#14261a',
      margin: '-20mm -18mm 18pt -18mm',
      padding: '20mm 18mm 16pt 18mm',
      textAlign: 'center'
    },
    headerWithPhoto: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '16pt',
      textAlign: 'left'
    },
    photo: {
      width: '72pt',
      height: '72pt',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3pt solid #84cc16',
      flexShrink: '0'
    },
    name: {
      fontSize: '24pt',
      fontWeight: '900',
      color: '#ffffff',
      margin: '0',
      letterSpacing: '0.5px',
      lineHeight: '1.2',
      textTransform: 'uppercase',
      fontFamily: "'Verdana', 'Geneva', sans-serif"
    },
    title: {
      fontSize: '13pt',
      color: '#a3e635',
      margin: '6pt 0 0 0',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontFamily: "'Verdana', 'Geneva', sans-serif"
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8pt',
      marginTop: '12pt',
      fontSize: '9.5pt',
      color: '#94a3b8',
      width: '100%'
    },
    contactSeparator: { color: '#2d4a35' },
    contactLink: { color: '#a3e635' },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: '800',
      color: '#14261a',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      margin: '0 0 8pt 0',
      paddingBottom: '6pt',
      borderBottom: '3pt solid #84cc16',
      fontFamily: "'Verdana', 'Geneva', sans-serif"
    },
    sectionMargin: '14pt',
    itemTitle: {
      fontSize: '11pt',
      fontWeight: '700',
      color: '#14261a',
      fontFamily: "'Verdana', 'Geneva', sans-serif"
    },
    itemSubtitle: { fontSize: '10pt', color: '#64748b', fontWeight: '500' },
    itemDate: {
      fontSize: '9.5pt',
      color: '#ffffff',
      whiteSpace: 'nowrap',
      marginLeft: '8pt',
      background: '#3f6212',
      padding: '2pt 8pt',
      borderRadius: '2pt',
      fontWeight: '600'
    },
    itemDescription: { fontSize: '10pt', lineHeight: '1.5', color: '#475569', margin: '4pt 0 0 0', whiteSpace: 'pre-line' },
    skillTag: {
      display: 'inline-block',
      background: '#14261a',
      color: '#a3e635',
      fontSize: '9.5pt',
      padding: '4pt 10pt',
      borderRadius: '3pt',
      fontWeight: '600'
    },
    techTag: {
      fontSize: '9pt',
      background: '#f7fee7',
      color: '#3f6212',
      padding: '2pt 6pt',
      borderRadius: '2pt',
      border: '1pt solid #bef264'
    },
    sectionPrefix: ''
  }
}

const themeOrder = ['classic', 'modern', 'terminal', 'minimal', 'coral', 'noir', 'bold', 'royal', 'ocean', 'forest']

export const themeList = themeOrder.map(id => ({
  id: themes[id].id,
  accent: themes[id].preview.accent,
  bg: themes[id].preview.bg
}))

export function getTheme(id) {
  return themes[id] || themes.classic
}
