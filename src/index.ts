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

/**
 * Options for generating a Stellar ID.
 */
interface StellarIDOptions {
  /**
   * Custom prefix for the generated ID. Defaults to "STAR".
   */
  prefix?: string;
  length?: number; // Yeni özellik: ID uzunluğu kontrolü
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
  const { prefix = 'STAR', length } = options;
  
  // Hash oluştur
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32-bit integer'a dönüştür
  }
  
  // Hash'i 4 haneli sayıya dönüştür
  const hashNumber = Math.abs(hash) % 10000;
  const hashString = hashNumber.toString().padStart(4, '0');
  
  // Yıldız isimleri
  const starNames = ['SIRIUS', 'VEGA', 'ALTAIR', 'RIGEL', 'ANTARES', 'ALDEBARAN', 'BETELGEUSE', 'ARCTURUS', 'POLLUX', 'DENEB'];
  const starIndex = hashNumber % starNames.length;
  const starName = starNames[starIndex];
  
  // ID oluştur
  let id = `${prefix}-${hashString}-${starName}`;
  
  // Eğer uzunluk belirtilmişse, ID'yi kısalt veya uzat
  if (length && length > 0) {
    if (id.length > length) {
      id = id.substring(0, length);
    } else if (id.length < length) {
      // ID'yi uzatmak için hash'e ek karakterler ekle
      const extraChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      while (id.length < length) {
        const extraIndex = (hashNumber + id.length) % extraChars.length;
        id += extraChars[extraIndex];
      }
    }
  }
  
  return id;
}

// Export types for TypeScript users
export type { StellarIDOptions }; 