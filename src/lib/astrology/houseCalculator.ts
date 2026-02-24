/**
 * Calculate Julian Day from Date object
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
  
  const JD = Math.floor(365.25 * (y + 4716)) +
             Math.floor(30.6001 * (m + 1)) +
             day +
             (hour + minute / 60 + second / 3600) / 24 +
             B -
             1524.5;
  
  return JD;
}

/**
 * Calculate Local Sidereal Time (LST)
 * @param date UTC date
 * @param longitude Observer longitude in degrees
 * @returns Local Sidereal Time in degrees (0-360)
 */
export function calculateLocalSiderealTime(date: Date, longitude: number): number {
  const JD = calculateJulianDay(date);
  
  // Calculate Greenwich Sidereal Time (GST) in degrees
  const T = (JD - 2451545.0) / 36525.0;
  
  let GST = 280.46061837 + 
            360.98564736629 * (JD - 2451545.0) + 
            0.000387933 * T * T - 
            T * T * T / 38710000;
  
  GST = ((GST % 360) + 360) % 360;
  let LST = GST + longitude;
  LST = ((LST % 360) + 360) % 360;
  
  return LST;
}

/**
 * Calculate Obliquity of the Ecliptic
 */
export function calculateObliquity(date: Date): number {
  const JD = calculateJulianDay(date);
  const T = (JD - 2451545.0) / 36525.0;
  
  // Mean obliquity in degrees
  let epsilon = 23.439291 - 0.013004 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
  return epsilon;
}

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
 * Calculate Ascendant (Rising Sign)
 */
export function calculateAscendant(
  lst: number,
  latitude: number,
  obliquity: number
): number {
  const latRad = toRadians(latitude);
  const oblRad = toRadians(obliquity);
  const lstRad = toRadians(lst);
  
  const x = Math.cos(lstRad);
  const y = -(Math.sin(latRad) * Math.cos(lstRad) * Math.tan(oblRad) + 
               Math.sin(lstRad) * Math.cos(latRad));
  
  let ascRad = Math.atan2(x, y);
  let asc = toDegrees(ascRad);
  asc = ((asc % 360) + 360) % 360;
  
  return asc;
}

/**
 * Calculate Midheaven (MC)
 */
export function calculateMidheaven(lst: number, obliquity: number): number {
  const oblRad = toRadians(obliquity);
  const lstRad = toRadians(lst);
  
  const mcRad = Math.atan2(Math.sin(lstRad) * Math.cos(oblRad), Math.cos(lstRad));
  let mc = toDegrees(mcRad);
  mc = ((mc % 360) + 360) % 360;
  
  return mc;
}

/**
 * Calculate Placidus House Cusps
 */
export function calculatePlacidusHouses(
  lst: number,
  latitude: number,
  obliquity: number
): number[] {
  const houses = new Array(12).fill(0);
  
  const ascendant = calculateAscendant(lst, latitude, obliquity);
  const midheaven = calculateMidheaven(lst, obliquity);
  
  houses[0] = ascendant;      // 1st house
  houses[9] = midheaven;      // 10th house
  houses[6] = (ascendant + 180) % 360;  // 7th house
  houses[3] = (midheaven + 180) % 360;  // 4th house
  
  // Calculate intermediate houses using trisection
  const arc1 = (houses[3] - houses[0] + 360) % 360;
  houses[1] = (houses[0] + arc1 * 1/3) % 360;
  houses[2] = (houses[0] + arc1 * 2/3) % 360;
  
  const arc2 = (houses[6] - houses[3] + 360) % 360;
  houses[4] = (houses[3] + arc2 * 1/3) % 360;
  houses[5] = (houses[3] + arc2 * 2/3) % 360;
  
  const arc3 = (houses[9] - houses[6] + 360) % 360;
  houses[7] = (houses[6] + arc3 * 1/3) % 360;
  houses[8] = (houses[6] + arc3 * 2/3) % 360;
  
  const arc4 = (houses[0] + 360 - houses[9]);
  houses[10] = (houses[9] + arc4 * 1/3) % 360;
  houses[11] = (houses[9] + arc4 * 2/3) % 360;
  
  return houses;
}

/**
 * Get house number for a given ecliptic longitude
 */
export function getHouseForPlanet(
  longitude: number,
  houses: number[]
): number {
  // Sort houses in ascending order
  const sortedHouses = [...houses].sort((a, b) => a - b);
  
  for (let i = 0; i < sortedHouses.length - 1; i++) {
    if (longitude >= sortedHouses[i] && longitude < sortedHouses[i + 1]) {
      return i + 1;
    }
  }
  
  // If it's after the last house cusp, it's in the first house
  if (longitude >= sortedHouses[11] || longitude < sortedHouses[0]) {
    return 1;
  }
  
  return 1;
}