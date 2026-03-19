import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Results from './pages/Results'
import Nav from './components/Nav'

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/calc/:gameId" element={<Calculator />} />
          <Route path="/results/:gameId" element={<Results />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
