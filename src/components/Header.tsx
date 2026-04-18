import { useState, useRef } from 'react'
import { usePipeline } from '../hooks/usePipeline'

export function Header() {
  const { mode, setMode, clearAll, exportToJson, importFromJson } = usePipeline()
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'export' | 'import'>('export')
  const [jsonText, setJsonText] = useState('')
  const [importError, setImportError] = useState('')
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleExport = () => {
    setModalMode('export')
    setJsonText(exportToJson())
    setImportError('')
    setShowModal(true)
  }

  const handleImport = () => {
    setModalMode('import')
    setJsonText('')
    setImportError('')
    setShowModal(true)
  }

  const handleDoImport = () => {
    const result = importFromJson(jsonText)
    if (result.success) {
      setShowModal(false)
    } else {
      setImportError(result.error ?? 'Unknown error')
    }
  }

  const handleCopyJson = async () => {
    await navigator.clipboard.writeText(jsonText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <header className="h-[52px] bg-white border-b border-black/10 flex items-center justify-between px-5 flex-shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-zinc-900 rounded-lg flex items-center justify-center text-white text-sm">
            ⊕
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-tight leading-none">CipherStack</div>
            <div className="text-[10px] text-zinc-400 font-mono mt-0.5">node-based encryption pipeline</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div className="flex bg-zinc-100 border border-black/10 rounded-lg p-[3px] gap-[2px]">
            {(['encrypt', 'decrypt'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`text-xs font-medium px-3 py-[5px] rounded-md transition-all capitalize ${
                  mode === m
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-700'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-[7px] rounded-lg border border-black/15 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ↑ Export
          </button>
          <button
            onClick={handleImport}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-[7px] rounded-lg border border-black/15 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            ↓ Import
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-[7px] rounded-lg border border-black/15 bg-white text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Clear
          </button>
        </div>
      </header>

      {/* JSON Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]"
          onClick={e => e.target === e.currentTarget && setShowModal(false)}
        >
          <div className="bg-white rounded-2xl border border-black/15 p-5 w-[500px] max-w-[95vw] shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">
                {modalMode === 'export' ? 'Export Pipeline' : 'Import Pipeline'}
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={jsonText}
              onChange={e => { setJsonText(e.target.value); setImportError('') }}
              readOnly={modalMode === 'export'}
              placeholder={modalMode === 'import' ? 'Paste pipeline JSON here…' : ''}
              className="w-full h-52 font-mono text-[11px] p-3 border border-black/15 rounded-xl bg-zinc-50 text-zinc-800 resize-none focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
            />

            {importError && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                <span>⚠</span> {importError}
              </p>
            )}

            <div className="flex gap-2 mt-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs font-medium px-4 py-2 rounded-lg border border-black/15 hover:bg-zinc-50 transition-colors"
              >
                Cancel
              </button>
              {modalMode === 'export' ? (
                <button
                  onClick={handleCopyJson}
                  className="text-xs font-medium px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
                >
                  {copied ? '✓ Copied!' : 'Copy JSON'}
                </button>
              ) : (
                <button
                  onClick={handleDoImport}
                  className="text-xs font-medium px-4 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
                >
                  Import
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
