import { useState } from 'react'
import { usePipeline } from '../hooks/usePipeline'

export function IOPanel() {
  const {
    inputText,
    outputText,
    setInputText,
    runPipeline,
    isReady,
    nodeCount,
    nodesNeeded,
    error,
    copyToClipboard,
  } = usePipeline()

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!outputText) return
    const ok = await copyToClipboard(outputText)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="bg-white border-t border-black/10 px-5 py-4 flex-shrink-0">
      <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-4">
        {/* Input */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Input Plaintext
            </span>
          </div>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Enter text to encrypt…"
            rows={3}
            className="w-full font-mono text-xs px-3 py-2.5 rounded-xl border border-black/15 bg-zinc-50 text-zinc-800 resize-none focus:outline-none focus:border-blue-400 focus:bg-white transition-colors placeholder:text-zinc-300"
          />

          {/* Validation + Run */}
          <div className="flex items-center justify-between mt-2">
            <div>
              {nodeCount === 0 ? null : !isReady ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  <span>⚠</span>
                  Add {nodesNeeded} more node{nodesNeeded !== 1 ? 's' : ''}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span>✓</span>
                  {nodeCount} nodes ready
                </span>
              )}
              {error && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 ml-2">
                  ⚠ {error}
                </span>
              )}
            </div>
            <button
              onClick={runPipeline}
              disabled={!isReady}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              ▶ Run
            </button>
          </div>
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Output
              </span>
            </div>
            <button
              onClick={handleCopy}
              disabled={!outputText}
              className="text-[10px] font-medium px-2.5 py-1 rounded-md border border-black/12 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>

          <div className="h-[72px] font-mono text-xs px-3 py-2.5 rounded-xl border border-emerald-100 bg-emerald-50/60 text-zinc-700 overflow-auto break-all leading-relaxed">
            {outputText ? (
              outputText
            ) : (
              <span className="text-zinc-300 italic">Output will appear here…</span>
            )}
          </div>

          {outputText && (
            <p className="text-[10px] text-zinc-400 mt-1.5 font-mono">
              {outputText.length} chars · {nodeCount} nodes
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
