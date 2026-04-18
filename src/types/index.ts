// ─── Core Types ───────────────────────────────────────────────

export type Mode = 'encrypt' | 'decrypt'

export type ConfigFieldType = 'number' | 'text'

export interface ConfigField {
  key: string
  label: string
  type: ConfigFieldType
  min?: number
  max?: number
  placeholder?: string
}

export type CipherConfig = Record<string, string | number>

export interface CipherDefinition {
  id: string
  name: string
  short: string
  description: string
  icon: string
  colorClass: string
  defaultConfig: CipherConfig
  configSchema: ConfigField[]
  encrypt: (text: string, config: CipherConfig) => string
  decrypt: (text: string, config: CipherConfig) => string
}

export interface PipelineNode {
  id: number
  cipherId: string
  config: CipherConfig
}

export interface NodeIntermediate {
  input: string
  output: string
}

export interface PipelineExport {
  version: string
  mode: Mode
  nodes: Array<{ cipherId: string; config: CipherConfig }>
}
