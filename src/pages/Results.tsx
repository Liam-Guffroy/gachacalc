import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GAMES, calcAverage, calcWorstCase } from '../data/games'

interface StatCardProps {
  title: string
  value: number
  subtitle: string
  accentColor: string
  delay: number
  dim?: boolean
}

function StatCard({ title, value, subtitle, accentColor, delay, dim }: StatCardProps) {
  return (
      <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay, duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col gap-1 p-5 rounded-sm"
          style={{
            background: dim ? 'rgba(255,255,255,0.02)' : 'var(--bg-card)',
            border: `1px solid ${dim ? 'rgba(255,255,255,0.04)' : accentColor + '20'}`,
          }}
      >
        <div className="font-mono text-xs tracking-widest uppercase" style={{ color: dim ? '#374151' : '#64748b' }}>
          {title}
        </div>
        <div className="font-display font-bold" style={{ fontSize: '2.5rem', color: dim ? '#374151' : accentColor, lineHeight: 1.1 }}>
          {value.toLocaleString()}
        </div>
        <div className="font-body text-xs" style={{ color: '#374151' }}>{subtitle}</div>
      </motion.div>
  )
}

export default function Results() {
  const { gameId } = useParams<{ gameId: string }>()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const game = GAMES.find(g => g.id === gameId)
  const chars = parseInt(params.get('chars') || '0')
  const lcs = parseInt(params.get('lcs') || '0')

  if (!game) { navigate('/'); return null }

  const charAvg = calcAverage(chars, game.character.avgPity, game.character.featured)
  const charWorst = calcWorstCase(chars, game.character.guaranteedAt)
  const lcAvg = calcAverage(lcs, game.lc.avgPity, game.lc.featured)
  const lcWorst = calcWorstCase(lcs, game.lc.guaranteedAt)

  const totalAvg = charAvg + lcAvg
  const totalWorst = charWorst + lcWorst

  // Lucky case: win all 50/50s — just avgPity * count, no division by featured rate
  const charLucky = chars > 0 ? Math.round(game.character.avgPity * chars) : 0
  const lcLucky = lcs > 0 ? Math.round(game.lc.avgPity * lcs) : 0
  const totalLucky = charLucky + lcLucky

  const charFeaturedLabel = game.character.featured === 1 ? 'Guaranteed' : `${Math.round(game.character.featured * 100)}/${Math.round((1 - game.character.featured) * 100)}`
  const lcFeaturedLabel = game.lc.featured === 1 ? 'Guaranteed' : `${Math.round(game.lc.featured * 100)}/${Math.round((1 - game.lc.featured) * 100)}`

  return (
      <motion.main
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-24"
      >
        {/* BG glow */}
        <div className="fixed inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${game.glowColor.replace('0.4', '0.07')} 0%, transparent 70%)`,
        }} />

        <div className="w-full max-w-lg relative z-10">
          {/* Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }} className="mb-8">
            <div className="font-mono text-xs tracking-[0.4em] uppercase mb-2" style={{ color: game.accentColor, opacity: 0.7 }}>
              {game.shortName} · RESULTS
            </div>
            <h2 className="font-display font-bold text-4xl uppercase tracking-wide leading-tight">
              You'll need this<br />many {game.currency.toLowerCase()}
            </h2>
            <div className="mt-3 font-body text-sm" style={{ color: '#475569' }}>
              {chars > 0 && `${chars} ${game.character.label}${chars > 1 ? 's' : ''}`}
              {chars > 0 && lcs > 0 && ' + '}
              {lcs > 0 && `${lcs} ${game.lc.label}${lcs > 1 ? 's' : ''}`}
            </div>
          </motion.div>

          {/* Total highlight */}
          <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="rounded-sm p-6 mb-4"
              style={{
                background: `linear-gradient(135deg, ${game.accentColor}15, transparent)`,
                border: `1px solid ${game.accentColor}40`,
                boxShadow: `0 0 50px ${game.glowColor.replace('0.4', '0.15')}`,
              }}
          >
            <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: game.accentColor }}>
              TOTAL AVERAGE
            </div>
            <div className="font-display font-bold" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1, color: game.accentColor }}>
              {totalAvg.toLocaleString()}
            </div>
            <div className="font-mono text-xs mt-1" style={{ color: '#475569' }}>
              {game.currency.toUpperCase()} · EXPECTED CASE
            </div>

            {/* Lucky & Worst row */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '1.25rem', paddingTop: '1.25rem' }}
                 className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#22c55e' }}>
                  🍀 IF YOU WIN ALL
                </div>
                <div className="font-display font-bold text-2xl" style={{ color: '#22c55e' }}>
                  {totalLucky.toLocaleString()}
                </div>
                <div className="font-mono text-xs mt-0.5" style={{ color: '#374151' }}>
                  {chars > 0 && lcs > 0
                      ? `${charFeaturedLabel} + ${lcFeaturedLabel}`
                      : chars > 0
                          ? charFeaturedLabel
                          : lcFeaturedLabel}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: '#ef4444' }}>
                  💀 IF YOU LOSE ALL
                </div>
                <div className="font-display font-bold text-2xl" style={{ color: '#374151' }}>
                  {totalWorst.toLocaleString()}
                </div>
                <div className="font-mono text-xs mt-0.5" style={{ color: '#374151' }}>
                  Absolute worst case
                </div>
              </div>
            </div>
          </motion.div>

          {/* Breakdown grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {chars > 0 && (
                <StatCard
                    title={`${game.character.label} avg`}
                    value={charAvg}
                    subtitle={`${chars} unit${chars > 1 ? 's' : ''} · ${charFeaturedLabel}`}
                    accentColor={game.accentColor}
                    delay={0.25}
                />
            )}
            {lcs > 0 && (
                <StatCard
                    title={`${game.lc.label} avg`}
                    value={lcAvg}
                    subtitle={`${lcs} unit${lcs > 1 ? 's' : ''} · ${lcFeaturedLabel}`}
                    accentColor={game.accentColor}
                    delay={0.3}
                />
            )}
            {chars > 0 && (
                <StatCard
                    title={`${game.character.label} lucky`}
                    value={charLucky}
                    subtitle={`Win all ${charFeaturedLabel}`}
                    accentColor={'#22c55e'}
                    delay={0.35}
                />
            )}
            {lcs > 0 && (
                <StatCard
                    title={`${game.lc.label} lucky`}
                    value={lcLucky}
                    subtitle={`Win all ${lcFeaturedLabel}`}
                    accentColor={'#22c55e'}
                    delay={0.4}
                />
            )}
          </div>

          {/* Actions */}
          <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
          >
            <button
                onClick={() => navigate(`/calc/${game.id}`)}
                className="flex-1 py-3 font-display font-semibold text-sm uppercase tracking-widest rounded-sm transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            >
              ← Adjust
            </button>
            <button
                onClick={() => navigate('/')}
                className="flex-1 py-3 font-display font-semibold text-sm uppercase tracking-widest rounded-sm transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            >
              Other Game
            </button>
          </motion.div>

          {/* Footnote */}
          <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center font-mono text-xs mt-5"
              style={{ color: '#1f2937' }}
          >
            Averages are statistical estimates. Actual results may vary.
          </motion.p>
        </div>
      </motion.main>
  )
}