/**
 * 🌌 Dynamic Cosmic Background Generator
 * 
 * Creates an animated cosmic background with stars, shooting stars, nebulas, and planets.
 * This class generates a realistic space environment with various celestial objects.
 * 
 * @author Yusif Jabrayilov
 * @version 1.0.0
 * @license MIT
 */

// Dynamic Cosmic Background Generator
class CosmicBackground {
    /**
     * Initialize the cosmic background with configuration
     */
    constructor() {
        this.starsContainer = document.querySelector('.stars-container');
        this.starCount = 150; // Number of stars to generate
        this.shootingStarCount = 8; // Number of shooting stars
        this.nebulaCount = 5; // Number of nebula clouds (reduced to 1-2)
        this.planetCount = 3; // Number of orbiting planets
        
        this.init();
    }
    
    /**
     * Initialize all cosmic elements
     */
    init() {
        this.createStars();
        this.createShootingStars();
        this.createNebulas();
        this.createPlanets();
        this.createPulsars();
        this.createConstellations();
        this.startAnimation();
    }
    
    /**
     * Creates animated stars with various properties
     * Each star has random size, position, animation delay, and color
     */
    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() > 0.8 ? 'large' : Math.random() > 0.5 ? 'medium' : 'small';
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 4;
            const duration = 2 + Math.random() * 3;
            const twinkleType = Math.random() > 0.7 ? 'pulsar' : 'normal';
            
            star.className = `star ${size} ${twinkleType}`;
            star.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            // Add random colors to some stars
            if (Math.random() > 0.9) {
                star.style.background = '#FFD700'; // Gold
            } else if (Math.random() > 0.8) {
                star.style.background = '#87CEEB'; // Light blue
            } else if (Math.random() > 0.7) {
                star.style.background = '#FF69B4'; // Pink
            }
            
