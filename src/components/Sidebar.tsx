import { cipherList } from '../ciphers'
import { usePipeline } from '../hooks/usePipeline'
import type { CipherDefinition } from '../types'
import { useState } from 'react'

const colorMap: Record<string, string> = {
  'cipher-caesar': 'bg-amber-100',
  'cipher-xor': 'bg-violet-100',
  'cipher-vigenere': 'bg-emerald-100',
  'cipher-base64': 'bg-sky-100',
  'cipher-reverse': 'bg-pink-100',
  'cipher-railfence': 'bg-teal-100',
}

function CipherLibraryItem({ cipher, onClick }: { cipher: CipherDefinition, onClick?: () => void }) {
  const { addNode } = usePipeline()

  return (
    <button
      onClick={() => { addNode(cipher.id); onClick && onClick(); }}
      className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl border border-transparent hover:bg-blue-50 hover:border-blue-100 transition-all group text-left"
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
          colorMap[cipher.colorClass] ?? 'bg-zinc-100'
        }`}
      >
        {cipher.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-zinc-800 leading-none">{cipher.name}</div>
        <div className="text-[11px] text-zinc-400 mt-0.5">{cipher.description}</div>
      </div>
      <div className="w-5 h-5 rounded-full border border-black/15 bg-white flex items-center justify-center text-sm text-zinc-400 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-all flex-shrink-0">
        +
      </div>
    </button>
  )
}

export function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen?: boolean, setMobileOpen?: (open: boolean) => void }) {
  // Overlay for mobile
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen && setMobileOpen(false)}
      />
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-[80vw] max-w-xs bg-white border-r border-black/10 flex flex-col overflow-hidden transform transition-transform duration-300 md:static md:translate-x-0 md:w-[220px] md:flex-shrink-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:opacity-100 md:pointer-events-auto`}
        style={{ boxShadow: mobileOpen ? '0 0 0 9999px rgba(0,0,0,0.1)' : undefined }}
      >
        <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between md:block">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">
            Cipher Library
          </p>
          {/* Close button for mobile */}
          <button
            className="md:hidden p-1 ml-2 text-zinc-400 hover:text-zinc-700"
            onClick={() => setMobileOpen && setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l8 8M6 14L14 6"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {cipherList.map(cipher => (
            <CipherLibraryItem key={cipher.id} cipher={cipher} onClick={() => setMobileOpen && setMobileOpen(false)} />
          ))}
        </div>
        <div className="px-4 py-3 border-t border-black/10">
          <p className="text-[12px] text-zinc-600 leading-relaxed">
            Click any cipher to add it to your pipeline. Drag nodes to reorder.
          </p>
        </div>
      </aside>
    </>
  )
}
