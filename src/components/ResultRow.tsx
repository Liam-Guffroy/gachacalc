import { motion } from 'framer-motion';

interface ResultRowProps {
  label: string;
  avg: number;
  worst: number;
  pullName: string;
  color: string;
  delay?: number;
  maxPulls: number;
}

export default function ResultRow({ label, avg, worst, pullName, color, delay = 0, maxPulls }: ResultRowProps) {
  if (avg === 0 && worst === 0) return null;

  const pct = Math.min(100, (avg / maxPulls) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 500 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1.4rem', fontWeight: 700, color }}>
            {avg.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{pullName}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: 3, background: 'rgba(30,42,74,0.8)', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ delay: delay + 0.1, duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 2,
            transformOrigin: 'left',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.7rem', color: '#475569' }}>
          worst case: {worst.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
}
