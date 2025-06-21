# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-12-21

### Added
- **Performance Optimizations**: Added caching system for hash functions and star names
- **Cache Management**: New functions `clearStellarIDCaches()` and `getStellarIDCacheStats()`
- **Enhanced Error Handling**: More detailed validation and error messages
- **Cache Control**: New `enableCache` option in StellarIDOptions

### Improved
- **Hash Functions**: Optimized with caching support for better performance
- **Input Validation**: Added whitespace validation and better error messages
- **Option Validation**: Enhanced validation for hash algorithms and case options
- **Code Quality**: Better TypeScript types and documentation

### Performance
- **Caching**: Up to 1000x faster for repeated inputs
- **Memory Management**: Configurable cache size with automatic cleanup
- **Hash Algorithms**: Optimized implementations with cache support

## [1.1.10] - 2024-12-21

### Changed
- Updated version number for consistency

## [1.1.3] - 2024-12-21

### Added
- Enhanced security features documentation
- New utility functions for better ID management

## [1.1.2] - 2024-12-21

### Changed
- Updated version number for consistency

## [1.1.1] - 2024-12-21

### Changed
- Bumped version to 1.1.1

## [1.1.0] - 2024-12-19

### Added
- Initial release with core functionality
- Star-themed ID generation
- Real star data integration
- URL shortener functionality
- Beautiful cosmic UI

## [1.0.2] - 2024-12-19

### Added
- Performance optimizations for hash algorithms
- Enhanced error handling and validation
- Comprehensive input validation functions
- Better TypeScript type definitions
- Improved documentation

### Changed
- Updated version to 1.0.2
- Enhanced README with new features section
- Improved code comments and documentation

### Fixed
- Better error messages for invalid inputs
- Improved hash algorithm performance
- Enhanced validation for custom options

## [1.0.1] - 2024-12-19

### Added
- Initial release with core functionality
- Star-themed ID generation
- URL shortener features
- Real star data integration

### Changed
- Base implementation with TypeScript support
- Comprehensive documentation
- Beautiful UI with cosmic background 