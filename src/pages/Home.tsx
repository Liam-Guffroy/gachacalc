import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GAMES } from '../data/games'

export default function Home() {
  const navigate = useNavigate()

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-24"
    >
      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-20 relative z-10"
      >
        <div className="font-mono text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#475569' }}>
          — SELECT GAME —
        </div>
        <h1 className="font-display font-bold uppercase" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '0.05em', lineHeight: 1 }}>
          PITY
          <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}> CALC</span>
        </h1>
        <p className="font-body mt-4 font-light" style={{ color: '#475569', letterSpacing: '0.05em' }}>
          Know exactly how many pulls you need
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-lg relative z-10">
        {GAMES.map((game, i) => (
          <motion.button
            key={game.id}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ x: 8, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/calc/${game.id}`)}
            className="group relative flex items-center justify-between px-8 py-6 rounded-sm text-left overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: `1px solid var(--border)`,
              transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = game.accentColor + '60'
              ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${game.glowColor}`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            <div>
              <div className="font-mono text-xs tracking-widest mb-1" style={{ color: game.accentColor, opacity: 0.8 }}>
                {game.shortName}
              </div>
              <div className="font-display font-semibold text-2xl uppercase tracking-wide">
                {game.name}
              </div>
              <div className="font-body text-sm mt-1" style={{ color: '#475569' }}>
                {game.character.label} · {game.lc.label}
              </div>
            </div>
            <div className="font-mono text-2xl opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: game.accentColor }}>
              →
            </div>
            {/* Accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: game.accentColor }} />
          </motion.button>
        ))}
      </div>
    </motion.main>
  )
}
