import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { usePipelineStore } from '../store/pipelineStore'
import { NodeCard } from './NodeCard'

function Connector() {
  return (
    <div className="flex items-center justify-center h-8 relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/12 -translate-x-1/2" />
      <div className="relative z-10 w-6 h-6 rounded-full bg-white border border-black/15 flex items-center justify-center text-[10px] text-zinc-400 shadow-sm">
        ↓
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center text-3xl opacity-40">
        ◈
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-500">No nodes yet</p>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
          Add cipher nodes from the left panel.<br />
          A minimum of <span className="font-semibold text-zinc-500">3 nodes</span> is required to run the pipeline.
        </p>
      </div>
    </div>
  )
}

export function PipelineCanvas() {
  const { nodes, reorderNodes } = usePipelineStore()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      reorderNodes(active.id as number, over.id as number)
    }
  }

  if (nodes.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      <div className="max-w-[580px] mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={nodes.map(n => n.id)}
            strategy={verticalListSortingStrategy}
          >
            {nodes.map((node, index) => (
              <div key={node.id}>
                {index > 0 && <Connector />}
                <NodeCard node={node} index={index} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
}
