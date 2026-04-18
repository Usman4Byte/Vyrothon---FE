import type { CipherDefinition, CipherConfig } from '../types'

const sanitizeKey = (raw: string): string =>
  (raw || 'KEY').toUpperCase().replace(/[^A-Z]/g, '') || 'KEY'

export const vigenereCipher: CipherDefinition = {
  id: 'vigenere',
  name: 'Vigenère Cipher',
  short: 'VIG',
  description: 'Polyalphabetic keyword cipher',
  icon: '◈',
  colorClass: 'cipher-vigenere',
  defaultConfig: { keyword: 'KEY' },
  configSchema: [
    { key: 'keyword', label: 'Keyword', type: 'text', placeholder: 'KEYWORD' },
  ],
  encrypt(text: string, config: CipherConfig): string {
    const kw = sanitizeKey(String(config.keyword))
    let ki = 0
    return text
      .split('')
      .map(c => {
        const code = c.charCodeAt(0)
        let base = -1
        if (code >= 65 && code <= 90) base = 65
        else if (code >= 97 && code <= 122) base = 97
        if (base === -1) return c
        const shift = kw[ki % kw.length].charCodeAt(0) - 65
        ki++
        return String.fromCharCode(((code - base + shift) % 26) + base)
      })
      .join('')
  },
  decrypt(text: string, config: CipherConfig): string {
    const kw = sanitizeKey(String(config.keyword))
    let ki = 0
    return text
      .split('')
      .map(c => {
        const code = c.charCodeAt(0)
        let base = -1
        if (code >= 65 && code <= 90) base = 65
        else if (code >= 97 && code <= 122) base = 97
        if (base === -1) return c
        const shift = kw[ki % kw.length].charCodeAt(0) - 65
        ki++
        return String.fromCharCode(((code - base - shift + 26) % 26) + base)
      })
      .join('')
  },
}
