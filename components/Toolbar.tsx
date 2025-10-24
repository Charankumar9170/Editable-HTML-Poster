'use client'
import React, { useRef, useState } from 'react'
import IconButton from './IconButton'
import { useEditorStore } from '../store/editorStore'

export default function Toolbar() {
  const importHtml = useEditorStore(s => s.importHtml)
  const addText = useEditorStore(s => s.addText)
  const addImage = useEditorStore(s => s.addImage)
  const deleteSelected = useEditorStore(s => s.deleteSelected)
  const exportHtml = useEditorStore(s => s.exportHtml)

  // Internal state for raw HTML input mode
  const [showHtmlInput, setShowHtmlInput] = useState(false)
  const [rawHtml, setRawHtml] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || '')
      console.log('✅ HTML file loaded:', text.slice(0, 200))
      importHtml(text)
    }
    reader.readAsText(file)
  }

  // Handle paste mode submission
  const handlePasteImport = () => {
    if (!rawHtml.trim()) {
      alert('Please paste some HTML content first.')
      return
    }
    console.log('✅ Raw HTML pasted:', rawHtml.slice(0, 200))
    importHtml(rawHtml)
    setShowHtmlInput(false)
    setRawHtml('')
  }

  return (
    <div className="flex flex-col gap-3 p-3 border-b bg-white shadow-sm">
      {/* === IMPORT SECTION === */}
      <div className="flex items-center gap-3">
        {/* File upload input */}
        <input
          type="file"
          accept=".html"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* File upload trigger */}
        <IconButton onClick={() => fileInputRef.current?.click()}>
          Upload HTML File
        </IconButton>

        {/* Toggle raw HTML input area */}
        <IconButton onClick={() => setShowHtmlInput(!showHtmlInput)}>
          {showHtmlInput ? 'Cancel Raw Import' : 'Paste Raw HTML'}
        </IconButton>

        {/* Other toolbar actions */}
        <IconButton onClick={() => addText()}>Add Text</IconButton>
        <IconButton onClick={() => addImage()}>Add Image</IconButton>
        <IconButton onClick={() => deleteSelected()}>Delete</IconButton>
        <IconButton onClick={() => exportHtml()}>Export</IconButton>
      </div>

      {/* === RAW HTML INPUT AREA === */}
      {showHtmlInput && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste raw HTML content below:
          </label>
          <textarea
            value={rawHtml}
            onChange={(e) => setRawHtml(e.target.value)}
            placeholder="Paste your HTML markup here..."
            className="w-full h-40 p-2 border rounded font-mono text-sm"
          />
          <div className="mt-2 flex justify-end">
            <IconButton
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={handlePasteImport}
            >
              Import HTML
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
}
