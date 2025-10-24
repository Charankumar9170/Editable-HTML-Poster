export function exportStageHtml(stageEl: HTMLElement | null) {
    if (!stageEl) return

    const clone = stageEl.cloneNode(true) as HTMLElement

    const meta = document.createElement('meta')
    meta.setAttribute('data-generated-by', 'editable-html-poster')

    const doc = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Exported Poster</title>\n` + meta.outerHTML + `\n</head>\n<body>\n${clone.outerHTML}\n</body>\n</html>`
  
    const blob = new Blob([doc], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'poster.html'
    a.click()
    URL.revokeObjectURL(url)
  }
