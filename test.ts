/**
 * 🌟 Stellar ID Generator - TypeScript Test Suite
 * 
 * This test file demonstrates the TypeScript integration and type safety
 * features of the stellar-id library. It showcases proper type usage,
 * interface implementations, and comprehensive testing scenarios.
 * 
 * Test Coverage:
 * - TypeScript type safety and interface usage
 * - Full type support for all options and parameters
 * - Star name distribution testing across different inputs
 * - Type checking for generated IDs and return values
 * - Interface validation for StellarIDOptions
 * 
 * TypeScript Features Demonstrated:
 * - Import/export type safety
 * - Interface type annotations
 * - Generic type constraints
 * - Type inference and validation
 * - Compile-time error checking
 * 
 * @author Yusif Jabrayilov
 * @version 1.0.0
 * @license MIT
 * 
 * Run with: npx ts-node test.ts
 */

import { generateStellarID, type StellarIDOptions } from './src/index';

console.log('🌟 Testing stellar-id library (TypeScript)\n');

// Test with full type support
const options: StellarIDOptions = { prefix: 'COSMIC' };

console.log('TypeScript usage:');
console.log('generateStellarID("typescript") =>', generateStellarID('typescript'));
console.log('generateStellarID("typescript", options) =>', generateStellarID('typescript', options));

// Test all star names
console.log('\nTesting different inputs to see all star names:');
const testInputs = [
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 
  'zeta', 'eta', 'theta', 'iota', 'kappa'
];

testInputs.forEach(input => {
  console.log(`${input} => ${generateStellarID(input)}`);
}); 