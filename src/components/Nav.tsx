import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: 'linear-gradient(to bottom, rgba(8,11,18,0.95), transparent)', backdropFilter: 'blur(8px)' }}
    >
      <Link to="/" className="font-display font-bold text-xl tracking-widest uppercase" style={{ letterSpacing: '0.2em' }}>
        <span style={{ color: '#a78bfa' }}>GACHA</span>
        <span style={{ color: '#64748b' }}>CALC</span>
      </Link>
      {!isHome && (
        <Link to="/" className="font-mono text-xs tracking-widest uppercase px-4 py-2 border rounded-sm transition-all hover:opacity-80"
          style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#94a3b8' }}>
          ← BACK
        </Link>
      )}
    </motion.nav>
  )
}
