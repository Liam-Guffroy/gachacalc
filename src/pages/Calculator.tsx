import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GAMES } from '../data/games'
import CounterInput from '../components/CounterInput'
import PityInput from '../components/PityInput'

export default function Calculator() {
    const { gameId } = useParams<{ gameId: string }>()
    const navigate = useNavigate()
    const game = GAMES.find(g => g.id === gameId)

    const [chars, setChars] = useState(1)
    const [lcs, setLcs] = useState(0)
    const [charPity, setCharPity] = useState(0)
    const [charGuaranteed, setCharGuaranteed] = useState(false)
    const [lcPity, setLcPity] = useState(0)
    const [lcGuaranteed, setLcGuaranteed] = useState(false)

    if (!game) { navigate('/'); return null }

    const canSubmit = chars > 0 || lcs > 0

    const featuredLabel = (rate: number) =>
        rate === 1 ? 'Guaranteed' : `${Math.round(rate * 100)}/${Math.round((1 - rate) * 100)}`

    const handleSubmit = () => {
        if (!canSubmit) return
        const p = new URLSearchParams({
            chars: chars.toString(),
            lcs: lcs.toString(),
            charPity: charPity.toString(),
            charG: charGuaranteed ? '1' : '0',
            lcPity: lcPity.toString(),
            lcG: lcGuaranteed ? '1' : '0',
        })
        navigate(`/results/${game.id}?${p.toString()}`)
    }

    return (
        <motion.main
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-center justify-center min-h-screen px-6 py-24"
        >
            <div className="fixed inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${game.glowColor.replace('0.4', '0.06')} 0%, transparent 70%)`,
            }} />

            <div className="w-full max-w-md relative z-10">
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="mb-10">
                    <div className="font-mono text-xs tracking-[0.4em] uppercase mb-2" style={{ color: game.accentColor, opacity: 0.7 }}>
                        {game.shortName} · PITY CALCULATOR
                    </div>
                    <h2 className="font-display font-bold text-4xl uppercase tracking-wide">
                        How many do<br />you want?
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-4">
                    {/* Character card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-sm p-6 flex flex-col gap-5"
                        style={{
                            background: 'var(--bg-card)',
                            border: `1px solid ${game.accentColor}25`,
                            boxShadow: `0 0 40px ${game.glowColor.replace('0.4', '0.06')}`,
                        }}
                    >
                        <CounterInput
                            label={game.character.label}
                            sublabel={`Hard pity ${game.character.hardPity} · ${featuredLabel(game.character.featured)}`}
                            value={chars}
                            onChange={setChars}
                            accentColor={game.accentColor}
                        />
                        {chars > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                                    <PityInput
                                        pity={charPity}
                                        guaranteed={charGuaranteed}
                                        onPityChange={setCharPity}
                                        onGuaranteedChange={setCharGuaranteed}
                                        accentColor={game.accentColor}
                                        hardPity={game.character.hardPity}
                                        featuredLabel={featuredLabel(game.character.featured)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* LC card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="rounded-sm p-6 flex flex-col gap-5"
                        style={{
                            background: 'var(--bg-card)',
                            border: `1px solid ${game.accentColor}25`,
                            boxShadow: `0 0 40px ${game.glowColor.replace('0.4', '0.06')}`,
                        }}
                    >
                        <CounterInput
                            label={game.lc.label}
                            sublabel={`Hard pity ${game.lc.hardPity} · ${featuredLabel(game.lc.featured)}`}
                            value={lcs}
                            onChange={setLcs}
                            accentColor={game.accentColor}
                        />
                        {lcs > 0 && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.2 }}>
                                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                                    <PityInput
                                        pity={lcPity}
                                        guaranteed={lcGuaranteed}
                                        onPityChange={setLcPity}
                                        onGuaranteedChange={setLcGuaranteed}
                                        accentColor={game.accentColor}
                                        hardPity={game.lc.hardPity}
                                        featuredLabel={featuredLabel(game.lc.featured)}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

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