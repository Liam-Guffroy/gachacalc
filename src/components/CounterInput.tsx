import { motion } from 'framer-motion'

interface Props {
  label: string
  sublabel: string
  value: number
  onChange: (v: number) => void
  accentColor: string
}

export default function CounterInput({ label, sublabel, value, onChange, accentColor }: Props) {
  const dec = () => onChange(Math.max(0, value - 1))
  const inc = () => onChange(Math.min(99, value + 1))

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="font-display font-semibold text-lg uppercase tracking-wider">{label}</div>
        <div className="font-mono text-xs tracking-widest mt-0.5" style={{ color: '#475569' }}>{sublabel}</div>
      </div>
      <div className="flex items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={dec}
          className="w-10 h-10 flex items-center justify-center rounded-sm font-display text-xl font-bold transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
        >−</motion.button>

        <div className="relative flex-1">
          <input
            type="number"
            min={0} max={99}
            value={value}
            onChange={e => onChange(Math.max(0, Math.min(99, parseInt(e.target.value) || 0)))}
            className="w-full text-center font-display font-bold text-3xl py-3 rounded-sm outline-none"
            style={{
              background: 'rgba(0,0,0,0.3)',
              border: `1px solid ${accentColor}40`,
              color: accentColor,
              caretColor: accentColor,
            }}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={inc}
          className="w-10 h-10 flex items-center justify-center rounded-sm font-display text-xl font-bold transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
        >+</motion.button>
      </div>
    </div>
  )
}
