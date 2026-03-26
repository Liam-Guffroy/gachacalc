import { motion } from 'framer-motion'

interface Props {
  pity: number
  guaranteed: boolean
  onPityChange: (v: number) => void
  onGuaranteedChange: (v: boolean) => void
  accentColor: string
  hardPity: number
  featuredLabel: string
}

export default function PityInput({ pity, guaranteed, onPityChange, onGuaranteedChange, accentColor, hardPity, featuredLabel }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 items-end">
        {/* Pity counter */}
        <div className="flex-1">
          <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: '#475569' }}>
            Current Pity
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onPityChange(Math.max(0, pity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            >−</motion.button>
            <input
              type="number"
              min={0}
              max={hardPity - 1}
              value={pity}
              onChange={e => onPityChange(Math.max(0, Math.min(hardPity - 1, parseInt(e.target.value) || 0)))}
              className="flex-1 text-center font-display font-bold text-xl py-2 rounded-sm outline-none"
              style={{
                background: 'rgba(0,0,0,0.3)',
                border: `1px solid ${accentColor}30`,
                color: accentColor,
              }}
            />
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onPityChange(Math.min(hardPity - 1, pity + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            >+</motion.button>
          </div>
          <div className="font-mono text-xs mt-1 text-center" style={{ color: '#374151' }}>
            max {hardPity - 1}
          </div>
        </div>

        {/* Guaranteed toggle */}
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-xs tracking-widest uppercase" style={{ color: '#475569' }}>
            Guaranteed
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onGuaranteedChange(!guaranteed)}
            className="w-14 h-8 rounded-sm flex items-center px-1 transition-all"
            style={{
              background: guaranteed ? accentColor + '30' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${guaranteed ? accentColor + '60' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <motion.div
              animate={{ x: guaranteed ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-sm"
              style={{ background: guaranteed ? accentColor : '#374151' }}
            />
          </motion.button>
          <div className="font-mono text-xs" style={{ color: guaranteed ? accentColor : '#374151' }}>
            {guaranteed ? 'YES' : featuredLabel}
          </div>
        </div>
      </div>
    </div>
  )
}
