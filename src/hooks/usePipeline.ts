import { useCallback } from 'react'
import { usePipelineStore } from '../store/pipelineStore'
import type { PipelineExport } from '../types'

export function usePipeline() {
  const store = usePipelineStore()

  const exportToJson = useCallback((): string => {
    return JSON.stringify(store.exportPipeline(), null, 2)
  }, [store])

  const importFromJson = useCallback(
    (json: string): { success: boolean; error?: string } => {
      try {
        const data: PipelineExport = JSON.parse(json)
        if (!data.nodes || !Array.isArray(data.nodes)) {
          return { success: false, error: 'Invalid pipeline format' }
        }
        store.importPipeline(data)
        return { success: true }
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Parse error',
        }
      }
    },
    [store]
  )

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [])

  return {
    ...store,
    exportToJson,
    importFromJson,
    copyToClipboard,
    isReady: store.nodes.length >= 3,
    nodeCount: store.nodes.length,
    nodesNeeded: Math.max(0, 3 - store.nodes.length),
  }
}
