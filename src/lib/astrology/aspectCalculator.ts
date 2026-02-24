export interface AspectDefinition {
  name: string;
  angle: number;
  orb: number;
  symbol: string;
}

export const ASPECTS: Record<string, AspectDefinition> = {
  CONJUNCTION: { name: 'Conjunction', angle: 0, orb: 8, symbol: '☌' },
  OPPOSITION: { name: 'Opposition', angle: 180, orb: 8, symbol: '☍' },
  TRINE: { name: 'Trine', angle: 120, orb: 6, symbol: '△' },
  SQUARE: { name: 'Square', angle: 90, orb: 6, symbol: '□' },
  SEXTILE: { name: 'Sextile', angle: 60, orb: 4, symbol: '⚹' },
  QUINCUNX: { name: 'Quincunx', angle: 150, orb: 3, symbol: '⚻' },
  SEMISEXTILE: { name: 'Semisextile', angle: 30, orb: 2, symbol: '⚺' },
  SEMISQUARE: { name: 'Semisquare', angle: 45, orb: 2, symbol: '∠' },
  SESQUIQUADRATE: { name: 'Sesquiquadrate', angle: 135, orb: 2, symbol: '⚼' }
};

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
  symbol: string;
  isApplying: boolean;
}

/**
 * Calculate the angle between two longitudes (shortest path)
 */
function getAngularDistance(long1: number, long2: number): number {
  let diff = Math.abs(long1 - long2) % 360;
  return Math.min(diff, 360 - diff);
}

/**
 * Determine if aspect is applying (simplified)
 */
function isApplyingAspect(long1: number, long2: number, targetAngle: number): boolean {
  const currentDistance = getAngularDistance(long1, long2);
  const diff = targetAngle - currentDistance;
  return Math.abs(diff) < 1; // Within 1 degree
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
      for (const [key, aspect] of Object.entries(ASPECTS)) {
        const orb = Math.abs(distance - aspect.angle);
        
        if (orb <= aspect.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: aspect.name,
            angle: aspect.angle,
            orb: parseFloat(orb.toFixed(2)),
            symbol: aspect.symbol,
            isApplying: isApplyingAspect(p1.longitude, p2.longitude, aspect.angle)
          });
          break; // Only record the closest aspect
        }
      }
    }
  }
  
  return aspects;
}