            this.starsContainer.appendChild(star);
        }
    }
    
    /**
     * Creates shooting stars with trails
     * Each shooting star has random position, delay, duration, and angle
     */
    createShootingStars() {
        for (let i = 0; i < this.shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            const top = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = 2 + Math.random() * 4;
            const angle = Math.random() * 45;
            
            shootingStar.className = 'shooting-star';
            shootingStar.style.cssText = `
                top: ${top}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                transform: rotate(${angle}deg);
            `;
            
            this.starsContainer.appendChild(shootingStar);
        }
    }
    
    /**
     * Creates nebula clouds (reduced to 1-2 for less purple)
     * Nebulas are large, semi-transparent clouds that float around
     */
    createNebulas() {
        // Mor nebula sayısını azalt
        const nebulaCount = 1 + Math.floor(Math.random() * 2); // 1 veya 2
        for (let i = 0; i < nebulaCount; i++) {
            const nebula = document.createElement('div');
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = 150 + Math.random() * 300;
            const delay = Math.random() * 15;
            const duration = 10 + Math.random() * 20;
            
            nebula.className = 'nebula nebula-enhanced';
            nebula.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            this.starsContainer.appendChild(nebula);
        }
    }
    
    /**
     * Creates orbiting planets with realistic colors
     * Each planet has a unique color gradient and orbit path
     */
    createPlanets() {
        const planetColors = [
            'radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a24)', // Red
            'radial-gradient(circle at 30% 30%, #74b9ff, #0984e3)', // Blue
            'radial-gradient(circle at 30% 30%, #a29bfe, #6c5ce7)', // Purple
            'radial-gradient(circle at 30% 30%, #fd79a8, #e84393)', // Pink
            'radial-gradient(circle at 30% 30%, #fdcb6e, #e17055)', // Orange
            'radial-gradient(circle at 30% 30%, #00b894, #00a085)', // Green
            'radial-gradient(circle at 30% 30%, #e84393, #fd79a8)'  // Magenta
        ];
        
        for (let i = 0; i < this.planetCount; i++) {
            const planet = document.createElement('div');
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = 50 + Math.random() * 60;
            const color = planetColors[Math.floor(Math.random() * planetColors.length)];
            const orbitRadius = 100 + Math.random() * 150;
            const orbitSpeed = 20 + Math.random() * 40;
            
            planet.className = 'planet stellar-rotation';
            planet.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                animation: orbit ${orbitSpeed}s linear infinite;
            `;
            
            // Create orbit path (visible trail)
            const orbitPath = document.createElement('div');
            orbitPath.style.cssText = `
                position: absolute;
                top: ${top}%;
                left: ${left}%;
                width: ${orbitRadius * 2}px;
                height: ${orbitRadius * 2}px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transform: translate(-50%, -50%);
            `;
            
            this.starsContainer.appendChild(orbitPath);
            this.starsContainer.appendChild(planet);
        }
    }
    
    /**
     * Creates pulsar stars (rapidly flashing stars)
     * Pulsars are bright stars that flash quickly
     */
    createPulsars() {
        for (let i = 0; i < 5; i++) {
            const pulsar = document.createElement('div');
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            pulsar.className = 'star large pulsar';
            pulsar.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                background: #FFD700;
                box-shadow: 0 0 20px #FFD700;
                animation: pulsar-flash 0.5s ease-in-out infinite;
            `;
            
            this.starsContainer.appendChild(pulsar);
        }
    }
    
    /**
     * Creates constellation lines connecting stars
     * These are thin lines that connect nearby stars to form patterns
     */
    createConstellations() {
        const constellations = [
            { name: 'Ursa Major', points: [[20, 30], [25, 35], [30, 40], [35, 45]] },
            { name: 'Orion', points: [[60, 20], [65, 25], [70, 30], [75, 35]] },
            { name: 'Cassiopeia', points: [[80, 60], [85, 65], [90, 70], [85, 75]] }
        ];
        
        constellations.forEach(constellation => {
            for (let i = 0; i < constellation.points.length - 1; i++) {
                const line = document.createElement('div');
                const [x1, y1] = constellation.points[i];
                const [x2, y2] = constellation.points[i + 1];
                
                const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                
                line.style.cssText = `
                    position: absolute;
                    top: ${y1}%;
                    left: ${x1}%;
                    width: ${length}%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transform: rotate(${angle}deg);
                    transform-origin: 0 50%;
                    animation: constellation-glow 3s ease-in-out infinite;
                `;
                
                this.starsContainer.appendChild(line);
            }
        });
    }
    
    /**
     * Starts all animation effects
     * Includes parallax, random twinkling, and dynamic shooting stars
     */
    startAnimation() {
        // Parallax effect on mouse movement
        document.addEventListener('mousemove', (e) => {
            const stars = document.querySelectorAll('.star');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            stars.forEach((star, index) => {
                const speed = (index % 4 + 1) * 0.3;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                star.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
        
        // Random star twinkling effect
        setInterval(() => {
            const stars = document.querySelectorAll('.star:not(.pulsar)');
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            
            if (randomStar) {
                randomStar.style.animation = 'none';
                setTimeout(() => {
                    randomStar.style.animation = 'twinkle 2s ease-in-out infinite';
                }, 10);
            }
        }, 1500);
        
        // Dynamic shooting star creation
        setInterval(() => {
            if (Math.random() > 0.7) { // 30% chance
                this.createRandomShootingStar();
            }
        }, 3000);
        
        // Planet brightness variation
        setInterval(() => {
            const planets = document.querySelectorAll('.planet');
            planets.forEach(planet => {
                const brightness = 0.8 + Math.random() * 0.4;
                planet.style.filter = `brightness(${brightness})`;
            });
        }, 2000);
    }
    
    /**
     * Creates a random shooting star dynamically
     * Used for continuous shooting star effects
     */
    createRandomShootingStar() {
        const shootingStar = document.createElement('div');
        const top = Math.random() * 100;
        const duration = 1 + Math.random() * 2;
        
        shootingStar.className = 'shooting-star';
        shootingStar.style.cssText = `
            top: ${top}%;
            animation: shooting-star ${duration}s linear;
        `;
        
        this.starsContainer.appendChild(shootingStar);
        
        // Remove element after animation completes
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, duration * 1000);
    }
}

// Initialize cosmic background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CosmicBackground();
});

export default CosmicBackground; 