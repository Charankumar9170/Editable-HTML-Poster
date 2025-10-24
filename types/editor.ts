export type ElementType = 'text' | 'image' | 'other'

export interface SelectedElementInfo {
  id: string | null
  type?: ElementType
  tagName?: string
  rect?: { x: number; y: number; width: number; height: number }
}