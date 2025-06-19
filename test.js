const { generateStellarID } = require('./dist/index.js');

console.log('🌟 Testing stellar-id library\n');

// Test basic functionality
console.log('Basic usage:');
console.log('generateStellarID("hello") =>', generateStellarID('hello'));
console.log('generateStellarID("world") =>', generateStellarID('world'));
console.log('generateStellarID("test") =>', generateStellarID('test'));

// Test deterministic behavior
console.log('\nDeterministic behavior (same input = same output):');
console.log('generateStellarID("hello") =>', generateStellarID('hello'));
console.log('generateStellarID("hello") =>', generateStellarID('hello'));

// Test custom prefix
console.log('\nCustom prefix:');
console.log('generateStellarID("hello", { prefix: "COSMIC" }) =>', generateStellarID('hello', { prefix: 'COSMIC' }));
console.log('generateStellarID("world", { prefix: "GALAXY" }) =>', generateStellarID('world', { prefix: 'GALAXY' }));

// Test different inputs
console.log('\nDifferent inputs:');
console.log('generateStellarID("user123") =>', generateStellarID('user123'));
console.log('generateStellarID("document456") =>', generateStellarID('document456'));
console.log('generateStellarID("session789") =>', generateStellarID('session789')); 