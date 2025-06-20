/**
 * 🚀 Stellar ID Generator Demo
 * 
 * This demo showcases the various features of the stellar-id library.
 * It demonstrates ID generation, custom options, and real star data integration.
 * 
 * @author Yusif Jabrayilov
 * @version 1.0.0
 * @license MIT
 */

const { generateStellarID, generateStellarIDAsync, getRealStarDataAsync, getRealStarNames, getStarInfo, generateStellarURL, generateBatchStellarURLs, generateBrandedStellarURL, generateTemporaryStellarURL, generateProtectedStellarURL } = require('./dist/index.js');

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

// Test URL Shortener functionality
console.log('\n🔗 Testing URL Shortener...');
async function testURLShortener() {
  try {
    console.log('Generating Stellar URLs...');
    
    // Basic URL generation
    const basicUrl = await generateStellarURL('STAR-1234-VEGA');
    console.log('Basic URL:', basicUrl.shortUrl);
    
    // Branded URL
    const brandedUrl = await generateBrandedStellarURL('COSMIC-5678-SIRIUS', {
      name: 'MyCompany',
      domain: 'mycompany.com',
      logo: 'logo.svg'
    });
    console.log('Branded URL:', brandedUrl.shortUrl);
    
    // Temporary URL (expires in 7 days)
    const tempUrl = await generateTemporaryStellarURL('GALAXY-9012-ALTAIR', 7);
    console.log('Temporary URL:', tempUrl.shortUrl);
    console.log('Expires at:', tempUrl.expiresAt);
    
    // Password protected URL
    const protectedUrl = await generateProtectedStellarURL('STAR-3456-RIGEL', 'secret123');
    console.log('Protected URL:', protectedUrl.shortUrl);
    
    // Batch URL generation
    const batchUrls = await generateBatchStellarURLs(['STAR-1111-VEGA', 'STAR-2222-SIRIUS', 'STAR-3333-ALTAIR']);
    console.log('Batch URLs:', batchUrls.map(u => u.shortUrl));
    
  } catch (error) {
    console.log('URL Shortener test failed:', error.message);
  }
}

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

// Run the tests
testURLShortener();
testRealStarDatabase(); 