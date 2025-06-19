// List of popular star names
const STAR_NAMES = [
  'SIRIUS',
  'VEGA',
  'ALTAIR',
  'RIGEL',
  'ANTARES',
  'ALDEBARAN',
  'BETELGEUSE',
  'ARCTURUS',
  'POLLUX',
  'DENEB'
] as const;

interface StellarIDOptions {
  /**
   * Custom prefix for the generated ID. Defaults to "STAR".
   */
  prefix?: string;
}

/**
 * Simple string hash function that generates a number between 0 and 9999
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash) % 10000;
}

/**
 * Generates a unique, deterministic star-themed ID based on the input string.
 * @param input - The input string to generate an ID from
 * @param options - Optional configuration for ID generation
 * @returns A star-themed ID in the format: PREFIX-HASH-STARNAME
 * @example
 * generateStellarID('hello') // Returns: "STAR-1234-VEGA"
 * generateStellarID('world', { prefix: 'COSMIC' }) // Returns: "COSMIC-5678-SIRIUS"
 */
export function generateStellarID(input: string, options: StellarIDOptions = {}): string {
  const prefix = options.prefix || 'STAR';
  const hash = hashString(input);
  const hashStr = hash.toString().padStart(4, '0');
  const starIndex = hash % STAR_NAMES.length;
  const starName = STAR_NAMES[starIndex];

  return `${prefix}-${hashStr}-${starName}`;
}

// Export types for TypeScript users
export type { StellarIDOptions }; 