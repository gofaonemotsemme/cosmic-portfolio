export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
  symbol: string;
  nature: 'harmonious' | 'challenging' | 'neutral';
}

export const ASPECTS = [
  { name: 'Conjunction', angle: 0, orb: 8, symbol: '☌', nature: 'neutral' as const },
  { name: 'Opposition', angle: 180, orb: 8, symbol: '☍', nature: 'challenging' as const },
  { name: 'Trine', angle: 120, orb: 6, symbol: '△', nature: 'harmonious' as const },
  { name: 'Square', angle: 90, orb: 6, symbol: '□', nature: 'challenging' as const },
  { name: 'Sextile', angle: 60, orb: 4, symbol: '⚹', nature: 'harmonious' as const },
  { name: 'Quincunx', angle: 150, orb: 3, symbol: '⚻', nature: 'challenging' as const },
  { name: 'Semisextile', angle: 30, orb: 2, symbol: '⚺', nature: 'neutral' as const },
  { name: 'Semisquare', angle: 45, orb: 2, symbol: '∠', nature: 'challenging' as const },
  { name: 'Sesquiquadrate', angle: 135, orb: 2, symbol: '⚼', nature: 'challenging' as const }
];

/**
 * Calculate the shortest angular distance between two longitudes
 */
function getAngularDistance(long1: number, long2: number): number {
  const diff = Math.abs(long1 - long2) % 360;
  return Math.min(diff, 360 - diff);
}

/**
 * Calculate all aspects between planets
 */
export function calculateAspects(
  planets: Array<{ name: string; longitude: number }>
): Aspect[] {
  const aspects: Aspect[] = [];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      
      const distance = getAngularDistance(p1.longitude, p2.longitude);
      
      // Check each aspect type
      for (const aspect of ASPECTS) {
        const orb = Math.abs(distance - aspect.angle);
        
        if (orb <= aspect.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: aspect.name,
            angle: aspect.angle,
            orb: parseFloat(orb.toFixed(2)),
            symbol: aspect.symbol,
            nature: aspect.nature
          });
          break; // Only add the closest aspect
        }
      }
    }
  }
  
  return aspects;
}