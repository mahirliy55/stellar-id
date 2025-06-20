/**
 * 🌟 Stellar ID Generator
 * 
 * A TypeScript library for generating unique, deterministic star-themed identifiers.
 * Each generated ID includes a real star name from NASA/HYG databases and a hash.
 * 
 * @author Yusif Jabrayilov
 * @version 1.0.0
 * @license MIT
 * @since 2024
 */

import { getRealStarData, getRealStarNames as getRealStarNamesFromDB, getStarInfo as getStarInfoFromDB, type StarData } from './stars-database';

// List of popular star names for fallback
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
  salt?: string; // Yeni özellik: Salt desteği
}

/**
 * Simple string hash function that generates a number between 0 and 9999
 * @param str - Input string to hash
 * @returns Hash number between 0-9999
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

// Performance optimizasyonu - Hash fonksiyonlarını optimize et
/**
 * Simple hash function for basic hashing
 * @param input - Input string
 * @returns Hash number
 */
function simpleHash(input: string): number {
  let hash = 0;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * DJB2 hash algorithm implementation
 * @param input - Input string
 * @returns Hash number
 */
function djb2Hash(input: string): number {
  let hash = 5381;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i);
  }
  return Math.abs(hash);
}

/**
 * FNV-1a hash algorithm implementation
 * @param input - Input string
 * @returns Hash number
 */
function fnv1aHash(input: string): number {
  let hash = 0x811c9dc5;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash);
}

// Validation fonksiyonları
/**
 * Validates input string
 * @param input - Input to validate
 * @throws Error if input is invalid
 */
function validateInput(input: string): void {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }
  if (input.length > 1000) {
    throw new Error('Input length must be less than 1000 characters');
  }
}

/**
 * Validates options object
 * @param options - Options to validate
 * @throws Error if options are invalid
 */
