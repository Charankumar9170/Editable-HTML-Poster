export function exportStageHtml(stageEl: HTMLElement | null) {
    if (!stageEl) return
    // Clone the stage to avoid modifying live DOM
    const clone = stageEl.cloneNode(true) as HTMLElement
    // Add the meta tag
    const meta = document.createElement('meta')
    meta.setAttribute('data-generated-by', 'editable-html-poster')
    // Build a minimal HTML
    const doc = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Exported Poster</title>\n` + meta.outerHTML + `\n</head>\n<body>\n${clone.outerHTML}\n</body>\n</html>`
  
    const blob = new Blob([doc], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'poster.html'
    a.click()
    URL.revokeObjectURL(url)
  }