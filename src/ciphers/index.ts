import type { CipherDefinition } from '../types'
import { caesarCipher } from './caesar'
import { xorCipher } from './xor'
import { vigenereCipher } from './vigenere'
import { base64Cipher, reverseCipher, railFenceCipher } from './extras'

export const cipherRegistry: Record<string, CipherDefinition> = {
  caesar: caesarCipher,
  xor: xorCipher,
  vigenere: vigenereCipher,
  base64: base64Cipher,
  reverse: reverseCipher,
  railfence: railFenceCipher,
}

export const cipherList: CipherDefinition[] = Object.values(cipherRegistry)

export { caesarCipher, xorCipher, vigenereCipher, base64Cipher, reverseCipher, railFenceCipher }