function validateOptions(options: StellarIDOptions): void {
  if (options.length !== undefined && (options.length < 1 || options.length > 100)) {
    throw new Error('Length must be between 1 and 100');
  }
  if (options.prefix && (options.prefix.length > 20 || !/^[A-Za-z0-9_-]+$/.test(options.prefix))) {
    throw new Error('Prefix must be alphanumeric, underscore, or hyphen, max 20 characters');
  }
  if (options.customStarNames && (!Array.isArray(options.customStarNames) || options.customStarNames.length === 0)) {
    throw new Error('Custom star names must be a non-empty array');
  }
  if (options.salt && options.salt.length > 100) {
    throw new Error('Salt must be less than 100 characters');
  }
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
  // Validation
  validateInput(input);
  validateOptions(options);
  
  const { 
    prefix = 'STAR', 
    length, 
    useSpecialChars = false, 
    case: caseOption = 'upper',
    hashAlgorithm = 'simple',
    customStarNames,
    format,
    salt
  } = options;
  
  // Salt ekle
  const saltedInput = salt ? `${input}${salt}` : input;
  
  // Hash oluştur
  let hash: number;
  switch (hashAlgorithm) {
    case 'djb2':
      hash = djb2Hash(saltedInput);
      break;
    case 'fnv1a':
      hash = fnv1aHash(saltedInput);
      break;
    case 'simple':
    default:
      hash = simpleHash(saltedInput);
      break;
  }
  
  // Hash'i 4 haneli sayıya dönüştür
  const hashNumber = hash % 10000;
  const hashString = hashNumber.toString().padStart(4, '0');
  
  // Yıldız isimleri - gerçek veritabanından çek
  let starNames: string[];
  if (customStarNames && customStarNames.length > 0) {
    starNames = customStarNames;
  } else {
    starNames = getRealStarNamesFromDB();
  }
  
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

// Utility fonksiyonları
/**
 * Validates if a string is a valid Stellar ID format
 * @param id - The ID to validate
 * @returns True if valid format
 */
export function validateStellarID(id: string): boolean {
  // Basit format kontrolü: PREFIX-NUMBER-STARNAME
  const pattern = /^[A-Z0-9_-]+-\d{4}-[A-Z]+$/;
  return pattern.test(id);
}

/**
 * Extracts parts from a Stellar ID
 * @param id - The ID to parse
 * @returns Object with prefix, hash, and starName or null if invalid
 */
export function extractStellarIDParts(id: string): { prefix: string; hash: string; starName: string } | null {
  if (!validateStellarID(id)) {
    return null;
  }
  
  const parts = id.split('-');
  if (parts.length >= 3) {
    return {
      prefix: parts[0],
      hash: parts[1],
      starName: parts[2]
    };
  }
  
  return null;
}

/**
 * Returns available star names
 * @returns Array of star names
 */
export function getAvailableStarNames(): string[] {
  return ['SIRIUS', 'VEGA', 'ALTAIR', 'RIGEL', 'ANTARES', 'ALDEBARAN', 'BETELGEUSE', 'ARCTURUS', 'POLLUX', 'DENEB'];
}

/**
 * Returns available hash algorithms
 * @returns Array of hash algorithm names
 */
export function getAvailableHashAlgorithms(): string[] {
  return ['simple', 'djb2', 'fnv1a'];
}

// Yeni: Gerçek yıldız verilerini getir
/**
 * Fetches real star data from external APIs
 * @returns Promise with star data array
 */
export async function getRealStarDataAsync(): Promise<StarData[]> {
  return getRealStarData();
}

// Yeni: Async ID generation (gerçek yıldız isimleri ile)
/**
 * Asynchronous version of generateStellarID that uses real star data
 * @param input - Input string
 * @param options - Generation options
 * @returns Promise with generated ID
 */
export async function generateStellarIDAsync(input: string, options: StellarIDOptions = {}): Promise<string> {
  // Validation
  validateInput(input);
  validateOptions(options);
  
  const { 
    prefix = 'STAR', 
    length, 
    useSpecialChars = false, 
    case: caseOption = 'upper',
    hashAlgorithm = 'simple',
    customStarNames,
    format,
    salt
  } = options;
  
  // Salt ekle
  const saltedInput = salt ? `${input}${salt}` : input;
  
  // Hash oluştur
  let hash: number;
  switch (hashAlgorithm) {
    case 'djb2':
      hash = djb2Hash(saltedInput);
      break;
    case 'fnv1a':
      hash = fnv1aHash(saltedInput);
      break;
    case 'simple':
    default:
      hash = simpleHash(saltedInput);
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

// Yeni utility fonksiyonları
/**
 * Gets information about a specific star
 * @param starName - Name of the star
 * @returns Star data or null if not found
 */
export function getStarInfo(starName: string): StarData | null {
  return getStarInfoFromDB(starName);
}

/**
 * Gets list of real star names
 * @returns Array of real star names
 */
export function getRealStarNames(): string[] {
  return getRealStarNamesFromDB();
}

// ============================================================================
// 🤖 AI INTEGRATION SECTION
// ============================================================================
// 
// This section is designed for easy AI integration. Follow these steps to add AI capabilities:
//
// STEP 1: Choose your AI provider
// - OpenAI GPT: Use OpenAI API for natural language processing
// - Anthropic Claude: Use Claude API for advanced reasoning
// - Google Gemini: Use Google's AI for creative tasks
// - Local AI: Use local models like Ollama or LM Studio
//
// STEP 2: Add AI configuration interface
// interface AIConfig {
//   provider: 'openai' | 'anthropic' | 'google' | 'local';
//   apiKey?: string;
//   model?: string;
//   temperature?: number;
//   maxTokens?: number;
// }
//
// STEP 3: Create AI-enhanced ID generation
// export async function generateStellarIDWithAI(
//   input: string, 
//   options: StellarIDOptions = {}, 
//   aiConfig: AIConfig
// ): Promise<string> {
//   // 1. Generate base ID
//   const baseId = generateStellarID(input, options);
//   
//   // 2. Use AI to enhance the ID with context
//   const enhancedId = await enhanceWithAI(baseId, input, aiConfig);
//   
//   return enhancedId;
// }
//
// STEP 4: Add AI-powered star name suggestions
// export async function suggestStarNames(
//   context: string, 
//   aiConfig: AIConfig
// ): Promise<string[]> {
//   // Use AI to suggest relevant star names based on context
//   const prompt = `Suggest 5 star names relevant to: ${context}`;
//   const response = await callAI(prompt, aiConfig);
//   return parseStarNames(response);
// }
//
// STEP 5: Add AI-powered ID validation
// export async function validateIDWithAI(
//   id: string, 
//   context: string, 
//   aiConfig: AIConfig
// ): Promise<{ valid: boolean; suggestions: string[] }> {
//   // Use AI to validate if ID matches context
//   const prompt = `Validate if this ID "${id}" is appropriate for: ${context}`;
//   const response = await callAI(prompt, aiConfig);
//   return parseValidation(response);
// }
//
// STEP 6: Add AI-powered custom formats
// export async function generateCustomFormat(
//   input: string, 
//   style: string, 
//   aiConfig: AIConfig
// ): Promise<string> {
//   // Use AI to generate custom ID formats
//   const prompt = `Create a ${style} format for ID based on: ${input}`;
//   const response = await callAI(prompt, aiConfig);
//   return response;
// }
//
// STEP 7: Add AI-powered star information
// export async function getStarInfoWithAI(
//   starName: string, 
//   aiConfig: AIConfig
// ): Promise<StarData & { aiDescription: string }> {
//   // Enhance star data with AI-generated descriptions
//   const baseInfo = getStarInfo(starName);
//   const aiDescription = await generateStarDescription(starName, aiConfig);
//   return { ...baseInfo, aiDescription };
// }
//
// STEP 8: Add AI-powered constellation suggestions
// export async function suggestConstellations(
//   stars: string[], 
//   aiConfig: AIConfig
// ): Promise<string[]> {
//   // Use AI to suggest constellation patterns
//   const prompt = `Suggest constellations for these stars: ${stars.join(', ')}`;
//   const response = await callAI(prompt, aiConfig);
//   return parseConstellations(response);
// }
//
// STEP 9: Add AI-powered ID optimization
// export async function optimizeID(
//   id: string, 
//   criteria: string[], 
//   aiConfig: AIConfig
// ): Promise<string> {
//   // Use AI to optimize ID based on criteria
//   const prompt = `Optimize this ID "${id}" for: ${criteria.join(', ')}`;
//   const response = await callAI(prompt, aiConfig);
//   return response;
// }
//
// STEP 10: Add AI-powered batch processing
// export async function generateBatchWithAI(
//   inputs: string[], 
//   options: StellarIDOptions = {}, 
//   aiConfig: AIConfig
// ): Promise<string[]> {
//   // Use AI to generate optimized batch of IDs
//   const prompt = `Generate IDs for: ${inputs.join(', ')}`;
//   const response = await callAI(prompt, aiConfig);
//   return parseBatchResponse(response);
// }
//
// EXAMPLE USAGE:
// const aiConfig = {
//   provider: 'openai',
//   apiKey: 'your-api-key',
//   model: 'gpt-4',
//   temperature: 0.7
// };
//
// const enhancedId = await generateStellarIDWithAI('my-project', {}, aiConfig);
// const suggestions = await suggestStarNames('space exploration', aiConfig);
// const optimizedId = await optimizeID('STAR-1234-VEGA', ['short', 'memorable'], aiConfig);
//
// ============================================================================
// END AI INTEGRATION SECTION
// ============================================================================ 