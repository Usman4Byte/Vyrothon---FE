import type { CipherDefinition, CipherConfig } from '../types'

const shiftChar = (char: string, shift: number): string => {
  const code = char.charCodeAt(0)
  if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift) % 26) + 65)
  if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift) % 26) + 97)
  return char
}

export const caesarCipher: CipherDefinition = {
  id: 'caesar',
  name: 'Caesar Cipher',
  short: 'CAES',
  description: 'Shift each letter by N positions',
  icon: '⟳',
  colorClass: 'cipher-caesar',
  defaultConfig: { shift: 3 },
  configSchema: [
    { key: 'shift', label: 'Shift', type: 'number', min: 1, max: 25 },
  ],
  encrypt(text: string, config: CipherConfig): string {
    const shift = (((parseInt(String(config.shift)) % 26) + 26) % 26)
    return text.split('').map(c => shiftChar(c, shift)).join('')
  },
  decrypt(text: string, config: CipherConfig): string {
    const shift = (((parseInt(String(config.shift)) % 26) + 26) % 26)
    return text.split('').map(c => shiftChar(c, 26 - shift)).join('')
  },
}
