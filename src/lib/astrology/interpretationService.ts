import { 
  PLANET_INTERPRETATIONS, 
  HOUSE_INTERPRETATIONS, 
  ASPECT_INTERPRETATIONS 
} from './interpretations';

export interface ChartInterpretation {
  summary: string;
  sun: string;
  moon: string;
  rising: string;
  planets: Array<{
    name: string;
    interpretation: string;
  }>;
  houses: Array<{
    house: number;
    interpretation: string;
  }>;
  aspects: Array<{
    aspect: string;
    interpretation: string;
  }>;
}

export function generateInterpretations(
  planets: Array<{ name: string; sign: string; house: number }>,
  ascendant: { sign: string },
  aspects: Array<{ planet1: string; planet2: string; type: string; symbol: string }>
): ChartInterpretation {
  
  // Find Sun and Moon
  const sun = planets.find(p => p.name === 'Sun');
  const moon = planets.find(p => p.name === 'Moon');
  
  // Sun interpretation
  const sunInterpretation = sun && PLANET_INTERPRETATIONS.Sun?.[sun.sign] 
    ? `${sun.sign} Sun: ${PLANET_INTERPRETATIONS.Sun[sun.sign]}`
    : "Your Sun sign reveals your core identity and life purpose.";
  
  // Moon interpretation
  const moonInterpretation = moon && PLANET_INTERPRETATIONS.Moon?.[moon.sign]
    ? `${moon.sign} Moon: ${PLANET_INTERPRETATIONS.Moon[moon.sign]}`
    : "Your Moon sign reveals your emotional nature.";
  
  // Rising interpretation
  const risingInterpretation = `Your Rising sign is ${ascendant.sign}, representing how you present yourself to the world and your initial reactions to new situations.`;
  
  // Planet interpretations
  const planetInterpretations = planets.map(planet => {
    const planetName = planet.name;
    const sign = planet.sign;
    
    let interpretation = `${planetName} in ${sign}`;
    if (PLANET_INTERPRETATIONS[planetName]?.[sign]) {
      interpretation = `${planetName} in ${sign}: ${PLANET_INTERPRETATIONS[planetName][sign]}`;
    }
    
    return {
      name: planet.name,
      interpretation
    };
  });
  
  // House interpretations
  const houseInterpretations = planets.map(planet => ({
    house: planet.house,
    interpretation: `${planet.name} in House ${planet.house}: ${HOUSE_INTERPRETATIONS[planet.house] || "This placement influences how you express this planet's energy."}`
  }));
  
  // Aspect interpretations
  const aspectInterpretations = aspects.map(aspect => ({
    aspect: `${aspect.planet1} ${aspect.symbol} ${aspect.planet2}`,
    interpretation: `${aspect.type}: ${ASPECT_INTERPRETATIONS[aspect.type] || "These planets interact in a significant way."}`
  }));
  
  // Generate summary
  const summary = `Your Sun in ${sun?.sign || 'unknown'} gives you a core identity of ${sun?.sign || 'unique expression'}, while your Moon in ${moon?.sign || 'unknown'} shapes your emotional responses. With your Ascendant in ${ascendant.sign}, you present yourself to the world with ${ascendant.sign} energy.`;
  
  return {
    summary,
    sun: sunInterpretation,
    moon: moonInterpretation,
    rising: risingInterpretation,
    planets: planetInterpretations,
    houses: houseInterpretations,
    aspects: aspectInterpretations
  };
}