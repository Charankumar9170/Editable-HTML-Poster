import DOMPurify from 'dompurify'

export function sanitizeHtml(raw: string) {

  return DOMPurify.sanitize(raw, { ADD_ATTR: ['data-id'] })
}

export function generateUniqueId(prefix = 'el') {
  return `${prefix}_${Math.random().toString(36).slice(2,9)}`
}
