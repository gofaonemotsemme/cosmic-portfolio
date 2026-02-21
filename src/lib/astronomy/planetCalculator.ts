import { 
  MakeTime, 
  GeoVector, 
  GeoMoon, 
  Ecliptic,
  Body 
} from 'astronomy-engine';

// Body is an enum with values like:
// Body.Sun, Body.Moon, Body.Mercury, Body.Venus, Body.Earth, Body.Mars, etc.

// List of bodies we want (excluding Earth)
const BODIES = [
  Body.Sun,
  Body.Moon,
  Body.Mercury,
  Body.Venus,
  Body.Mars,
  Body.Jupiter,
  Body.Saturn,
  Body.Uranus,
  Body.Neptune,
  Body.Pluto
];

/**
 * Convert Date to AstroTime format
 */
function dateToAstroTime(date: Date) {
  return MakeTime(date);
}

/**
 * Calculate geocentric positions for all major bodies
 */
export async function calculatePlanets(date: Date, latitude: number, longitude: number) {
  const time = dateToAstroTime(date);
  const results = [];
  
  for (const body of BODIES) {
    try {
      let vec;
      
      if (body === Body.Moon) {
        // GeoMoon returns vector directly
        vec = GeoMoon(time);
      } else {
        // GeoVector returns vector from Earth to body
        vec = GeoVector(body, time, true); // true = light travel time correction
      }
      
      // Convert to ecliptic coordinates
      const eclip = Ecliptic(vec);
      
      results.push({
        name: getBodyName(body),
        longitude: eclip.elon,  // Ecliptic longitude in degrees
        latitude: eclip.elat,   // Ecliptic latitude in degrees
        distance: vec.Length()  // Distance in AU
      });
    } catch (error) {
      console.error(`Error calculating position for ${getBodyName(body)}:`, error);
      // Push placeholder or skip
    }
  }
  
  return results;
}

/**
 * Get human-readable planet names
 */
function getBodyName(body: Body): string {
  switch (body) {
    case Body.Sun: return 'Sun';
    case Body.Moon: return 'Moon';
    case Body.Mercury: return 'Mercury';
    case Body.Venus: return 'Venus';
    case Body.Mars: return 'Mars';
    case Body.Jupiter: return 'Jupiter';
    case Body.Saturn: return 'Saturn';
    case Body.Uranus: return 'Uranus';
    case Body.Neptune: return 'Neptune';
    case Body.Pluto: return 'Pluto';
    default: return 'Unknown';
  }
}