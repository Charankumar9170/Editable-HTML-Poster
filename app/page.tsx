'use client'
import React from 'react' // 👈 add this line
import Toolbar from '../components/Toolbar'
import CanvasStage from '../components/CanvasStage'
import PropertiesPanel from '../components/PropertiesPanel'

export default function Page() {
  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Editable HTML Poster</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <Toolbar />
          <CanvasStage />
        </div>
        <aside className="w-[320px] border rounded">
          <PropertiesPanel />
        </aside>
      </div>
    </div>
  )
}
