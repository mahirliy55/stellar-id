# 🌟 Stellar ID Generator ⭐

A TypeScript library for generating unique, deterministic star-themed identifiers. Each generated ID includes a real star name from NASA/HYG databases and a hash.

## ✨ Features

- **Deterministic ID Generation**: Same input always produces the same output
- **Real Star Names**: Uses actual star data from NASA Exoplanet Archive and HYG Database
- **Customizable**: Prefix, length, format, and more options
- **Multiple Hash Algorithms**: Support for different hashing methods
- **Salt Support**: Additional security with custom salts
- **Special Characters**: Optional special character inclusion
- **Case Sensitivity**: Upper, lower, or mixed case options
- **Beautiful UI**: Animated cosmic background with stars, nebulas, and planets
- **Tailwind CSS**: Modern, responsive design
- **TypeScript Support**: Full type definitions included

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

### Utility Functions

```typescript
import { 
  validateStellarID, 
  extractStellarIDParts,
  getAvailableStarNames,
  getStarInfo 
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

**Kod kısmında her kısım için yorumlar var!** 

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

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ⭐ by Yusif Jabrayilov** 