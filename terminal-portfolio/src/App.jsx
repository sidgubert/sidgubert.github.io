import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import SystemInfo from './sections/SystemInfo'
import TechStack from './sections/TechStack'
import Deployments from './sections/Deployments'
import UserConfig from './sections/UserConfig'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden bg-void bg-grid">
      <a
        href="#system"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-phosphor focus:px-3 focus:py-2 focus:font-mono focus:text-black"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main className="animate-flicker">
        <Hero />
        <SystemInfo />
        <TechStack />
        <Deployments />
        <UserConfig />
      </main>

      <Footer />

      {/* Scanlines + vinheta CRT */}
      <div className="crt-overlay" aria-hidden="true" />
    </div>
  )
}

