import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { PipelineCanvas } from './components/PipelineCanvas'
import { IOPanel } from './components/IOPanel'

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f8f7f4] font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <PipelineCanvas />
          <IOPanel />
        </div>
      </div>
    </div>
  )
}
