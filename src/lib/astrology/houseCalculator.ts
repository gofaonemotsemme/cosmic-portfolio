/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
}

/**
 * Convert radians to degrees
 */
function toDegrees(radians: number): number {
  return radians * 180 / Math.PI;
}

/**
 * Calculate Julian Day from Date
 * Formula from US Naval Observatory
 */
export function calculateJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  
  let y = year;
  let m = month;
  
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  
  const dayFraction = (hour + minute / 60 + second / 3600) / 24;
  
  const JD = Math.floor(365.25 * (y + 4716)) +
             Math.floor(30.6001 * (m + 1)) +
             day +
             dayFraction +
             B -
             1524.5;
  
  return JD;
}

/**
 * Calculate Greenwich Sidereal Time (GST) in degrees
 */
export function calculateGreenwichSiderealTime(date: Date): number {
  const JD = calculateJulianDay(date);
  
  // Julian centuries since J2000.0
  const T = (JD - 2451545.0) / 36525.0;
  
  // Greenwich Sidereal Time in degrees
  let GST = 280.46061837 + 
            360.98564736629 * (JD - 2451545.0) + 
            0.000387933 * T * T - 
            (T * T * T) / 38710000;
  
  // Normalize to 0-360
  GST = ((GST % 360) + 360) % 360;
  
  return GST;
}

/**
 * Calculate Local Sidereal Time (LST) in degrees
 */
export function calculateLocalSiderealTime(date: Date, longitude: number): number {
  const GST = calculateGreenwichSiderealTime(date);
  
  // Convert longitude to time (15 degrees per hour)
  let LST = GST + longitude;
  
  // Normalize to 0-360
  LST = ((LST % 360) + 360) % 360;
  
  return LST;
}

/**
 * Calculate obliquity of the ecliptic (epsilon)
 */
export function calculateObliquity(date: Date): number {
  const JD = calculateJulianDay(date);
  const T = (JD - 2451545.0) / 36525.0;
  
  // Mean obliquity in degrees
  let epsilon = 23.439291 - 0.013004 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
  
  return epsilon;
}

/**
 * Calculate Ascendant (Rising Sign)
 */
export function calculateAscendant(date: Date, latitude: number, longitude: number): number {
  const LST = calculateLocalSiderealTime(date, longitude);
  const epsilon = calculateObliquity(date);
  
  const latRad = toRadians(latitude);
  const lstRad = toRadians(LST);
  const epsRad = toRadians(epsilon);
  
  // Ascendant formula from astronomical algorithms
  const x = Math.cos(lstRad);
  const y = -(Math.sin(latRad) * Math.cos(lstRad) * Math.tan(epsRad) + Math.sin(lstRad) * Math.cos(latRad));
  
  let ascRad = Math.atan2(x, y);
  let asc = toDegrees(ascRad);
  
  // Normalize to 0-360
  asc = ((asc % 360) + 360) % 360;
  
  return asc;
}

/**
 * Calculate Midheaven (MC)
 */
export function calculateMidheaven(date: Date, longitude: number): number {
  const LST = calculateLocalSiderealTime(date, longitude);
  const epsilon = calculateObliquity(date);
  
  const lstRad = toRadians(LST);
  const epsRad = toRadians(epsilon);
  
  // Midheaven formula
  let mcRad = Math.atan2(Math.sin(lstRad) * Math.cos(epsRad), Math.cos(lstRad));
  let mc = toDegrees(mcRad);
  
  // Normalize to 0-360
  mc = ((mc % 360) + 360) % 360;
  
  return mc;
}

/**
 * Calculate Placidus house cusps
 * This is a simplified but functional implementation
 */
export function calculatePlacidusHouses(date: Date, latitude: number, longitude: number): number[] {
  const houses = new Array(12).fill(0);
  
  // Get Ascendant and Midheaven
  const ascendant = calculateAscendant(date, latitude, longitude);
  const midheaven = calculateMidheaven(date, longitude);
  
  // Set the angles
  houses[0] = ascendant;           // 1st house cusp
  houses[9] = midheaven;           // 10th house cusp
  houses[6] = (ascendant + 180) % 360; // 7th house cusp (opposite 1st)
  houses[3] = (midheaven + 180) % 360; // 4th house cusp (opposite 10th)
  
  // Calculate intermediate houses using trisection (simplified Placidus)
  // Between 1st and 4th
  const arc1 = (houses[3] - houses[0] + 360) % 360;
  houses[1] = (houses[0] + arc1 / 3) % 360;
  houses[2] = (houses[0] + (arc1 * 2) / 3) % 360;
  
  // Between 4th and 7th
  const arc2 = (houses[6] - houses[3] + 360) % 360;
  houses[4] = (houses[3] + arc2 / 3) % 360;
  houses[5] = (houses[3] + (arc2 * 2) / 3) % 360;
  
  // Between 7th and 10th
  const arc3 = (houses[9] - houses[6] + 360) % 360;
  houses[7] = (houses[6] + arc3 / 3) % 360;
  houses[8] = (houses[6] + (arc3 * 2) / 3) % 360;
  
  // Between 10th and 1st (wrap around)
  const arc4 = (houses[0] + 360 - houses[9]);
  houses[10] = (houses[9] + arc4 / 3) % 360;
  houses[11] = (houses[9] + (arc4 * 2) / 3) % 360;
  
  return houses;
}

/**
 * Determine which house a planet is in
 */
export function getHouseForLongitude(longitude: number, houses: number[]): number {
  const normLong = ((longitude % 360) + 360) % 360;
  
  for (let i = 0; i < 11; i++) {
    if (normLong >= houses[i] && normLong < houses[i + 1]) {
      return i + 1;
    }
  }
  
  // If after last house, it's in first house
  if (normLong >= houses[11] || normLong < houses[0]) {
    return 1;
  }
  
  return 1;
}