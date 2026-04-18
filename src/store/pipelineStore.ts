import { create } from 'zustand'
import type { PipelineNode, Mode, NodeIntermediate, CipherConfig, PipelineExport } from '../types'
import { cipherRegistry } from '../ciphers'

let nextId = 1

interface PipelineState {
  nodes: PipelineNode[]
  mode: Mode
  inputText: string
  outputText: string
  intermediates: Record<number, NodeIntermediate>
  error: string | null

  // Actions
  addNode: (cipherId: string) => void
  removeNode: (id: number) => void
  updateNodeConfig: (id: number, key: string, value: string | number) => void
  reorderNodes: (fromId: number, toId: number) => void
  setMode: (mode: Mode) => void
  setInputText: (text: string) => void
  runPipeline: () => void
  clearAll: () => void
  exportPipeline: () => PipelineExport
  importPipeline: (data: PipelineExport) => void
}

export const usePipelineStore = create<PipelineState>((set, get) => ({
  nodes: [],
  mode: 'encrypt',
  inputText: '',
  outputText: '',
  intermediates: {},
  error: null,

  addNode(cipherId) {
    const cipher = cipherRegistry[cipherId]
    if (!cipher) return
    const node: PipelineNode = {
      id: nextId++,
      cipherId,
      config: { ...cipher.defaultConfig },
    }
    set(s => ({ nodes: [...s.nodes, node] }))
    get().runPipeline()
  },

  removeNode(id) {
    set(s => ({ nodes: s.nodes.filter(n => n.id !== id) }))
    get().runPipeline()
  },

  updateNodeConfig(id, key, value) {
    set(s => ({
      nodes: s.nodes.map(n =>
        n.id === id ? { ...n, config: { ...n.config, [key]: value } } : n
      ),
    }))
    get().runPipeline()
  },

  reorderNodes(fromId, toId) {
    const nodes = [...get().nodes]
    const fromIdx = nodes.findIndex(n => n.id === fromId)
    const toIdx = nodes.findIndex(n => n.id === toId)
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return
    const [node] = nodes.splice(fromIdx, 1)
    nodes.splice(toIdx, 0, node)
    set({ nodes })
    get().runPipeline()
  },

  setMode(mode) {
    set({ mode })
    get().runPipeline()
  },

  setInputText(text) {
    set({ inputText: text })
    get().runPipeline()
  },

  runPipeline() {
    const { nodes, mode, inputText } = get()
    if (nodes.length < 3) {
      set({ intermediates: {}, outputText: '', error: null })
      return
    }
    if (!inputText) {
      set({ intermediates: {}, outputText: '', error: null })
      return
    }

    const ordered = mode === 'decrypt' ? [...nodes].reverse() : nodes
    let current = inputText
    const intermediates: Record<number, NodeIntermediate> = {}

    try {
      for (const node of ordered) {
        const cipher = cipherRegistry[node.cipherId]
        if (!cipher) throw new Error(`Unknown cipher: ${node.cipherId}`)
        const nodeInput = current
        current =
          mode === 'encrypt'
            ? cipher.encrypt(current, node.config)
            : cipher.decrypt(current, node.config)
        intermediates[node.id] = { input: nodeInput, output: current }
      }
      set({ intermediates, outputText: current, error: null })
    } catch (err) {
      set({
        intermediates,
        outputText: '',
        error: err instanceof Error ? err.message : 'Pipeline error',
      })
    }
  },

  clearAll() {
    set({
      nodes: [],
      inputText: '',
      outputText: '',
      intermediates: {},
      error: null,
    })
  },

  exportPipeline(): PipelineExport {
    const { nodes, mode } = get()
    return {
      version: '1.0',
      mode,
      nodes: nodes.map(n => ({ cipherId: n.cipherId, config: n.config })),
    }
  },

  importPipeline(data: PipelineExport) {
    const nodes: PipelineNode[] = data.nodes.map(n => ({
      id: nextId++,
      cipherId: n.cipherId,
      config: n.config as CipherConfig,
    }))
    set({ nodes, mode: data.mode ?? 'encrypt' })
    get().runPipeline()
  },
}))
