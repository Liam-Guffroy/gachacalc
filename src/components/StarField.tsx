import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  minOp: number;
  maxOp: number;
  color: string;
}

const STAR_COLORS = ['#ffffff', '#fde68a', '#bfdbfe', '#ddd6fe', '#a7f3d0'];

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      dur: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      minOp: Math.random() * 0.15 + 0.05,
      maxOp: Math.random() * 0.5 + 0.4,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));
  }, []);

  return (
    <div className="star-field">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.color,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
            '--min-op': s.minOp,
            '--max-op': s.maxOp,
          } as React.CSSProperties}
        />
      ))}
      {/* Nebula blobs */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '20%',
        width: '40vw', height: '30vh',
        background: 'radial-gradient(ellipse, rgba(30,50,120,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%', right: '10%',
        width: '35vw', height: '25vh',
        background: 'radial-gradient(ellipse, rgba(60,20,100,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
