/**
 * 🚀 Stellar ID Generator Demo
 * 
 * This demo showcases the various features of the stellar-id library.
 * It demonstrates ID generation, custom options, and real star data integration.
 * 
 * @author Yusif Jabrayilov
 * @version 1.0.0
 */

const { generateStellarID, generateStellarIDAsync, getRealStarDataAsync, getRealStarNames, getStarInfo } = require('./dist/index.js');

console.log('🚀 Welcome to stellar-id demo!\n');

// Test inputs for demonstration
const testInputs = [
  'my-project',      // Basic project name
  'user-123',        // User identifier
  'document-456',    // Document reference
  'session-789',     // Session token
  'your-custom-input' // Custom input
];

console.log('Generated IDs:');
console.log('================');

// Generate IDs for each test input
testInputs.forEach(input => {
  const id = generateStellarID(input);
  console.log(`${input} → ${id}`);
});

console.log('\n🎯 Try changing the inputs in demo.js and save to see new results!');
console.log('💡 The development server will automatically rebuild when you save.');

// Demonstrate custom prefix functionality
console.log('\nCustom prefix example:');
console.log('======================');
console.log('generateStellarID("hello", { prefix: "COSMIC" }) →', generateStellarID('hello', { prefix: 'COSMIC' }));
console.log('generateStellarID("world", { prefix: "GALAXY" }) →', generateStellarID('world', { prefix: 'GALAXY' }));

// Demonstrate advanced features
console.log('\nAdvanced features examples:');
console.log('===========================');
console.log('Length control:', generateStellarID('test', { length: 15 }));
console.log('Special chars:', generateStellarID('test', { useSpecialChars: true, length: 20 }));
console.log('Lower case:', generateStellarID('test', { case: 'lower' }));
console.log('Mixed case:', generateStellarID('test', { case: 'mixed' }));
console.log('Custom format:', generateStellarID('test', { format: '{star}_{hash}_{prefix}' }));
console.log('With salt:', generateStellarID('test', { salt: 'mySecretSalt' }));

// Test real star database integration
console.log('\n🌟 Testing Real Star Database...');
async function testRealStarDatabase() {
  try {
    console.log('Getting real star data...');
    const realStars = await getRealStarDataAsync();
    console.log(`Found ${realStars.length} real stars!`);
    
    if (realStars.length > 0) {
      console.log('Sample stars:', realStars.slice(0, 5).map(s => s.name).join(', '));
      
      console.log('\nGenerating ID with real star data:');
      const realId = await generateStellarIDAsync('real-star-test');
      console.log('Real star ID:', realId);
      
      // Test star info functionality
      const starNames = getRealStarNames();
      console.log('\nAvailable star names:', starNames.slice(0, 10).join(', '));
      
      // Get specific star information
      const siriusInfo = getStarInfo('SIRIUS');
      if (siriusInfo) {
        console.log('\nSirius info:', {
          name: siriusInfo.name,
          distance: siriusInfo.distance,
          magnitude: siriusInfo.magnitude,
          constellation: siriusInfo.constellation
        });
      }
    }
  } catch (error) {
    console.log('Real star database test failed:', error.message);
    console.log('This is normal if running offline or if APIs are unavailable.');
  }
}

// Run the real star database test
testRealStarDatabase(); 