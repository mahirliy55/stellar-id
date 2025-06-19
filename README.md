# stellar-id

A lightweight, zero-dependency TypeScript library for generating unique, deterministic star-themed IDs.

## Features

- 🎯 Deterministic - Same input always generates the same ID
- 🪶 Lightweight - Zero dependencies
- 📝 TypeScript - Full type support
- ⚡ Simple - Single function with minimal configuration
- 🌟 Star-themed - Uses real star names

## Installation

```bash
npm install stellar-id
# or
yarn add stellar-id
# or
pnpm add stellar-id
```

## Usage

```typescript
import { generateStellarID } from 'stellar-id';

// Basic usage
const id1 = generateStellarID('hello');
console.log(id1); // e.g., "STAR-1234-VEGA"

// Custom prefix
const id2 = generateStellarID('world', { prefix: 'COSMIC' });
console.log(id2); // e.g., "COSMIC-5678-SIRIUS"
```

### API

```typescript
function generateStellarID(
  input: string,
  options?: {
    prefix?: string; // Default: "STAR"
  }
): string;
```

The generated ID follows the format: `${prefix}-${HASH}-${STAR_NAME}`
- `prefix`: A customizable prefix (defaults to "STAR")
- `HASH`: A 4-digit number (0000-9999) derived from the input
- `STAR_NAME`: One of 10 popular star names (e.g., VEGA, SIRIUS, etc.)

## License

MIT 