import { GeoVector, GeoMoon, Ecliptic, Body } from 'astronomy-engine';

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 
                         'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';

export interface PlanetData {
  name: PlanetName;
  longitude: number;
  latitude: number;
  distance: number;
}

export interface PlanetsResult {
  planets: PlanetData[];
  houses: number[];
}

// Map planet names to Body enum values
const planetToBody: Record<Exclude<PlanetName, 'Moon'>, Body> = {
  'Sun': Body.Sun,
  'Mercury': Body.Mercury,
  'Venus': Body.Venus,
  'Mars': Body.Mars,
  'Jupiter': Body.Jupiter,
  'Saturn': Body.Saturn,
  'Uranus': Body.Uranus,
  'Neptune': Body.Neptune,
  'Pluto': Body.Pluto
};

/**
 * Get planet positions using astronomy-engine
 */
export async function calculatePlanets(date: Date): Promise<PlanetsResult> {
  const planets: PlanetData[] = [];
  
  // Planet list in order
  const planetNames: PlanetName[] = [
    'Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 
    'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'
  ];
  
  for (const name of planetNames) {
    try {
      let vector;
      
      if (name === 'Moon') {
        // GeoMoon returns geocentric equatorial vector for the Moon
        vector = GeoMoon(date);
      } else {
        // For other bodies, use GeoVector with Body enum
        const body = planetToBody[name as Exclude<PlanetName, 'Moon'>];
        vector = GeoVector(body, date, true);
      }
      
      // Ecliptic is a function, not a constructor
      // It takes a vector and returns ecliptic coordinates
      const ecliptic = Ecliptic(vector);
      
      planets.push({
        name,
        longitude: ecliptic.elon,
        latitude: ecliptic.elat,
        distance: vector.Length()
      });
      
    } catch (error) {
      console.error(`Error calculating position for ${name}:`, error);
    }
  }
  
  return { planets, houses: [] };
}