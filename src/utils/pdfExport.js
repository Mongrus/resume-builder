import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function downloadPdf(elementRef) {
  try {
    const element = elementRef.value || elementRef
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true
    })

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const ratio = canvasWidth / canvasHeight
    const imgHeight = pdfWidth / ratio
    const imgData = canvas.toDataURL('image/png')

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
    heightLeft -= pdfHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight)
      heightLeft -= pdfHeight
    }

    pdf.save('resume.pdf')
  } catch (error) {
    console.error('PDF export failed:', error)
    alert('Failed to export PDF. Check console for details.')
  }
}
