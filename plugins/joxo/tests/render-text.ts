/**
 * Draws a returned element tree (what `ui.drawn()` hands back) as plain text, the way a terminal
 * would lay it out, closely enough to read and to keep as a capture. Layout only: no color.
 */
type Node = { type: string; props?: Record<string, unknown>; children?: (Node | string | null)[] }

const num = (value: unknown): number => (typeof value === 'number' ? value : 0)
// oxlint-disable-next-line typescript/no-misused-spread -- Counts code points on purpose.
const width = (lines: string[]): number => lines.reduce((max, line) => Math.max(max, [...line].length), 0)
// oxlint-disable-next-line typescript/no-misused-spread -- Counts code points on purpose.
const pad = (line: string, to: number): string => line + ' '.repeat(Math.max(0, to - [...line].length))

function side(blocks: string[][], gap: number): string[] {
  const height = Math.max(0, ...blocks.map(b => b.length))
  const widths = blocks.map(width)
  return Array.from({ length: height }, (_, row) => blocks.map((b, i) => pad(b[row] ?? '', widths[i] ?? 0)).join(' '.repeat(gap)).trimEnd())
}

export function linesOf(node: Node | string | null | undefined): string[] {
  if (node === null || node === undefined) return []
  if (typeof node === 'string') return [node]
  const kids = (node.children ?? []).flatMap(child => (Array.isArray(child) ? child : [child]))
  const p = node.props ?? {}
  switch (node.type) {
    case 'Text': return [kids.map(k => (typeof k === 'string' ? k : '')).join('')]
    case 'Button': return [p.plain === true ? `${typeof p.hotkey === 'string' ? `${p.hotkey}: ` : ''}${String(p.label)}` : `[ ${String(p.label)} ]`]
    case 'Svg': return [`(${/>([A-Za-z0-9·]{1,2})<\/text>/.exec(String(p.source))?.[1] ?? '?'})`]
    case 'Box': {
      const blocks = kids.map(k => linesOf(k as Node | string | null)).filter(b => b.length)
      const row = p.flexDirection === 'row'
      let out = row ? side(blocks, num(p.columnGap ?? p.gap) || 0) : blocks.flat()
      if (row && num(p.columnGap ?? p.gap) === 0) out = side(blocks, 0)
      const left = ' '.repeat(num(p.paddingLeft) + num(p.paddingX))
      out = out.map(line => (line ? left + line : line))
      return [...Array.from({ length: num(p.marginTop) }, () => ''), ...out]
    }
    default: return [`<${node.type}>`]
  }
}

export const textOf = (node: Node | string | null | undefined): string => linesOf(node).join('\n')

/** All Text strings and Button labels in a tree: what a person could read. */
export function words(node: Node | string | null | undefined): string[] {
  if (node === null || node === undefined) return []
  if (typeof node === 'string') return [node]
  const own = node.type === 'Button' ? [String(node.props?.label)] : []
  return [...own, ...(node.children ?? []).flatMap(child => (Array.isArray(child) ? child : [child]).flatMap(c => words(c as Node | string | null)))]
}
