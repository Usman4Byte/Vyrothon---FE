import type { CipherDefinition, CipherConfig } from '../types'

// ─── Base64 ───────────────────────────────────────────────────

export const base64Cipher: CipherDefinition = {
  id: 'base64',
  name: 'Base64',
  short: 'B64',
  description: 'Standard encoding layer',
  icon: '▦',
  colorClass: 'cipher-base64',
  defaultConfig: {},
  configSchema: [],
  encrypt(text: string): string {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch {
      return btoa(text)
    }
  },
  decrypt(text: string): string {
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch {
      return text
    }
  },
}

// ─── Reverse ─────────────────────────────────────────────────

export const reverseCipher: CipherDefinition = {
  id: 'reverse',
  name: 'Reverse',
  short: 'REV',
  description: 'Reversal (self-inverse)',
  icon: '↔',
  colorClass: 'cipher-reverse',
  defaultConfig: {},
  configSchema: [],
  encrypt(text: string): string {
    return text.split('').reverse().join('')
  },
  decrypt(text: string): string {
    return text.split('').reverse().join('')
  },
}

// ─── Rail Fence ──────────────────────────────────────────────

export const railFenceCipher: CipherDefinition = {
  id: 'railfence',
  name: 'Rail Fence',
  short: 'RAIL',
  description: 'Zigzag transposition',
  icon: '≋',
  colorClass: 'cipher-railfence',
  defaultConfig: { rails: 3 },
  configSchema: [
    { key: 'rails', label: 'Rails', type: 'number', min: 2, max: 8 },
  ],
  encrypt(text: string, config: CipherConfig): string {
    const r = Math.max(2, parseInt(String(config.rails)) || 3)
    if (r >= text.length) return text
    const fence: string[][] = Array.from({ length: r }, () => [])
    let rail = 0
    let dir = 1
    for (const c of text) {
      fence[rail].push(c)
      if (rail === 0) dir = 1
      else if (rail === r - 1) dir = -1
      rail += dir
    }
    return fence.flat().join('')
  },
  decrypt(text: string, config: CipherConfig): string {
    const r = Math.max(2, parseInt(String(config.rails)) || 3)
    if (r >= text.length) return text
    const n = text.length
    const railIndices = new Array<number>(n)
    let rail = 0
    let dir = 1
    for (let i = 0; i < n; i++) {
      railIndices[i] = rail
      if (rail === 0) dir = 1
      else if (rail === r - 1) dir = -1
      rail += dir
    }
    const counts = new Array<number>(r).fill(0)
    for (const ri of railIndices) counts[ri]++
    const starts: number[] = [0]
    for (let i = 1; i < r; i++) starts[i] = starts[i - 1] + counts[i - 1]
    const pos = [...starts]
    const result = new Array<string>(n)
    for (let i = 0; i < n; i++) {
      result[i] = text[pos[railIndices[i]]++]
    }
    return result.join('')
  },
}
