import React, { useEffect, useState } from 'react'
import { useEditorStore } from '../store/editorStore'

export default function PropertiesPanel() {
  const selectedId = useEditorStore(s => s.selectedId)
  const stageRef = useEditorStore(s => s.stageRef)

  const [local, setLocal] = useState({ text: '', tag: '', src: '', alt: '' })

  useEffect(() => {
    if (!selectedId || !stageRef) return
    const el = stageRef.querySelector(`[data-id="${selectedId}"]`) as HTMLElement | null
    if (!el) return
    setLocal({ text: el.innerText || '', tag: el.tagName, src: (el as HTMLImageElement).src || '', alt: (el as HTMLImageElement).alt || '' })
  }, [selectedId, stageRef])

  if (!selectedId) return (
    <div className="p-4">No selection</div>
  )

  const saveText = () => {
    if (!stageRef) return
    const el = stageRef.querySelector(`[data-id="${selectedId}"]`) as HTMLElement | null
    if (!el) return
    el.innerText = local.text
  }

  const onChangeImageSrc = (value: string) => {
    if (!stageRef) return
    const el = stageRef.querySelector(`[data-id="${selectedId}"]`) as HTMLImageElement | null
    if (!el) return
    el.src = value
    setLocal(l => ({ ...l, src: value }))
  }

  const onUploadImage = (file?: File) => {
    if (!file || !stageRef) return
    const reader = new FileReader()
    reader.onload = () => {
      const url = String(reader.result)
      onChangeImageSrc(url)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="p-4 space-y-3 border-l">
      <div>Selected: <strong>{selectedId}</strong></div>
      <div>Tag: {local.tag}</div>

      {local.tag === 'IMG' && (
        <div className="space-y-2">
          <label className="block text-sm">Image URL</label>
          <input className="w-full p-1 border" value={local.src} onChange={(e) => setLocal(l => ({ ...l, src: e.target.value }))} />
          <button className="p-2 rounded bg-slate-100" onClick={() => onChangeImageSrc(local.src)}>Apply</button>
          <div className="pt-2">
            <label className="block text-sm">Upload</label>
            <input type="file" accept="image/*" onChange={(e) => onUploadImage(e.target.files?.[0])} />
          </div>
        </div>
      )}

      {(local.tag === 'P' || local.tag?.startsWith('H')) && (
        <div className="space-y-2">
          <label className="block text-sm">Text</label>
          <textarea className="w-full p-1 border" value={local.text} onChange={(e) => setLocal(l => ({ ...l, text: e.target.value }))} />
          <button className="p-2 rounded bg-slate-100" onClick={saveText}>Apply</button>
        </div>
      )}

    </div>
  )
}