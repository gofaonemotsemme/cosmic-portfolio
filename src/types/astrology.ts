export interface Planet {
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  sign: string;
  degree: number;
  house: number;
}

export interface House {
  house: number;
  longitude: number;
  sign: string;
  degree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
  symbol: string;
  isApplying: boolean;
}

export interface BirthChart {
  datetime: string;
  location: {
    latitude: number;
    longitude: number;
  };
  ascendant: House;
  midheaven: House;
  houses: House[];
  planets: Planet[];
  aspects: Aspect[];
  interpretations: any | null;
}

export interface ZodiacInfo {
  sign: string;
  degree: number;
  symbol: string;
}