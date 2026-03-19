import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GAMES } from '../data/games';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'relative',
        zIndex: 10,
        borderBottom: '1px solid rgba(30,42,74,0.8)',
        background: 'rgba(5,6,15,0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', height: 60 }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span
              className="shimmer-text"
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}
            >
              ✦ PITY CALC
            </span>
          </NavLink>

          <div style={{ height: 24, width: 1, background: 'rgba(30,42,74,0.8)' }} />

          {/* Game links */}
          <div style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              All Games
            </NavLink>
            {GAMES.map(g => (
              <NavLink
                key={g.id}
                to={`/${g.id}`}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {g.shortName}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
