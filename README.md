# stellar-id

A lightweight, zero-dependency **TypeScript library** for generating unique, deterministic star-themed IDs.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mahirliy55/stellar-id)

## 🌟 Features

- 🎯 **Deterministic** - Same input always generates the same ID
- 🪶 **Lightweight** - Zero dependencies
- 📝 **TypeScript** - Full type support with `.d.ts` files
- ⚡ **Simple** - Single function with minimal configuration
- 🌟 **Star-themed** - Uses real star names (SIRIUS, VEGA, ALTAIR, etc.)
- 📦 **NPM Ready** - Ready to publish and install
- 🎨 **Modern UI** - Beautiful web interface with Tailwind CSS
- 📱 **Responsive** - Mobile-friendly design with glass morphism effects

## 🚀 Quick Start

### Installation

```bash
npm install stellar-id
# or
yarn add stellar-id
# or
pnpm add stellar-id
```

### Usage

```typescript
import { generateStellarID } from 'stellar-id';

// Basic usage
const id1 = generateStellarID('hello');
console.log(id1); // e.g., "STAR-1234-VEGA"

// Custom prefix
const id2 = generateStellarID('world', { prefix: 'COSMIC' });
console.log(id2); // e.g., "COSMIC-5678-SIRIUS"
```

## 📖 API Reference

```typescript
function generateStellarID(
  input: string,
  options?: {
    prefix?: string; // Default: "STAR"
  }
): string;
```

### ID Format
The generated ID follows the format: `${prefix}-${HASH}-${STAR_NAME}`

- **`prefix`**: A customizable prefix (defaults to "STAR")
- **`HASH`**: A 4-digit number (0000-9999) derived from the input
- **`STAR_NAME`**: One of 10 popular star names (SIRIUS, VEGA, ALTAIR, RIGEL, ANTARES, ALDEBARAN, BETELGEUSE, ARCTURUS, POLLUX, DENEB)

## 🛠️ Development

### Clone and Setup

```bash
git clone https://github.com/mahirliy55/stellar-id.git
cd stellar-id
npm install
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Test

```bash
# JavaScript test
node test.js

# TypeScript test
npx tsx test.ts
```

## 🌐 Web Demo

Run the web interface locally:

```bash
# Start development server
npm run dev

# In another terminal, start HTTP server
python3 -m http.server 3000

# Open http://localhost:3000 in your browser
```

### 🎨 Web Interface Features

The web interface includes:
- **Modern Design**: Built with Tailwind CSS for a beautiful, responsive UI
- **Glass Morphism**: Elegant glass-like effects with backdrop blur
- **Interactive Elements**: Hover animations and smooth transitions
- **Real-time Generation**: Instant ID generation with live preview
- **Example Showcase**: Pre-generated examples to demonstrate the library
- **Mobile Responsive**: Works perfectly on all device sizes

## 📁 Project Structure

```
stellar-id/
├── src/
│   ├── index.ts          # Main TypeScript library
│   └── styles.css        # Tailwind CSS styles
├── dist/                 # Built files (auto-generated)
│   ├── index.js          # CommonJS build
│   ├── index.mjs         # ES Module build
│   └── index.d.ts        # TypeScript declarations
├── demo.js               # JavaScript demo
├── test.js               # JavaScript tests
├── test.ts               # TypeScript tests
├── index.html            # Web interface with Tailwind CSS
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── package.json          # NPM configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## 🎨 UI Technologies

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Glass Morphism**: Modern design trend with transparency and blur effects
- **Responsive Design**: Mobile-first approach with flexible layouts
- **CSS Animations**: Smooth transitions and hover effects
- **Gradient Backgrounds**: Beautiful cosmic-themed color schemes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yusif Jabrayilov** - [GitHub](https://github.com/mahirliy55)

---

⭐ If you find this project helpful, please give it a star on GitHub! 