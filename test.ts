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

import { generateStellarID, type StellarIDOptions, validateInput, validateOptions } from './src/index';

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

// --- Validation Function Tests ---
console.log('\n🧪 Testing validation functions...');

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`✅ [PASS] ${name}`);
  } catch (e) {
    console.error(`❌ [FAIL] ${name}`, e.message);
  }
}

// Tests for validateInput
runTest('validateInput: should accept a valid string', () => {
  validateInput('valid-string');
});

runTest('validateInput: should throw on empty string', () => {
  try {
    validateInput('');
    throw new Error('Test failed: Expected an error for empty string');
  } catch (e) {
    if (e.message !== 'Input must be a non-empty string') throw e;
  }
});

runTest('validateInput: should throw on null input', () => {
  try {
    validateInput(null);
    throw new Error('Test failed: Expected an error for null input');
  } catch (e) {
    if (e.message !== 'Input must be a non-empty string') throw e;
  }
});

// Tests for validateOptions
runTest('validateOptions: should accept valid options', () => {
  validateOptions({ prefix: 'TEST', length: 10 });
});

runTest('validateOptions: should throw on invalid prefix', () => {
  try {
    validateOptions({ prefix: 'INVALID PREFIX!' });
    throw new Error('Test failed: Expected an error for invalid prefix');
  } catch (e) {
    if (!e.message.includes('Prefix must be alphanumeric')) throw e;
  }
});

runTest('validateOptions: should throw on invalid length', () => {
  try {
    validateOptions({ length: 999 });
    throw new Error('Test failed: Expected an error for invalid length');
  } catch (e) {
    if (!e.message.includes('Length must be between 1 and 100')) throw e;
  }
});

console.log('\nValidation tests complete.'); 