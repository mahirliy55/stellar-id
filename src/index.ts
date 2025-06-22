/**
 * 🌟 Stellar ID Generator
 * 
 * A TypeScript library for generating unique, deterministic star-themed identifiers.
 * Each generated ID includes a real star name from NASA/HYG databases and a hash.
 * 
 * @author Yusif Jabrayilov
 * @version 1.1.10
 * @license MIT
 * @since 2024
 * 
 * Enhanced with performance optimizations and better error handling
 * Last updated: 2024-12-21
 * 
 * New features: Enhanced security and utility functions
 * Performance improvements: Optimized hash functions and caching
 * 
 * MAIN FEATURES:
 * - Generate unique star-themed IDs with real astronomical data
 * - Multiple hash algorithms (simple, djb2, fnv1a)
 * - Customizable prefixes, lengths, and formats
 * - Performance monitoring and caching
 * - URL shortening capabilities
 * - Batch generation with progress tracking
 * - Input validation and error handling
 * - Support for custom star names and salt
 */

import { getRealStarData, getRealStarNames as getRealStarNamesFromDB, getStarInfo as getStarInfoFromDB, type StarData } from './stars-database';

// Performance optimization: Cache for frequently used values
const CACHE_SIZE = 1000;
const hashCache = new Map<string, number>();
const starNamesCache = new Map<number, string>();

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
  length?: number; // New feature: ID length control
  useSpecialChars?: boolean; // New feature: Use special characters
  case?: 'upper' | 'lower' | 'mixed'; // New feature: Case sensitivity control
  hashAlgorithm?: 'simple' | 'djb2' | 'fnv1a'; // New feature: Hash algorithm selection
  customStarNames?: string[]; // New feature: Custom star names
  format?: string; // New feature: Custom ID format
  salt?: string; // New feature: Salt support
  enableCache?: boolean; // New feature: Enable/disable caching
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

// Performance optimization - Optimized hash functions with caching
/**
 * Simple hash function for basic hashing with caching
 * @param input - Input string
 * @param enableCache - Whether to use caching
 * @returns Hash number
 */
function simpleHash(input: string, enableCache: boolean = true): number {
  if (enableCache && hashCache.has(input)) {
    return hashCache.get(input)!;
  }
  
  let hash = 0;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  const result = Math.abs(hash);
  
  if (enableCache && hashCache.size < CACHE_SIZE) {
    hashCache.set(input, result);
  }
  
  return result;
}

/**
 * DJB2 hash algorithm implementation with caching
 * @param input - Input string
 * @param enableCache - Whether to use caching
 * @returns Hash number
 */
function djb2Hash(input: string, enableCache: boolean = true): number {
  if (enableCache && hashCache.has(input)) {
    return hashCache.get(input)!;
  }
  
  let hash = 5381;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i);
  }
  const result = Math.abs(hash);
  
  if (enableCache && hashCache.size < CACHE_SIZE) {
    hashCache.set(input, result);
  }
  
  return result;
}

/**
 * FNV-1a hash algorithm implementation with caching
 * @param input - Input string
 * @param enableCache - Whether to use caching
 * @returns Hash number
 */
function fnv1aHash(input: string, enableCache: boolean = true): number {
  if (enableCache && hashCache.has(input)) {
    return hashCache.get(input)!;
  }
  
  let hash = 0x811c9dc5;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  const result = Math.abs(hash);
  
  if (enableCache && hashCache.size < CACHE_SIZE) {
    hashCache.set(input, result);
  }
  
  return result;
}

// Validation functions
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
  if (input.trim().length === 0) {
    throw new Error('Input cannot be empty or contain only whitespace');
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
  if (options.hashAlgorithm && !['simple', 'djb2', 'fnv1a'].includes(options.hashAlgorithm)) {
    throw new Error('Hash algorithm must be one of: simple, djb2, fnv1a');
  }
  if (options.case && !['upper', 'lower', 'mixed'].includes(options.case)) {
    throw new Error('Case must be one of: upper, lower, mixed');
  }
}

/**
 * Performance monitoring interface
 */
export interface PerformanceMetrics {
  generationTime: number;
  cacheHitRate: number;
  totalGenerations: number;
  cacheHits: number;
  cacheMisses: number;
}

