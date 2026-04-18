/**
 * PDF export.
 *
 * Desktop / iOS: browser print dialog (vector PDF, clickable links, sharp text).
 * Android: html2canvas + jsPDF → real PDF file shared via navigator.share
 *   (Android's print dialog doesn't offer an obvious "save as PDF" UX).
 */

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const printStyles = `
  /* ---- Reset ---- */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  /* ---- Base page (mirrors .a4-page from style.css) ---- */
  .a4-page {
    width: 210mm;
    min-height: 297mm;
    padding: 20mm 18mm;
    background: white;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    line-height: 1.5;
    font-size: 10pt;
    box-sizing: border-box;
  }

  /* ---- Print-specific ---- */
  @media print {
    @page {
      size: A4;
      margin: 0;
    }

    html, body {
      width: 210mm;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Prevent sections from being ripped across pages */
    section {
      break-inside: avoid;
      page-break-inside: avoid;
      padding-top: 10mm;
      margin-top: -10mm;
    }

    /* Each experience / education / project block stays together */
    section > div {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .a4-page > div:first-child {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .a4-page {
      box-shadow: none !important;
    }
  }

  /* ---- Screen preview ---- */
  @media screen {
    body {
      display: flex;
      justify-content: center;
      background: #e2e8f0;
      padding: 20px;
    }
    .a4-page {
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }
  }

  /* ---- Links ---- */
  a { color: inherit; text-decoration: none; }
`

function buildPrintHTML(clone) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resume</title>
<style>${printStyles}</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && window.innerWidth < 1024)
}

export async function downloadPdf(elementRef) {
  const element = elementRef.value || elementRef
  if (!element) return

  if (isAndroid()) {
    await exportPdfAndroid(element)
  } else {
    const clone = element.cloneNode(true)
    const html = buildPrintHTML(clone)

    if (isMobile()) {
      printViaIframe(html)
    } else {
      printViaWindow(html)
    }
  }
}

async function exportPdfAndroid(element) {
  const A4_WIDTH_MM = 210
  const A4_HEIGHT_MM = 297
  const SCALE = 2

  const canvas = await html2canvas(element, {
    scale: SCALE,
    useCORS: true,
    backgroundColor: '#ffffff',
  })

  const imgData = canvas.toDataURL('image/jpeg', 0.95)
  const pdf = new jsPDF('p', 'mm', 'a4')

  const pdfWidth = A4_WIDTH_MM
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  let heightLeft = pdfHeight
  let position = 0

  pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight)
  heightLeft -= A4_HEIGHT_MM

  while (heightLeft > 0) {
    position -= A4_HEIGHT_MM
    pdf.addPage()
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight)
    heightLeft -= A4_HEIGHT_MM
  }

  const pdfBlob = pdf.output('blob')

  if (navigator.share && navigator.canShare) {
    const file = new File([pdfBlob], 'resume.pdf', { type: 'application/pdf' })
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Resume' })
      } catch {
        // User cancelled — do nothing
      }
      return
    }
  }

  // Fallback: direct download
  const url = URL.createObjectURL(pdfBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 100)
}

function printViaWindow(html) {
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    // Fallback to iframe if popup is blocked
    printViaIframe(html)
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      if ('onafterprint' in printWindow) {
        printWindow.onafterprint = () => printWindow.close()
      }
    }, 300)
  }
}

function printViaIframe(html) {
  const iframe = document.createElement('iframe')
  iframe.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;z-index:99999;background:white;'
  document.body.appendChild(iframe)

  const doc = iframe.contentDocument || iframe.contentWindow.document
  doc.open()
  doc.write(html)
  doc.close()

  iframe.contentWindow.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus()
      iframe.contentWindow.print()

      // Remove iframe after print dialog closes
      const cleanup = () => {
        document.body.removeChild(iframe)
      }

      if ('onafterprint' in iframe.contentWindow) {
        iframe.contentWindow.onafterprint = cleanup
      } else {
        // Fallback: remove after a delay
        setTimeout(cleanup, 1000)
      }
    }, 500)
  }
}
