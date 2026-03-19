import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GAMES } from '../data/games'
import CounterInput from '../components/CounterInput'

export default function Calculator() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const game = GAMES.find(g => g.id === gameId)

  const [chars, setChars] = useState(1)
  const [lcs, setLcs] = useState(0)

  if (!game) {
    navigate('/')
    return null
  }

  const canSubmit = chars > 0 || lcs > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    navigate(`/results/${game.id}?chars=${chars}&lcs=${lcs}`)
  }

  return (
      <motion.main
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-24"
      >
        {/* BG */}
        <div className="fixed inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${game.glowColor.replace('0.4', '0.06')} 0%, transparent 70%)`,
        }} />

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
            <div className="font-mono text-xs tracking-[0.4em] uppercase mb-2" style={{ color: game.accentColor, opacity: 0.7 }}>
              {game.shortName} · PITY CALCULATOR
            </div>
            <h2 className="font-display font-bold text-4xl uppercase tracking-wide">
              How many do<br />you want?
            </h2>
          </motion.div>

          {/* Card */}
          <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-sm p-8 flex flex-col gap-8"
              style={{
                background: 'var(--bg-card)',
                border: `1px solid ${game.accentColor}25`,
                boxShadow: `0 0 40px ${game.glowColor.replace('0.4', '0.08')}`,
              }}
          >
            <CounterInput
                label={game.character.label}
                sublabel={`Hard pity ${game.character.hardPity} · ${game.character.featured === 1 ? 'Guaranteed' : game.character.featured >= 0.75 ? '75/25' : game.character.featured === 0.5 ? '50/50' : `${Math.round(game.character.featured * 100)}/${Math.round((1 - game.character.featured) * 100)}`}`}
                value={chars}
                onChange={setChars}
                accentColor={game.accentColor}
            />

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

            <CounterInput
                label={game.lc.label}
                sublabel={`Hard pity ${game.lc.hardPity} · ${game.lc.featured === 0.5 ? '50/50' : game.lc.featured === 1 ? 'Guaranteed' : '75/25'}`}
                value={lcs}
                onChange={setLcs}
                accentColor={game.accentColor}
            />
          </motion.div>

          {/* CTA */}
          <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={canSubmit ? { scale: 1.02 } : {}}
              whileTap={canSubmit ? { scale: 0.97 } : {}}
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full mt-4 py-4 font-display font-bold text-lg uppercase tracking-widest rounded-sm transition-all"
              style={{
                background: canSubmit ? game.accentColor : 'rgba(255,255,255,0.05)',
                color: canSubmit ? '#080b12' : '#374151',
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                boxShadow: canSubmit ? `0 0 30px ${game.glowColor}` : 'none',
              }}
          >
            Calculate →
          </motion.button>

          {!canSubmit && (
              <p className="text-center font-mono text-xs mt-3" style={{ color: '#374151' }}>
                Set at least one value above 0
              </p>
          )}
        </div>
      </motion.main>
  )
}