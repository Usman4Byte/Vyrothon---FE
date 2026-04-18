import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { PipelineCanvas } from './components/PipelineCanvas'
import { IOPanel } from './components/IOPanel'
import { useState } from 'react'

function MobileHeaderActions() {
  // Show Header actions in a dropdown for mobile
  const [open, setOpen] = useState(false)
  return (
    <div className="md:hidden relative">
      <button
        className="p-2 text-zinc-500 hover:text-zinc-900 focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-label="Show actions"
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-black/10 rounded-xl shadow-lg z-50">
          <Header mobile />
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f7f4] font-sans">
      {/* Header with mobile menu button and actions */}
      <div className="relative z-50">
        <div className="md:hidden flex items-center h-[52px] px-3 bg-white border-b border-black/10 justify-between">
          <div className="flex items-center">
            <button
              className="p-2 mr-2 text-zinc-500 hover:text-zinc-900 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <span className="font-semibold text-lg tracking-tight">CipherStack</span>
          </div>
          <MobileHeaderActions />
        </div>
        <div className="hidden md:block">
          <Header />
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar mobileOpen={sidebarOpen} setMobileOpen={setSidebarOpen} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <PipelineCanvas />
          <IOPanel />
        </div>
      </div>
    </div>
  )
}
