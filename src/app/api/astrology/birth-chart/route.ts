import { NextRequest, NextResponse } from 'next/server';
import { calculatePlanets } from '@/lib/astronomy/planetCalculator';
import { 
  calculateLocalSiderealTime, 
  calculateObliquity,
  calculatePlacidusHouses,
  getHouseForPlanet,
  calculateAscendant,
  calculateMidheaven
} from '@/lib/astrology/houseCalculator';
import { getZodiacSign, ZodiacSignResult } from '@/lib/astrology/signCalculator';
import { calculateAspects } from '@/lib/astrology/aspectCalculator';
import { z } from 'zod';

// Input validation schema
const BirthChartSchema = z.object({
  datetime: z.string().datetime(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  includeInterpretations: z.boolean().optional().default(true)
});

export interface PlanetWithSign {
  name: string;
  sign: string;
  degree: number;
  longitude: number;
  latitude: number;
  distance: number;
  house: number;
}

export interface HouseWithSign {
  house: number;
  sign: string;
  degree: number;
  longitude: number;
}

export interface BirthChartResponse {
  datetime: string;
  location: {
    latitude: number;
    longitude: number;
  };
  ascendant: HouseWithSign;
  midheaven: HouseWithSign;
  houses: HouseWithSign[];
  planets: PlanetWithSign[];
  aspects: any[];
  interpretations: any | null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = BirthChartSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }
    
    const { datetime, latitude, longitude, includeInterpretations } = validation.data;
    
    const birthDate = new Date(datetime);
    
    // Calculate planetary positions
    const { planets: rawPlanets } = await calculatePlanets(birthDate);
    
    // Calculate houses
    const lst = calculateLocalSiderealTime(birthDate, longitude);
    const obliquity = calculateObliquity(birthDate);
    const houses = calculatePlacidusHouses(lst, latitude, obliquity);
    
    // Enrich planets with house positions
    const planets: PlanetWithSign[] = rawPlanets.map(p => ({
      ...p,
      ...getZodiacSign(p.longitude),
      house: getHouseForPlanet(p.longitude, houses)
    }));
    
    // Format houses with zodiac signs
    const houseSigns: HouseWithSign[] = houses.map((longitude, index) => ({
      house: index + 1,
      ...getZodiacSign(longitude),
      longitude
    }));
    
    // Calculate Ascendant and Midheaven
    const ascendantLong = calculateAscendant(lst, latitude, obliquity);
    const midheavenLong = calculateMidheaven(lst, obliquity);
    
    const ascendant: HouseWithSign = {
      house: 1,
      ...getZodiacSign(ascendantLong),
      longitude: ascendantLong
    };
    
    const midheaven: HouseWithSign = {
      house: 10,
      ...getZodiacSign(midheavenLong),
      longitude: midheavenLong
    };
    
    // Calculate aspects
    const aspects = calculateAspects(planets);
    
    // Generate interpretations (placeholder for now)
    const interpretations = includeInterpretations ? {
      sun: `Your Sun is in ${planets.find(p => p.name === 'Sun')?.sign || 'unknown'}. This represents your core identity.`,
      moon: `Your Moon is in ${planets.find(p => p.name === 'Moon')?.sign || 'unknown'}. This represents your emotional nature.`,
      rising: `Your Rising sign is ${ascendant.sign}. This is how you appear to others.`
    } : null;
    
    const response: BirthChartResponse = {
      datetime: birthDate.toISOString(),
      location: { latitude, longitude },
      ascendant,
      midheaven,
      houses: houseSigns,
      planets,
      aspects,
      interpretations
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Birth chart calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "✨ Astrology API is live!",
    usage: {
      endpoint: "/api/astrology/birth-chart",
      method: "POST",
      body: {
        datetime: "1990-06-15T18:30:00.000Z",
        latitude: 40.7128,
        longitude: -74.0060,
        includeInterpretations: true
      },
      response: "Returns birth chart with planets, houses, aspects, and interpretations"
    }
  });
}