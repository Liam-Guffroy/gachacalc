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
    character: { label: 'Character', hardPity: 90, avgPity: 62, featured: 0.56, guaranteedAt: 180 },
    lc: { label: 'Light Cone', hardPity: 80, avgPity: 55, featured: 0.75, guaranteedAt: 160 },
    currency: 'Pulls',
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    shortName: 'WuWa',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.4)',
    character: { label: 'Character', hardPity: 80, avgPity: 55, featured: 0.5, guaranteedAt: 160 },
    lc: { label: 'Weapon', hardPity: 80, avgPity: 55, featured: 1.0, guaranteedAt: 80 },
    currency: 'Convenes',
  },
  {
    id: 'zzz',
    name: 'Zenless Zone Zero',
    shortName: 'ZZZ',
    accentColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.4)',
    character: { label: 'Agent', hardPity: 90, avgPity: 62, featured: 0.5, guaranteedAt: 180 },
    lc: { label: 'W-Engine', hardPity: 80, avgPity: 55, featured: 0.75, guaranteedAt: 160 },
    currency: 'Signals',
  },
];

export interface BannerState {
  count: number;
  pity: number;
  guaranteed: boolean;
}

/**
 * Calculate expected pulls needed for `count` featured units,
 * starting with current pity and guarantee status.
 * Guarantee carries over between units.
 */
export function calcExpected(state: BannerState, avgPity: number, featured: number): number {
  if (state.count <= 0) return 0;

  let total = 0;
  let currentPity = state.pity;
  let isGuaranteed = state.guaranteed;

  for (let i = 0; i < state.count; i++) {
    // Pulls to get a 5★ from current pity
    const pullsFor5Star = Math.max(1, avgPity - currentPity);

    if (isGuaranteed || featured === 1) {
      // Guaranteed featured — just need one 5★
      total += pullsFor5Star;
      isGuaranteed = false;
    } else {
      // Not guaranteed — featured chance applies
      // Expected: featured chance → done in pullsFor5Star pulls
      //           (1-featured) chance → lose, need another full avgPity, but next is guaranteed
      const expectedIfWin = pullsFor5Star;
      const expectedIfLose = pullsFor5Star + avgPity;
      total += featured * expectedIfWin + (1 - featured) * expectedIfLose;
      // After this unit, guarantee status:
      // If we won (featured chance) → no guarantee carried
      // If we lost → guarantee carried (but we already counted a 2nd pity)
      // Net: expected guarantee state for next unit = (1-featured) chance we're now guaranteed
      // But since we averaged the outcome, treat next unit as not guaranteed
      // (the loss path already consumed the guarantee)
      isGuaranteed = false;
    }

    // After first unit, pity resets to 0
    currentPity = 0;
  }

  return Math.round(total);
}

export function calcWorstCase(state: BannerState, hardPity: number, featured: number, guaranteedAt: number): number {
  if (state.count <= 0) return 0;

  let total = 0;
  let currentPity = state.pity;
  let isGuaranteed = state.guaranteed;

  for (let i = 0; i < state.count; i++) {
    const pullsFor5Star = Math.max(1, hardPity - currentPity);

    if (isGuaranteed || featured === 1) {
      total += pullsFor5Star;
      isGuaranteed = false;
    } else {
      // Worst case: always lose 50/50, need 2 pities
      // First pity from current pity, second full pity
      const firstPity = pullsFor5Star;
      const secondPity = hardPity;
      total += firstPity + secondPity;
      isGuaranteed = false;
    }

    currentPity = 0;
  }

  return total;
}

export function calcLucky(state: BannerState, avgPity: number): number {
  if (state.count <= 0) return 0;
  const firstUnit = Math.max(1, avgPity - state.pity);
  const rest = Math.max(0, state.count - 1) * avgPity;
  return Math.round(firstUnit + rest);
}