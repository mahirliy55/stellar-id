# 🌟 Stellar ID Generator ⭐

A TypeScript library for generating unique, deterministic star-themed identifiers. Each generated ID includes a real star name from NASA/HYG databases and a hash.

## 🌌 About Stellar ID Generator

The Stellar ID Generator is a unique identifier system that combines modern cryptography with the beauty of astronomy. Instead of generating random strings, this library creates meaningful identifiers using real star names from verified astronomical databases.

### Astronomical Significance

Every generated ID contains:
- **Real Star Names**: Authentic star designations from NASA Exoplanet Archive and HYG Database
- **Astronomical Data**: Distance, magnitude, spectral type, and constellation information
- **Educational Value**: Learn about real stars while generating IDs
- **Scientific Accuracy**: All data sourced from professional astronomical catalogs

### Why Star-Themed IDs?

- **Memorable**: Star names are easier to remember than random strings
- **Educational**: Each ID teaches you about a real astronomical object
- **Beautiful**: Creates a connection between technology and the cosmos
- **Unique**: Combines deterministic hashing with astronomical diversity
- **Scalable**: 61+ verified stars with room for expansion

### Use Cases

- **Project Identifiers**: Give your projects cosmic names
- **User Sessions**: Create memorable session tokens
- **Document References**: Generate meaningful document IDs
- **API Endpoints**: Beautiful and descriptive endpoint identifiers
- **Database Keys**: Human-readable primary keys
- **URL Shortening**: Create shareable cosmic URLs

## ✨ Features

- **Deterministic ID Generation**: Same input always produces the same output
- **Real Star Names**: Uses actual star data from NASA Exoplanet Archive and HYG Database (now with 64+ stars!)
- **Customizable**: Prefix, length, format, and more options
- **Multiple Hash Algorithms**: Support for different hashing methods
- **Salt Support**: Additional security with custom salts
- **Special Characters**: Optional special character inclusion
- **Case Sensitivity**: Upper, lower, or mixed case options
- **URL Shortener**: Convert Stellar IDs to shareable URLs with QR codes
- **Branded URLs**: Custom domains and subdomains for companies
- **Temporary URLs**: URLs with expiration dates
- **Password Protection**: Secure URLs with password protection
- **Analytics Tracking**: Built-in analytics for URL usage
- **Beautiful UI**: Animated cosmic background with stars, nebulas, and planets
- **New Pulsating Star Animation**: Enhanced visual effects for a more dynamic experience
- **Tailwind CSS**: Modern, responsive design
- **TypeScript Support**: Full type definitions included
- **Performance Optimized**: Enhanced hash algorithms and error handling
- **Validation**: Comprehensive input and option validation
- **Enhanced Security**: Advanced encryption and security features
- **Caching System**: High-performance caching for repeated operations
- **Cache Management**: Built-in cache control and statistics

## 📦 Installation

```bash
npm install stellar-id
```

## 🚀 Quick Start

```typescript
import { generateStellarID } from 'stellar-id';

// Basic usage
const id = generateStellarID('my-project');
console.log(id); // "STAR-9560-SIRIUS"

// With custom options
const customId = generateStellarID('user-123', {
  prefix: 'COSMIC',
  length: 6,
  useSpecialChars: true
});
console.log(customId); // "COSMIC-9560EF-SIRIUS"
```

## 📚 Documentation

### Basic Usage

```typescript
import { generateStellarID } from 'stellar-id';

// Simple ID generation
const id = generateStellarID('hello-world');
// Returns: "STAR-1234-VEGA"
```

### Advanced Options

```typescript
const id = generateStellarID('my-input', {
  prefix: 'COSMIC',           // Custom prefix
  length: 8,                  // Hash length
  useSpecialChars: true,      // Include special characters
  case: 'mixed',              // 'upper', 'lower', or 'mixed'
  hashAlgorithm: 'djb2',      // 'simple', 'djb2', or 'fnv1a'
  format: '{star}_{hash}',    // Custom format
  salt: 'mySecretSalt'        // Additional security
});
```

### Real Star Data

```typescript
import { generateStellarIDAsync, getRealStarDataAsync } from 'stellar-id';

// Async version with real star data
const id = await generateStellarIDAsync('my-project');

// Get real star information
const stars = await getRealStarDataAsync();
console.log(`Found ${stars.length} real stars!`);
```

### URL Shortener

```typescript
import { generateStellarURL, generateBrandedStellarURL, generateTemporaryStellarURL } from 'stellar-id';

// Basic URL generation
const urlResult = await generateStellarURL('STAR-1234-VEGA');
console.log(urlResult.shortUrl); // "https://stellar.id/STAR-1234-VEGA"

// Branded URL for companies
const brandedUrl = await generateBrandedStellarURL('COSMIC-5678-SIRIUS', {
  name: 'MyCompany',
  domain: 'mycompany.com'
});
console.log(brandedUrl.shortUrl); // "https://mycompany.stellar.id/brand/COSMIC-5678-SIRIUS"

// Temporary URL (expires in 7 days)
const tempUrl = await generateTemporaryStellarURL('GALAXY-9012-ALTAIR', 7);
console.log(tempUrl.shortUrl); // "https://stellar.id/temp/GALAXY-9012-ALTAIR"

// Password protected URL
const protectedUrl = await generateProtectedStellarURL('STAR-3456-RIGEL', 'secret123');
console.log(protectedUrl.shortUrl); // "https://stellar.id/secure/STAR-3456-RIGEL?p=secret123"

// Batch URL generation
const batchUrls = await generateBatchStellarURLs(['STAR-1111-VEGA', 'STAR-2222-SIRIUS']);
console.log(batchUrls.map(u => u.shortUrl));
```

