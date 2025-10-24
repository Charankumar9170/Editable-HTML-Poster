# Editable HTML Poster

Minimal Next.js + TypeScript implementation of the frontend engineer assignment: an editable 720x720 canvas that imports, edits, and exports HTML.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features implemented
- HTML import (file or paste via programmatic function)
- Sanitization with DOMPurify
- 720×720 stage for visual editing
- Click/select elements (single-select)
- Inline text editing and properties panel
- Add text/image, delete, export
- Export downloads `.html` with `data-generated-by` meta tag

## Known limitations
- Drag repositioning and snapping are minimal (you can expand using react-draggable for per-element handles)
- Undo/redo not implemented
- Advanced CSS isolation could use an iframe (tradeoff: editing cross-frame is more complex)

## Further improvements
- Implement keyboard shortcuts, undo/redo stack, grouping, and element tree
- Use `dnd-kit` or `react-draggable` for better dragging and positioning
- Add copy/paste and multi-select