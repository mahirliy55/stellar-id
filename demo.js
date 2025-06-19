const { generateStellarID } = require('./dist/index.js');

console.log('🚀 Welcome to stellar-id demo!\n');

// Try changing these values to see different results
const testInputs = [
  'my-project',
  'user-123',
  'document-456',
  'session-789',
  'your-custom-input'
];

console.log('Generated IDs:');
console.log('================');

testInputs.forEach(input => {
  const id = generateStellarID(input);
  console.log(`${input} → ${id}`);
});

console.log('\n🎯 Try changing the inputs in demo.js and save to see new results!');
console.log('💡 The development server will automatically rebuild when you save.');

// Test custom prefix
console.log('\nCustom prefix example:');
console.log('======================');
console.log('generateStellarID("hello", { prefix: "COSMIC" }) →', generateStellarID('hello', { prefix: 'COSMIC' }));
console.log('generateStellarID("world", { prefix: "GALAXY" }) →', generateStellarID('world', { prefix: 'GALAXY' })); 