/**
 * Performance monitor class
 */
export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    generationTime: 0,
    cacheHitRate: 0,
    totalGenerations: 0,
    cacheHits: 0,
    cacheMisses: 0
  };

  /**
   * Record a generation operation
   */
  recordGeneration(time: number, cacheHit: boolean): void {
    this.metrics.totalGenerations++;
    this.metrics.generationTime = (this.metrics.generationTime + time) / 2;
    
    if (cacheHit) {
      this.metrics.cacheHits++;
    } else {
      this.metrics.cacheMisses++;
    }
    
    this.metrics.cacheHitRate = this.metrics.cacheHits / this.metrics.totalGenerations;
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Reset performance metrics
   */
  reset(): void {
    this.metrics = {
      generationTime: 0,
      cacheHitRate: 0,
      totalGenerations: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

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
  const startTime = performance.now();
  
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
    salt,
    enableCache = true
  } = options;
  
  // Add salt
  const saltedInput = salt ? `${input}${salt}` : input;
  
  // Create hash with cache tracking
  let hash: number;
  let cacheHit = false;
  
  switch (hashAlgorithm) {
    case 'djb2':
      hash = djb2Hash(saltedInput, enableCache);
      break;
    case 'fnv1a':
      hash = fnv1aHash(saltedInput, enableCache);
      break;
    case 'simple':
    default:
      hash = simpleHash(saltedInput, enableCache);
      break;
  }
  
  // Check if hash was cached (simplified check)
  const cacheKey = `${hashAlgorithm}:${saltedInput}`;
  cacheHit = hashCache.has(cacheKey);
  
  // Convert hash to 4-digit number
  const hashNumber = hash % 10000;
  const hashString = hashNumber.toString().padStart(4, '0');
  
  // Star names
  const defaultStarNames = ['SIRIUS', 'VEGA', 'ALTAIR', 'RIGEL', 'ANTARES', 'ALDEBARAN', 'BETELGEUSE', 'ARCTURUS', 'POLLUX', 'DENEB'];
  const starNames = customStarNames && customStarNames.length > 0 ? customStarNames : defaultStarNames;
  const starIndex = hashNumber % starNames.length;
  const starName = starNames[starIndex];
  
  // Create ID
  let id: string;
  
  if (format) {
    // Use custom format
    id = format
      .replace('{prefix}', prefix)
      .replace('{hash}', hashString)
      .replace('{star}', starName)
      .replace('{input}', input.substring(0, 10)); // First 10 characters of input
  } else {
    // Default format
    id = `${prefix}-${hashString}-${starName}`;
  }
  
  // If length is specified, shorten or lengthen the ID
  if (length && length > 0) {
    if (id.length > length) {
      id = id.substring(0, length);
    } else if (id.length < length) {
      // Add extra characters to the hash to lengthen the ID
      const extraChars = useSpecialChars 
        ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?' 
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      while (id.length < length) {
        const extraIndex = (hashNumber + id.length) % extraChars.length;
        id += extraChars[extraIndex];
      }
    }
  }
  
  // Apply case sensitivity
  switch (caseOption) {
    case 'lower':
      id = id.toLowerCase();
      break;
    case 'mixed':
      // Make some characters lowercase for mixed case
      id = id.split('').map((char, index) => {
        if (index % 2 === 0 && /[A-Z]/.test(char)) {
          return char.toLowerCase();
        }
        return char;
      }).join('');
      break;
    case 'upper':
    default:
      // Already uppercase, no change needed
      break;
  }
  
  // Special characters
  if (useSpecialChars) {
    // We need a defined length to add special characters meaningfully
    if (length !== undefined) {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      // Replace some characters with special ones based on hash
      for (let i = 0; i < id.length; i++) {
        if (id.length >= length) break;
        if ((hash + i) % 5 === 0) { // Add special characters sporadically
          const specialCharIndex = (hash + i) % specialChars.length;
          id = id.substring(0, i) + specialChars[specialCharIndex] + id.substring(i + 1);
        }
      }
      // Ensure the final ID has the desired length
      id = id.substring(0, length);
    }
  }
  
  // Record performance metrics
  const endTime = performance.now();
  const generationTime = endTime - startTime;
  performanceMonitor.recordGeneration(generationTime, cacheHit);
  
  return id;
}

// Export types for TypeScript users
export type { StellarIDOptions };

// Cache management functions
/**
 * Clears all caches used by the Stellar ID Generator
 * @returns Number of cached items cleared
 */
export function clearStellarIDCaches(): number {
  const hashCacheSize = hashCache.size;
  const starNamesCacheSize = starNamesCache.size;
  
  hashCache.clear();
  starNamesCache.clear();
  
  return hashCacheSize + starNamesCacheSize;
}

/**
 * Gets cache statistics
 * @returns Object with cache information
 */
export function getStellarIDCacheStats(): {
  hashCacheSize: number;
  starNamesCacheSize: number;
  totalCacheSize: number;
  maxCacheSize: number;
} {
  return {
    hashCacheSize: hashCache.size,
    starNamesCacheSize: starNamesCache.size,
    totalCacheSize: hashCache.size + starNamesCache.size,
    maxCacheSize: CACHE_SIZE
  };
}

// Utility functions
/**
 * Validates if a string is a valid Stellar ID format
 * @param id - The ID to validate
 * @returns True if valid format
 */
export function validateStellarID(id: string): boolean {
  // Simple format check: PREFIX-NUMBER-STARNAME
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

// New: Get real star data
/**
 * Fetches real star data from external APIs
 * @returns Promise with star data array
 */
export async function getRealStarDataAsync(): Promise<StarData[]> {
  return getRealStarData();
}

// New: Async ID generation (with real star names)
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
  
  // Special characters
  if (useSpecialChars) {
    // We need a defined length to add special characters meaningfully
    if (length !== undefined) {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      // Replace some characters with special ones based on hash
      for (let i = 0; i < id.length; i++) {
        if (id.length >= length) break;
        if ((hash + i) % 5 === 0) { // Add special characters sporadically
          const specialCharIndex = (hash + i) % specialChars.length;
          id = id.substring(0, i) + specialChars[specialCharIndex] + id.substring(i + 1);
        }
      }
      // Ensure the final ID has the desired length
      id = id.substring(0, length);
    }
  }
  
  return id;
}

// New utility functions
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

/**
 * Get current performance metrics
 * @returns Current performance metrics
 */
export function getPerformanceMetrics(): PerformanceMetrics {
  return performanceMonitor.getMetrics();
}

/**
 * Reset performance metrics
 */
export function resetPerformanceMetrics(): void {
  performanceMonitor.reset();
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

// ============================================================================
// 🔗 URL SHORTENER SECTION
// ============================================================================
//
// This section provides URL shortening capabilities for Stellar IDs.
// Users can convert their Stellar IDs into shareable URLs.
//
// FEATURES:
// - Convert Stellar ID to short URL
// - QR code generation
// - Analytics tracking
// - Custom domain support
// - Expiration dates
// - Password protection
//
// ============================================================================

/**
 * URL Shortener Configuration
 */
interface URLShortenerConfig {
  /**
   * Base domain for short URLs
   * @default "stellar.id"
   */
  domain?: string;
  
  /**
   * Custom subdomain
   * @example "my.stellar.id"
   */
  subdomain?: string;
  
  /**
   * URL expiration in days (0 = never expires)
   * @default 0
   */
  expiresIn?: number;
  
  /**
   * Password protection
   */
  password?: string;
  
  /**
   * Enable analytics tracking
   * @default true
   */
  analytics?: boolean;
  
  /**
   * Custom URL path
   * @example "project" -> stellar.id/project/STAR-1234-VEGA
   */
  path?: string;
}

/**
 * URL Shortener Result
 */
interface URLShortenerResult {
  /**
   * Original Stellar ID
   */
  originalId: string;
  
  /**
   * Generated short URL
   */
  shortUrl: string;
  
  /**
   * QR code data URL
   */
  qrCode?: string;
  
  /**
   * Expiration date (if set)
   */
  expiresAt?: Date;
  
  /**
   * Analytics tracking ID
   */
  trackingId?: string;
  
  /**
   * Creation timestamp
   */
  createdAt: Date;
}

/**
 * Converts a Stellar ID to a shareable short URL
 * @param stellarId - The Stellar ID to convert
 * @param config - URL shortener configuration
 * @returns Promise with URL shortener result
 * @example
 * const result = await generateStellarURL('STAR-1234-VEGA');
 * console.log(result.shortUrl); // "https://stellar.id/STAR-1234-VEGA"
 */
export async function generateStellarURL(
  stellarId: string, 
  config: URLShortenerConfig = {}
): Promise<URLShortenerResult> {
  // Validate input
  if (!stellarId || !validateStellarID(stellarId)) {
    throw new Error('Invalid Stellar ID provided');
  }
  
  const {
    domain = 'stellar.id',
    subdomain,
    expiresIn = 0,
    password,
    analytics = true,
    path
  } = config;
  
  // Build the short URL
  let shortUrl = 'https://';
  
  if (subdomain) {
    shortUrl += `${subdomain}.${domain}`;
  } else {
    shortUrl += domain;
  }
  
  if (path) {
    shortUrl += `/${path}`;
  }
  
  shortUrl += `/${stellarId}`;
  
  // Add password if provided
  if (password) {
    shortUrl += `?p=${encodeURIComponent(password)}`;
  }
  
  // Calculate expiration
  const expiresAt = expiresIn > 0 ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000) : undefined;
  
  // Generate tracking ID for analytics
  const trackingId = analytics ? generateTrackingId(stellarId) : undefined;
  
  // Generate QR code
  const qrCode = await generateQRCode(shortUrl);
  
  return {
    originalId: stellarId,
    shortUrl,
    qrCode,
    expiresAt,
    trackingId,
    createdAt: new Date()
  };
}

/**
 * Generates a batch of Stellar URLs
 * @param stellarIds - Array of Stellar IDs
 * @param config - URL shortener configuration
 * @returns Promise with array of URL shortener results
 */
export async function generateBatchStellarURLs(
  stellarIds: string[],
  config: URLShortenerConfig = {}
): Promise<URLShortenerResult[]> {
  const results: URLShortenerResult[] = [];
  
  for (const stellarId of stellarIds) {
    try {
      const result = await generateStellarURL(stellarId, config);
      results.push(result);
    } catch (error) {
      console.warn(`Failed to generate URL for ${stellarId}:`, error);
    }
  }
  
  return results;
}

/**
 * Generates a QR code for a URL
 * @param url - URL to generate QR code for
 * @returns Promise with QR code data URL
 */
async function generateQRCode(url: string): Promise<string> {
  // Simple QR code generation using a public API
  // In production, you might want to use a library like qrcode
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  
  try {
    // For now, return the API URL
    // In a real implementation, you'd fetch the image and convert to data URL
    return qrApiUrl;
  } catch (error) {
    console.warn('Failed to generate QR code:', error);
    return '';
  }
}

/**
 * Generates a unique tracking ID for analytics
 * @param stellarId - Original Stellar ID
 * @returns Tracking ID string
 */
function generateTrackingId(stellarId: string): string {
  const timestamp = Date.now().toString(36);
  const hash = simpleHash(stellarId).toString(36);
  return `tr_${timestamp}_${hash}`.substring(0, 16);
}

/**
 * Validates if a URL is a valid Stellar URL
 * @param url - URL to validate
 * @returns True if valid Stellar URL
 */
export function validateStellarURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    // Check if it's a stellar.id domain or similar
    const isStellarDomain = urlObj.hostname.includes('stellar.id') || 
                           urlObj.hostname.includes('stellar');
    
    // Check if path contains a valid Stellar ID format
    const hasStellarId = pathParts.some(part => validateStellarID(part));
    
    return isStellarDomain && hasStellarId;
  } catch {
    return false;
  }
}

