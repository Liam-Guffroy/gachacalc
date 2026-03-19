import { motion } from 'framer-motion';

interface CounterProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  icon: string;
  color: string;
}

export default function Counter({ label, sublabel, value, onChange, icon, color }: CounterProps) {
  const set = (v: number) => onChange(Math.max(0, Math.min(99, v)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          color: color,
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{sublabel}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Minus */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => set(value - 1)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: '1px solid rgba(30,42,74,0.8)',
            background: 'rgba(5,6,15,0.8)',
            color: '#94a3b8',
            fontSize: '1.2rem',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = color;
            (e.currentTarget as HTMLButtonElement).style.color = color;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(30,42,74,0.8)';
            (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
          }}
        >
          −
        </motion.button>

        {/* Input */}
        <input
          type="number"
          className="gacha-input"
          value={value}
          min={0}
          max={99}
          onChange={e => set(parseInt(e.target.value) || 0)}
          style={{ color: color }}
        />

        {/* Plus */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => set(value + 1)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            border: '1px solid rgba(30,42,74,0.8)',
            background: 'rgba(5,6,15,0.8)',
            color: '#94a3b8',
            fontSize: '1.2rem',
            cursor: 'pointer',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = color;
            (e.currentTarget as HTMLButtonElement).style.color = color;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(30,42,74,0.8)';
            (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8';
          }}
        >
          +
        </motion.button>
      </div>
    </div>
  );
}
