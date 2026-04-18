/**
 * PDF export via browser print dialog.
 *
 * Instead of rasterising the resume with html2canvas (which loses links,
 * mangles small UI elements and cannot do intelligent page breaks), we
 * open the resume HTML in a dedicated print window and let the browser's
 * native renderer handle it.  The result is a vector PDF with:
 *   - clickable links
 *   - sharp text at any zoom
 *   - CSS break-inside:avoid honoured per section
 */

export function downloadPdf(elementRef) {
  const element = elementRef.value || elementRef
  if (!element) return

  // Collect every inline style already on the tree (theme styles).
  // We also need the base .a4-page styles that normally come from the
  // stylesheet — they are applied inline below because the print window
  // has no access to the app's CSS bundle.

  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    alert('Please allow pop-ups for PDF export.')
    return
  }

  // Clone the resume DOM so we don't touch the live page.
  const clone = element.cloneNode(true)

  // Build the print document
  printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Resume</title>
<style>
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
      padding-top: 10mm;      /* top spacing when section lands on a new page */
      margin-top: -10mm;      /* offset so it doesn't add space on page 1 */
    }

    /* Each experience / education / project block stays together */
    section > div {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* If the header is too big, allow a break after it but not inside */
    .a4-page > div:first-child {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /* Hide box-shadow in print (not supported) */
    .a4-page {
      box-shadow: none !important;
    }
  }

  /* ---- Screen preview (the flash before print dialog) ---- */
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
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`)

  printWindow.document.close()

  // Wait for fonts / images, then open print dialog.
  printWindow.onload = () => {
    // Small delay to ensure rendering is finished
    setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      // Close window after print dialog is dismissed
      // Use onafterprint if available, otherwise a fallback timeout
      if ('onafterprint' in printWindow) {
        printWindow.onafterprint = () => printWindow.close()
      }
    }, 300)
  }
}
