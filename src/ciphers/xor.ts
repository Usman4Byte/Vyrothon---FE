import type { CipherDefinition, CipherConfig } from '../types'

export const xorCipher: CipherDefinition = {
  id: 'xor',
  name: 'XOR Cipher',
  short: 'XOR',
  description: 'Bitwise XOR with numeric key',
  icon: '⊕',
  colorClass: 'cipher-xor',
  defaultConfig: { key: 42 },
  configSchema: [
    { key: 'key', label: 'Key', type: 'number', min: 1, max: 255 },
  ],
  encrypt(text: string, config: CipherConfig): string {
    const key = parseInt(String(config.key)) & 0xff
    return text
      .split('')
      .map(c => String.fromCharCode(c.charCodeAt(0) ^ key))
      .join('')
  },
  decrypt(text: string, config: CipherConfig): string {
    // XOR is self-inverse
    return this.encrypt(text, config)
  },
}
