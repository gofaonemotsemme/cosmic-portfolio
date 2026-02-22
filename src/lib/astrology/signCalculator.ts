export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio", 
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const ZODIAC_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"
];

/**
 * Get zodiac sign from ecliptic longitude
 */
export function getZodiacSign(longitude: number): { 
  sign: string; 
  symbol: string;
  degree: number;
  element: string;
  modality: string;
} {
  const normLong = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normLong / 30);
  const degreeInSign = normLong % 30;
  
  const elements = ["Fire", "Earth", "Air", "Water"];
  const modalities = ["Cardinal", "Fixed", "Mutable"];
  
  return {
    sign: ZODIAC_SIGNS[signIndex],
    symbol: ZODIAC_SYMBOLS[signIndex],
    degree: degreeInSign,
    element: elements[Math.floor(signIndex / 3) % 4],
    modality: modalities[signIndex % 3]
  };
}