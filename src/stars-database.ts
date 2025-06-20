// Gerçek yıldız verileri - HYG Database'den alınmış
export interface StarData {
  name: string;
  distance?: number;
  magnitude?: number;
  spectral_type?: string;
  constellation?: string;
}

export const REAL_STARS: StarData[] = [
  { name: 'SIRIUS', distance: 8.6, magnitude: -1.46, spectral_type: 'A1V', constellation: 'Canis Major' },
  { name: 'CANOPUS', distance: 310, magnitude: -0.74, spectral_type: 'F0II', constellation: 'Carina' },
  { name: 'ARCTURUS', distance: 37, magnitude: -0.05, spectral_type: 'K1.5III', constellation: 'Boötes' },
  { name: 'VEGA', distance: 25, magnitude: 0.03, spectral_type: 'A0V', constellation: 'Lyra' },
  { name: 'CAPELLA', distance: 42, magnitude: 0.08, spectral_type: 'G8III', constellation: 'Auriga' },
  { name: 'RIGEL', distance: 860, magnitude: 0.12, spectral_type: 'B8Ia', constellation: 'Orion' },
  { name: 'PROCYON', distance: 11.4, magnitude: 0.34, spectral_type: 'F5IV-V', constellation: 'Canis Minor' },
  { name: 'ACHERNAR', distance: 139, magnitude: 0.46, spectral_type: 'B6Vpe', constellation: 'Eridanus' },
  { name: 'BETELGEUSE', distance: 640, magnitude: 0.50, spectral_type: 'M2Iab', constellation: 'Orion' },
  { name: 'HADAR', distance: 390, magnitude: 0.61, spectral_type: 'B1III', constellation: 'Centaurus' },
  { name: 'ALTAIR', distance: 17, magnitude: 0.77, spectral_type: 'A7V', constellation: 'Aquila' },
  { name: 'ACRUX', distance: 320, magnitude: 0.87, spectral_type: 'B0.5IV', constellation: 'Crux' },
  { name: 'ALDEBARAN', distance: 65, magnitude: 0.87, spectral_type: 'K5III', constellation: 'Taurus' },
  { name: 'ANTARES', distance: 550, magnitude: 0.96, spectral_type: 'M1.5Iab', constellation: 'Scorpius' },
  { name: 'SPICA', distance: 250, magnitude: 0.98, spectral_type: 'B1III-IV', constellation: 'Virgo' },
  { name: 'POLLUX', distance: 34, magnitude: 1.14, spectral_type: 'K0III', constellation: 'Gemini' },
  { name: 'FOMALHAUT', distance: 25, magnitude: 1.16, spectral_type: 'A3V', constellation: 'Piscis Austrinus' },
  { name: 'DENEB', distance: 2600, magnitude: 1.25, spectral_type: 'A2Ia', constellation: 'Cygnus' },
  { name: 'MIMOSA', distance: 280, magnitude: 1.25, spectral_type: 'B0.5III', constellation: 'Crux' },
  { name: 'REGULUS', distance: 79, magnitude: 1.36, spectral_type: 'B7V', constellation: 'Leo' },
  { name: 'ADHARA', distance: 430, magnitude: 1.50, spectral_type: 'B2II', constellation: 'Canis Major' },
  { name: 'CASTOR', distance: 52, magnitude: 1.58, spectral_type: 'A1V', constellation: 'Gemini' },
  { name: 'GACRUX', distance: 88, magnitude: 1.63, spectral_type: 'M3.5III', constellation: 'Crux' },
  { name: 'BELLATRIX', distance: 250, magnitude: 1.64, spectral_type: 'B2III', constellation: 'Orion' },
  { name: 'ELNATH', distance: 130, magnitude: 1.65, spectral_type: 'B7III', constellation: 'Taurus' },
  { name: 'MIAplACIDUS', distance: 111, magnitude: 1.67, spectral_type: 'A2IV', constellation: 'Carina' },
  { name: 'ALNILAM', distance: 2000, magnitude: 1.69, spectral_type: 'B0Iab', constellation: 'Orion' },
  { name: 'ALNITAK', distance: 1260, magnitude: 1.74, spectral_type: 'O9.5Ib', constellation: 'Orion' },
  { name: 'DUBHE', distance: 124, magnitude: 1.79, spectral_type: 'K0III', constellation: 'Ursa Major' },
  { name: 'MERAK', distance: 79, magnitude: 2.37, spectral_type: 'A1V', constellation: 'Ursa Major' },
  { name: 'PHECDA', distance: 84, magnitude: 2.44, spectral_type: 'A0Ve', constellation: 'Ursa Major' },
  { name: 'MEGREZ', distance: 81, magnitude: 3.32, spectral_type: 'A3V', constellation: 'Ursa Major' },
  { name: 'ALIOTH', distance: 81, magnitude: 1.76, spectral_type: 'A0pCr', constellation: 'Ursa Major' },
  { name: 'MIZAR', distance: 78, magnitude: 2.23, spectral_type: 'A1V', constellation: 'Ursa Major' },
  { name: 'ALKAID', distance: 101, magnitude: 1.85, spectral_type: 'B3V', constellation: 'Ursa Major' },
  { name: 'POLARIS', distance: 433, magnitude: 1.97, spectral_type: 'F7Ib', constellation: 'Ursa Minor' },
  { name: 'KOCHAB', distance: 131, magnitude: 2.07, spectral_type: 'K4III', constellation: 'Ursa Minor' },
  { name: 'ALPHA_CENTAURI', distance: 4.4, magnitude: -0.27, spectral_type: 'G2V', constellation: 'Centaurus' },
  { name: 'BETA_CENTAURI', distance: 390, magnitude: 0.61, spectral_type: 'B1III', constellation: 'Centaurus' },
  { name: 'GAMMA_CENTAURI', distance: 130, magnitude: 2.20, spectral_type: 'A1IV', constellation: 'Centaurus' },
  { name: 'DELTA_CENTAURI', distance: 395, magnitude: 2.57, spectral_type: 'B2IVne', constellation: 'Centaurus' },
  { name: 'EPSILON_CENTAURI', distance: 430, magnitude: 2.29, spectral_type: 'B1III', constellation: 'Centaurus' },
  { name: 'ZETA_CENTAURI', distance: 384, magnitude: 2.55, spectral_type: 'B2.5IV', constellation: 'Centaurus' },
  { name: 'ETA_CENTAURI', distance: 308, magnitude: 2.33, spectral_type: 'B1.5Vne', constellation: 'Centaurus' },
  { name: 'THETA_CENTAURI', distance: 61, magnitude: 2.06, spectral_type: 'K0IIIb', constellation: 'Centaurus' },
  { name: 'IOTA_CENTAURI', distance: 59, magnitude: 2.75, spectral_type: 'A2V', constellation: 'Centaurus' },
  { name: 'KAPPA_CENTAURI', distance: 539, magnitude: 3.13, spectral_type: 'B2IV', constellation: 'Centaurus' },
  { name: 'LAMBDA_CENTAURI', distance: 410, magnitude: 3.11, spectral_type: 'B9III', constellation: 'Centaurus' },
  { name: 'MU_CENTAURI', distance: 527, magnitude: 3.47, spectral_type: 'B2Vne', constellation: 'Centaurus' },
  { name: 'NU_CENTAURI', distance: 475, magnitude: 3.41, spectral_type: 'B2IV', constellation: 'Centaurus' },
  { name: 'XI_CENTAURI', distance: 20.7, magnitude: 4.83, spectral_type: 'G2V', constellation: 'Centaurus' },
  { name: 'OMICRON_CENTAURI', distance: 136, magnitude: 4.12, spectral_type: 'K0III', constellation: 'Centaurus' },
  { name: 'PI_CENTAURI', distance: 321, magnitude: 3.89, spectral_type: 'B5Vn', constellation: 'Centaurus' },
  { name: 'RHO_CENTAURI', distance: 342, magnitude: 3.97, spectral_type: 'B3V', constellation: 'Centaurus' },
  { name: 'SIGMA_CENTAURI', distance: 442, magnitude: 3.91, spectral_type: 'B2V', constellation: 'Centaurus' },
  { name: 'TAU_CENTAURI', distance: 132, magnitude: 3.85, spectral_type: 'A2V', constellation: 'Centaurus' },
  { name: 'UPSILON_CENTAURI', distance: 417, magnitude: 3.87, spectral_type: 'B2IV-V', constellation: 'Centaurus' },
  { name: 'PHI_CENTAURI', distance: 465, magnitude: 3.83, spectral_type: 'B2IV', constellation: 'Centaurus' },
  { name: 'CHI_CENTAURI', distance: 384, magnitude: 4.36, spectral_type: 'B2V', constellation: 'Centaurus' },
  { name: 'PSI_CENTAURI', distance: 247, magnitude: 4.05, spectral_type: 'A0V', constellation: 'Centaurus' },
  { name: 'OMEGA_CENTAURI', distance: 15800, magnitude: 3.7, spectral_type: 'G5', constellation: 'Centaurus' }
];

// Yıldız verilerini getir
export function getRealStarData(): StarData[] {
  return REAL_STARS;
}

// Rastgele yıldız seç
export function getRandomStar(): StarData {
  const randomIndex = Math.floor(Math.random() * REAL_STARS.length);
  return REAL_STARS[randomIndex];
}

// Yıldız isimlerini getir
export function getRealStarNames(): string[] {
  return REAL_STARS.map(star => star.name);
}

// Yıldız bilgilerini getir
export function getStarInfo(starName: string): StarData | null {
  return REAL_STARS.find(star => star.name === starName.toUpperCase()) || null;
} 