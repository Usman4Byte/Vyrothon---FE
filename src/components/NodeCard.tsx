import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { usePipelineStore } from '../store/pipelineStore'
import { cipherRegistry } from '../ciphers'
import type { PipelineNode } from '../types'

const colorMap: Record<string, string> = {
  'cipher-caesar': 'bg-amber-100',
  'cipher-xor': 'bg-violet-100',
  'cipher-vigenere': 'bg-emerald-100',
  'cipher-base64': 'bg-sky-100',
  'cipher-reverse': 'bg-pink-100',
  'cipher-railfence': 'bg-teal-100',
}

function truncate(text: string, max = 48): string {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}

interface NodeCardProps {
  node: PipelineNode
  index: number
}

export function NodeCard({ node, index }: NodeCardProps) {
  const { removeNode, updateNodeConfig, intermediates } = usePipelineStore()
  const cipher = cipherRegistry[node.cipherId]
  const inter = intermediates[node.id]

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: node.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (!cipher) return null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-2xl border transition-all ${
        isDragging
          ? 'opacity-40 border-blue-400 shadow-lg'
          : 'border-black/12 hover:border-black/20 hover:shadow-md shadow-sm'
      }`}
    >
      {/* Header */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center gap-2.5 px-3.5 py-3 border-b border-black/8 bg-zinc-50/80 rounded-t-2xl cursor-grab active:cursor-grabbing select-none"
      >
        {/* Index badge */}
        <div className="w-[22px] h-[22px] bg-zinc-900 rounded-md flex items-center justify-center text-white text-[10px] font-bold font-mono flex-shrink-0">
          {index + 1}
        </div>

        {/* Icon */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
            colorMap[cipher.colorClass] ?? 'bg-zinc-100'
          }`}
        >
          {cipher.icon}
        </div>

        <span className="text-[13px] font-semibold flex-1">{cipher.name}</span>

        {/* Short badge */}
        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-black/12 text-zinc-500 uppercase tracking-wider">
          {cipher.short}
        </span>

        {/* Drag handle hint */}
        <span className="text-zinc-300 text-xs select-none">⠿</span>

        {/* Remove */}
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={() => removeNode(node.id)}
          className="w-[22px] h-[22px] rounded-md flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm"
          title="Remove node"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="p-3.5">
        {/* Config fields */}
        {cipher.configSchema.length > 0 && (
          <div className="space-y-2 mb-3">
            {cipher.configSchema.map(field => (
              <div key={field.key} className="flex items-center gap-3">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 w-14 flex-shrink-0">
                  {field.label}
                </label>
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  value={String(node.config[field.key] ?? '')}
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                  onChange={e => updateNodeConfig(node.id, field.key, e.target.value)}
                  className="font-mono text-[12px] px-2.5 py-1.5 rounded-lg border border-black/15 bg-zinc-50 text-zinc-800 w-24 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                />
              </div>
            ))}
          </div>
        )}

        {/* I/O Preview */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2.5 bg-zinc-50 border border-black/8">
            <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1">
              <span className="text-zinc-300">▸</span> In
            </div>
            <div className="font-mono text-[10px] text-zinc-600 break-all leading-relaxed min-h-[14px]">
              {inter ? truncate(inter.input) : <span className="text-zinc-300 italic">—</span>}
            </div>
          </div>
          <div className="rounded-xl p-2.5 bg-emerald-50/60 border border-emerald-100">
            <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-500 mb-1.5 flex items-center gap-1">
              <span className="text-emerald-300">▸</span> Out
            </div>
            <div className="font-mono text-[10px] text-zinc-700 break-all leading-relaxed min-h-[14px]">
              {inter ? truncate(inter.output) : <span className="text-zinc-300 italic">—</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
