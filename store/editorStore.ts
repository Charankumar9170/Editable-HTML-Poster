import create from 'zustand'
import { sanitizeHtml, generateUniqueId } from '../lib/htmlParser'
import { exportStageHtml } from '../lib/exportHTML'

type Store = {
  rawHtml: string
  setRawHtml: (html: string) => void
  stageRef: HTMLElement | null
  setStageRef: (el: HTMLElement | null) => void
  importHtml: (raw: string) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  addText: () => void
  addImage: () => void
  deleteSelected: () => void
  exportHtml: () => void
}

export const useEditorStore = create<Store>((set, get) => ({
  rawHtml: '',
  setRawHtml(html) { set({ rawHtml: html }) },
  stageRef: null,
  setStageRef(el) { set({ stageRef: el }) },
  importHtml(raw) {
    const clean = sanitizeHtml(raw)
    set({ rawHtml: clean })
    // When rawHtml changes, CanvasStage will render it
  },
  selectedId: null,
  setSelectedId(id) { set({ selectedId: id }) },
  addText() {
    const id = generateUniqueId('text')
    const stage = get().stageRef
    if (!stage) return
    const p = document.createElement('p')
    p.textContent = 'New text'
    p.setAttribute('data-id', id)
    p.style.position = 'absolute'
    p.style.left = '20px'
    p.style.top = '20px'
    p.contentEditable = 'true'
    stage.appendChild(p)
    set({ selectedId: id })
  },
  addImage() {
    const id = generateUniqueId('img')
    const stage = get().stageRef
    if (!stage) return
    const img = document.createElement('img')
    img.src = '/placeholder.png'
    img.alt = 'placeholder'
    img.setAttribute('data-id', id)
    img.style.position = 'absolute'
    img.style.left = '40px'
    img.style.top = '40px'
    img.style.width = '200px'
    img.style.height = '200px'
    stage.appendChild(img)
    set({ selectedId: id })
  },
  deleteSelected() {
    const stage = get().stageRef
    const id = get().selectedId
    if (!stage || !id) return
    const el = stage.querySelector(`[data-id="${id}"]`)
    if (el) el.remove()
    set({ selectedId: null })
  },
  exportHtml() {
    const stage = get().stageRef
    exportStageHtml(stage)
  }
}))