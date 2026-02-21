import { NextRequest, NextResponse } from 'next/server';
import { calculatePlanets } from '@/lib/astronomy/planetCalculator';
import { getZodiacSign } from '@/lib/astrology/signCalculator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { datetime, latitude, longitude } = body;
    
    if (!datetime || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: datetime, latitude, longitude' },
        { status: 400 }
      );
    }
    
    const birthDate = new Date(datetime);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json({ error: 'Invalid datetime' }, { status: 400 });
    }
    
    // Calculate planetary positions
    const planets = await calculatePlanets(birthDate, latitude, longitude);
    
    // Enrich with zodiac signs
    const chart = planets.map(p => ({
      name: p.name,
      ...getZodiacSign(p.longitude),
      longitude: p.longitude,
      latitude: p.latitude,
      distance: p.distance
    }));
    
    // For now, return a simple ascendant placeholder
    const ascendant = { 
      sign: 'Leo', 
      degree: 15.5,
      longitude: 135.5 
    };
    
    return NextResponse.json({
      datetime: birthDate.toISOString(),
      location: { latitude, longitude },
      ascendant,
      planets: chart
    });
    
  } catch (error) {
    console.error('Birth chart calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}