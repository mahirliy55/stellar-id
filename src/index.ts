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
  useSpecialChars?: boolean; // Yeni özellik: Özel karakterler kullan
  case?: 'upper' | 'lower' | 'mixed'; // Yeni özellik: Büyük/küçük harf kontrolü
  hashAlgorithm?: 'simple' | 'djb2' | 'fnv1a'; // Yeni özellik: Hash algoritması seçimi
  customStarNames?: string[]; // Yeni özellik: Özel yıldız isimleri
  format?: string; // Yeni özellik: ID formatı özelleştirme
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

// Hash fonksiyonları
function simpleHash(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function djb2Hash(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i);
  }
  return Math.abs(hash);
}

function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash);
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
  const { 
    prefix = 'STAR', 
    length, 
    useSpecialChars = false, 
    case: caseOption = 'upper',
    hashAlgorithm = 'simple',
    customStarNames,
    format
  } = options;
  
  // Hash oluştur
  let hash: number;
  switch (hashAlgorithm) {
    case 'djb2':
      hash = djb2Hash(input);
      break;
    case 'fnv1a':
      hash = fnv1aHash(input);
      break;
    case 'simple':
    default:
      hash = simpleHash(input);
      break;
  }
  
  // Hash'i 4 haneli sayıya dönüştür
  const hashNumber = hash % 10000;
  const hashString = hashNumber.toString().padStart(4, '0');
  
  // Yıldız isimleri
  const defaultStarNames = ['SIRIUS', 'VEGA', 'ALTAIR', 'RIGEL', 'ANTARES', 'ALDEBARAN', 'BETELGEUSE', 'ARCTURUS', 'POLLUX', 'DENEB'];
  const starNames = customStarNames && customStarNames.length > 0 ? customStarNames : defaultStarNames;
  const starIndex = hashNumber % starNames.length;
  const starName = starNames[starIndex];
  
  // ID oluştur
  let id: string;
  
  if (format) {
    // Özel format kullan
    id = format
      .replace('{prefix}', prefix)
      .replace('{hash}', hashString)
      .replace('{star}', starName)
      .replace('{input}', input.substring(0, 10)); // Input'un ilk 10 karakteri
  } else {
    // Varsayılan format
    id = `${prefix}-${hashString}-${starName}`;
  }
  
  // Eğer uzunluk belirtilmişse, ID'yi kısalt veya uzat
  if (length && length > 0) {
    if (id.length > length) {
      id = id.substring(0, length);
    } else if (id.length < length) {
      // ID'yi uzatmak için hash'e ek karakterler ekle
      const extraChars = useSpecialChars 
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?' 
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      while (id.length < length) {
        const extraIndex = (hashNumber + id.length) % extraChars.length;
        id += extraChars[extraIndex];
      }
    }
  }
  
  // Case sensitivity uygula
  switch (caseOption) {
    case 'lower':
      id = id.toLowerCase();
      break;
    case 'mixed':
      // Karışık case için bazı karakterleri küçük harf yap
      id = id.split('').map((char, index) => {
        if (index % 2 === 0 && /[A-Z]/.test(char)) {
          return char.toLowerCase();
        }
        return char;
      }).join('');
      break;
    case 'upper':
    default:
      // Zaten büyük harf, değişiklik yok
      break;
  }
  
  return id;
}

// Export types for TypeScript users
export type { StellarIDOptions }; 