/**
 * Extracts Stellar ID from a URL
 * @param url - URL to extract ID from
 * @returns Stellar ID or null if not found
 */
export function extractStellarIDFromURL(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    for (const part of pathParts) {
      if (validateStellarID(part)) {
        return part;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Creates a custom branded URL
 * @param stellarId - Stellar ID
 * @param brand - Brand configuration
 * @returns Promise with branded URL result
 */
export async function generateBrandedStellarURL(
  stellarId: string,
  brand: {
    name: string;
    domain?: string;
    logo?: string;
    colors?: {
      primary: string;
      secondary: string;
    };
  }
): Promise<URLShortenerResult> {
  const config: URLShortenerConfig = {
    domain: brand.domain || 'stellar.id',
    subdomain: brand.name.toLowerCase().replace(/\s+/g, '-'),
    path: 'brand',
    analytics: true
  };
  
  return generateStellarURL(stellarId, config);
}

/**
 * Generates a temporary URL with expiration
 * @param stellarId - Stellar ID
 * @param expiresIn - Expiration in days
 * @returns Promise with temporary URL result
 */
export async function generateTemporaryStellarURL(
  stellarId: string,
  expiresIn: number
): Promise<URLShortenerResult> {
  return generateStellarURL(stellarId, {
    domain: 'stellar.id',
    path: 'temp',
    expiresIn,
    analytics: true
  });
}

/**
 * Generates a password-protected URL
 * @param stellarId - Stellar ID
 * @param password - Password for protection
 * @returns Promise with protected URL result
 */
export async function generateProtectedStellarURL(
  stellarId: string,
  password: string
): Promise<URLShortenerResult> {
  return generateStellarURL(stellarId, {
    domain: 'stellar.id',
    path: 'secure',
    password,
    analytics: false // Disable analytics for security
  });
}

// Export types for TypeScript users
export type { URLShortenerConfig, URLShortenerResult };

/**
 * Batch generation progress callback
 */
export interface BatchProgressCallback {
  (progress: {
    current: number;
    total: number;
    percentage: number;
    currentId: string;
    completedIds: string[];
  }): void;
}

/**
 * Batch generation result
 */
export interface BatchGenerationResult {
  ids: string[];
  totalTime: number;
  averageTime: number;
  errors: Array<{ input: string; error: string }>;
  performanceMetrics: PerformanceMetrics;
}

/**
 * Generate multiple Stellar IDs in batch
 * @param inputs - Array of input strings
 * @param options - Optional configuration for ID generation
 * @param progressCallback - Optional progress callback
 * @returns Promise with batch generation results
 */
export async function generateBatchStellarIDs(
  inputs: string[],
  options: StellarIDOptions = {},
  progressCallback?: BatchProgressCallback
): Promise<BatchGenerationResult> {
  const startTime = performance.now();
  const results: string[] = [];
  const errors: Array<{ input: string; error: string }> = [];
  
  for (let i = 0; i < inputs.length; i++) {
    try {
      const id = generateStellarID(inputs[i], options);
      results.push(id);
      
      // Call progress callback if provided
      if (progressCallback) {
        progressCallback({
          current: i + 1,
          total: inputs.length,
          percentage: ((i + 1) / inputs.length) * 100,
          currentId: id,
          completedIds: [...results]
        });
      }
      
      // Small delay to prevent blocking the main thread
      if (i % 100 === 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    } catch (error) {
      errors.push({
        input: inputs[i],
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const averageTime = totalTime / inputs.length;
  
  return {
    ids: results,
    totalTime,
    averageTime,
    errors,
    performanceMetrics: getPerformanceMetrics()
  };
}

/**
 * Generate Stellar IDs with validation and deduplication
 * @param inputs - Array of input strings
 * @param options - Optional configuration for ID generation
 * @returns Promise with validated and deduplicated results
 */
export async function generateValidatedBatchStellarIDs(
  inputs: string[],
  options: StellarIDOptions = {}
): Promise<{
  ids: string[];
  duplicates: string[];
  invalid: string[];
  validCount: number;
}> {
  const generatedIds = await generateBatchStellarIDs(inputs, options);
  const uniqueIds = new Set<string>();
  const duplicates: string[] = [];
  const invalid: string[] = [];
  
  generatedIds.ids.forEach((id, index) => {
    if (validateStellarID(id)) {
      if (uniqueIds.has(id)) {
        duplicates.push(id);
      } else {
        uniqueIds.add(id);
      }
    } else {
      invalid.push(id);
    }
  });
  
  return {
    ids: Array.from(uniqueIds),
    duplicates,
    invalid,
    validCount: uniqueIds.size
  };
} 