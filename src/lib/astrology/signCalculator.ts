// Zodiac signs with their ranges (0-360°)
export const ZODIAC_SIGNS = [
  "Aries",       // 0-30
  "Taurus",      // 30-60
  "Gemini",      // 60-90
  "Cancer",      // 90-120
  "Leo",         // 120-150
  "Virgo",       // 150-180
  "Libra",       // 180-210
  "Scorpio",     // 210-240
  "Sagittarius", // 240-270
  "Capricorn",   // 270-300
  "Aquarius",    // 300-330
  "Pisces"       // 330-360
];

export interface ZodiacSignResult {
  sign: string;
  degree: number;
}

/**
 * Convert ecliptic longitude to zodiac sign and degree within sign
 * @param longitude Ecliptic longitude in degrees (0-360)
 * @returns Object with sign name and degree within that sign (0-30)
 */
export function getZodiacSign(longitude: number): ZodiacSignResult {
  // Normalize longitude to 0-360
  const normalizedLong = ((longitude % 360) + 360) % 360;
  
  // Calculate sign index (0-11)
  const signIndex = Math.floor(normalizedLong / 30);
  
  // Degree within the sign (0-30)
  const degreeInSign = normalizedLong % 30;
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: parseFloat(degreeInSign.toFixed(2))
  };
}

/**
 * Get the symbol/emoji for a zodiac sign
 */
export function getZodiacSymbol(sign: string): string {
  const symbols: Record<string, string> = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓'
  };
  return symbols[sign] || '';
}