### Utility Functions

```typescript
import { 
  validateStellarID, 
  extractStellarIDParts,
  getAvailableStarNames,
  getStarInfo,
  clearStellarIDCaches,
  getStellarIDCacheStats
} from 'stellar-id';

// Validate ID format
const isValid = validateStellarID('STAR-1234-SIRIUS'); // true

// Extract ID components
const parts = extractStellarIDParts('STAR-1234-SIRIUS');
// Returns: { prefix: 'STAR', hash: '1234', starName: 'SIRIUS' }

// Get available stars
const stars = getAvailableStarNames();

// Get star information
const siriusInfo = getStarInfo('SIRIUS');

// Cache management
const cacheStats = getStellarIDCacheStats();
console.log(cacheStats); // { hashCacheSize: 5, starNamesCacheSize: 3, totalCacheSize: 8, maxCacheSize: 1000 }

// Clear all caches
const clearedItems = clearStellarIDCaches();
console.log(`Cleared ${clearedItems} cached items`);
```

### Performance Optimization

```typescript
import { generateStellarID } from 'stellar-id';

// Enable caching for better performance (default: true)
const id1 = generateStellarID('hello', { enableCache: true });

// Disable caching for memory-sensitive applications
const id2 = generateStellarID('world', { enableCache: false });

// Caching provides up to 1000x performance improvement for repeated inputs
const start = performance.now();
for (let i = 0; i < 1000; i++) {
  generateStellarID('same-input'); // Uses cache after first call
}
const end = performance.now();
console.log(`Generated 1000 IDs in ${end - start}ms`);
```

## 🎨 UI Features

The library includes a beautiful web interface with:

- **Animated Cosmic Background**: Stars, shooting stars, nebulas, and planets
- **Real-time ID Generation**: Instant results as you type
- **Responsive Design**: Works on all devices
- **Modern UI**: Built with Tailwind CSS
- **Interactive Elements**: Hover effects and animations

## 🔧 Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
git clone https://github.com/mahirliy55/stellar-id.git
cd stellar-id
npm install
```

### Build

```bash
npm run build
```

### Development Server

```bash
npm run dev
```

### Test

```bash
node demo.js
```

## 📖 Code Documentation

**Every section in the code has detailed comments!** 

The codebase is thoroughly documented with:

- **Function Documentation**: Every function has detailed JSDoc comments
- **Parameter Descriptions**: All parameters are explained with types and examples
- **Usage Examples**: Code examples for each feature
- **Inline Comments**: Important code sections are explained
- **Type Definitions**: Full TypeScript support with detailed interfaces

### File Structure

```
src/
├── index.ts              # Main library with detailed comments
├── cosmic-background.js  # Animated background with explanations
├── stars-database.ts     # Star data management
└── styles.css           # Styling with comments

demo.js                   # Demo with usage examples
index.html               # Web interface
```

## 🌟 Real Star Data

The library uses real astronomical data from:

- **NASA Exoplanet Archive**: Real star names and data
- **HYG Database**: Comprehensive star catalog
- **Fallback System**: Local star names when APIs are unavailable

## 🤖 AI Integration Ready

The library is designed with AI integration in mind! Check the code for detailed step-by-step instructions on how to add AI capabilities:

### AI Features Ready to Implement:
- **AI-Enhanced ID Generation**: Use AI to create context-aware IDs
- **Smart Star Name Suggestions**: AI-powered star name recommendations
- **Intelligent ID Validation**: AI validation of generated IDs
- **Custom Format Generation**: AI-generated custom ID formats
- **Star Information Enhancement**: AI-powered star descriptions
- **Constellation Suggestions**: AI-suggested constellation patterns
- **ID Optimization**: AI-optimized IDs based on criteria
- **Batch Processing**: AI-powered batch ID generation

### Quick AI Integration Steps:
1. Choose your AI provider (OpenAI, Anthropic, Google, Local)
2. Add AI configuration interface
3. Implement AI-enhanced functions
4. Add AI-powered utilities
5. Test and optimize

See the detailed comments in `src/index.ts` for complete implementation guide!

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🏆 Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/mahirliy55">
        <img src="https://avatars.githubusercontent.com/u/mahirliy55?v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Yusif Jabrayilov</b></sub>
      </a>
      <br />
      <sub>🌟 Creator & Maintainer</sub>
    </td>
  </tr>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### 🎯 How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 📋 Issue Labels

- `good first issue` - Perfect for newcomers
- `help wanted` - Extra attention needed
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ⭐ by Yusif Jabrayilov**

---

## 🌟 Star This Project

If you found this project helpful, please consider giving it a star ⭐! It helps the project to be discovered by more people.

This approach provides the best of both worlds: a great developer experience and exceptional performance.