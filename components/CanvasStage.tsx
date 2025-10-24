import React, { useEffect, useRef } from 'react'
import { useEditorStore } from '../store/editorStore'
import { generateUniqueId } from '../lib/htmlParser'
import Draggable from 'react-draggable'

export default function CanvasStage() {
  const rawHtml = useEditorStore(s => s.rawHtml)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const setStageRef = useEditorStore(s => s.setStageRef)
  const selectedId = useEditorStore(s => s.selectedId)
  const setSelectedId = useEditorStore(s => s.setSelectedId)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    setStageRef(el)
  }, [setStageRef])

  // When rawHtml changes, render sanitized HTML into the stage
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    stage.innerHTML = ''
    if (!rawHtml) {
      // initial empty poster container
      const container = document.createElement('div')
      container.className = 'poster'
      container.style.width = '720px'
      container.style.height = '720px'
      container.style.position = 'relative'
      container.style.background = '#f3f4f6'
      stage.appendChild(container)
      return
    }

    // Parse the HTML and transplant the poster node if present, else inject body
    const parser = new DOMParser()
    const doc = parser.parseFromString(rawHtml, 'text/html')
    const poster = doc.querySelector('.poster') || doc.body
    // Assign data-id to elements missing one (so we can select them)
    const assignIds = (node: Element) => {
      if (node.nodeType !== 1) return
      const el = node as HTMLElement
      if (!el.hasAttribute('data-id')) {
        el.setAttribute('data-id', generateUniqueId('el'))
      }
      Array.from(el.children).forEach(assignIds)
    }
    assignIds(poster as Element)

    // Insert the poster into stage and preserve styles from <style> in head
    // Copy styles
    const styleNodes = doc.querySelectorAll('style')
    styleNodes.forEach(s => {
      const copy = document.createElement('style')
      copy.textContent = s.textContent
      stage.appendChild(copy)
    })

    // Append poster
    stage.appendChild(poster.cloneNode(true))

    // Click handling inside stage
    const onClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement
      // find nearest element with data-id inside stage
      const el = target.closest('[data-id]') as HTMLElement | null
      if (el && stage.contains(el)) {
        const id = el.getAttribute('data-id')
        setSelectedId(id)
        ev.stopPropagation()
      } else {
        setSelectedId(null)
      }
    }

    stage.addEventListener('click', onClick)

    return () => {
      stage.removeEventListener('click', onClick)
    }
  }, [rawHtml, setSelectedId])

  // Highlight selected element via mutation observer or effect
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    // remove existing outlines
    stage.querySelectorAll('.selected-outline').forEach(el => el.classList.remove('selected-outline'))
    if (!selectedId) return
    const el = stage.querySelector(`[data-id="${selectedId}"]`) as HTMLElement | null
    if (el) el.classList.add('selected-outline')
  }, [selectedId])

  return (
    <div className="p-4">
      <div style={{ width: 720, height: 720 }} className="stage-root overflow-hidden relative" ref={stageRef} />
    </div>
  )
}