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