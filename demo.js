const { generateStellarID, generateStellarIDAsync, getRealStarDataAsync, getRealStarNames, getStarInfo } = require('./dist/index.js');

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

// Test new features
console.log('\nNew features examples:');
console.log('======================');
console.log('Length control:', generateStellarID('test', { length: 15 }));
console.log('Special chars:', generateStellarID('test', { useSpecialChars: true, length: 20 }));
console.log('Lower case:', generateStellarID('test', { case: 'lower' }));
console.log('Mixed case:', generateStellarID('test', { case: 'mixed' }));
console.log('Custom format:', generateStellarID('test', { format: '{star}_{hash}_{prefix}' }));
console.log('With salt:', generateStellarID('test', { salt: 'mySecretSalt' }));

// Test real star database
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
      
      // Test star info
      const starNames = getRealStarNames();
      console.log('\nAvailable star names:', starNames.slice(0, 10).join(', '));
      
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
  }
}

testRealStarDatabase(); 