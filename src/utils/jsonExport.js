export function downloadJson(resumeData) {
  try {
    const json = JSON.stringify(resumeData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    triggerDownload(url)
  } catch (error) {
    console.error('JSON export failed:', error)
    alert('Failed to export JSON. Check console for details.')
  }
}

function triggerDownload(url) {
  const link = document.createElement('a')
  link.href = url
  link.download = 'resume.json'
  link.style.display = 'none'
  document.body.appendChild(link)
  // Use setTimeout for Safari/iOS compatibility
  setTimeout(() => {
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
  }, 0)
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
