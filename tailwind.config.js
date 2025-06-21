/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.html"
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shooting-star': 'shooting-star 3s linear infinite',
        'nebula': 'nebula 15s ease-in-out infinite',
        'cosmic-pulse': 'cosmic-pulse 4s ease-in-out infinite',
        'stellar-rotation': 'stellar-rotation 30s linear infinite',
        'galaxy-spin': 'galaxy-spin 25s ease-in-out infinite',
        'cosmic-wave': 'cosmic-wave 8s ease-in-out infinite',
        'stellar-glow': 'stellar-glow 5s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' },
        },
        'shooting-star': {
          '0%': { transform: 'translateX(-100px) translateY(0px)', opacity: '1' },
          '100%': { transform: 'translateX(calc(100vw + 100px)) translateY(100px)', opacity: '0' },
        },
        nebula: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1) rotate(0deg)' },
          '25%': { opacity: '0.5', transform: 'scale(1.1) rotate(5deg)' },
          '50%': { opacity: '0.4', transform: 'scale(0.9) rotate(-3deg)' },
          '75%': { opacity: '0.6', transform: 'scale(1.05) rotate(2deg)' },
        },
        'cosmic-wave': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-15px) rotate(0.5deg)' },
        },
        'stellar-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        }
      }
    },
  },
  plugins: [],
} 