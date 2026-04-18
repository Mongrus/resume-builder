export function downloadJson(resumeData) {
  try {
    const json = JSON.stringify(resumeData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('JSON export failed:', error)
    alert('Failed to export JSON. Check console for details.')
  }
}

export function importJson(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected'))
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result)
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid JSON file: ' + error.message))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}
