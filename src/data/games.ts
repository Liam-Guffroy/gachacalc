export interface GameData {
  id: string;
  name: string;
  shortName: string;
  accentColor: string;
  glowColor: string;
  character: {
    label: string;
    hardPity: number;
    avgPity: number;
    featured: number;
    guaranteedAt: number;
  };
  lc: {
    label: string;
    hardPity: number;
    avgPity: number;
    featured: number;
    guaranteedAt: number;
  };
  currency: string;
}

export const GAMES: GameData[] = [
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    shortName: 'HSR',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.4)',
    character: { label: 'Character', hardPity: 90, avgPity: 80, featured: 0.58, guaranteedAt: 180 },
    lc: { label: 'Light Cone', hardPity: 80, avgPity: 68, featured: 0.75, guaranteedAt: 160 },
    currency: 'Pulls',
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    shortName: 'WuWa',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.4)',
    character: { label: 'Character', hardPity: 80, avgPity: 70, featured: 0.5, guaranteedAt: 160 },
    lc: { label: 'Weapon', hardPity: 80, avgPity: 65, featured: 1.0, guaranteedAt: 80 },
    currency: 'Convenes',
  },
  {
    id: 'zzz',
    name: 'Zenless Zone Zero',
    shortName: 'ZZZ',
    accentColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.4)',
    character: { label: 'Agent', hardPity: 90, avgPity: 80, featured: 0.5, guaranteedAt: 180 },
    lc: { label: 'W-Engine', hardPity: 80, avgPity: 67, featured: 0.75, guaranteedAt: 160 },
    currency: 'Signals',
  },
];

export function calcAverage(count: number, avgPity: number, featured: number): number {
  if (count <= 0) return 0;
  const perUnit = avgPity / featured;
  return Math.round(perUnit * count);
}

export function calcWorstCase(count: number, guaranteedAt: number): number {
  if (count <= 0) return 0;
  return guaranteedAt * count;
}
