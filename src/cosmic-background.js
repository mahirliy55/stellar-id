// Dynamic Cosmic Background Generator
class CosmicBackground {
    constructor() {
        this.starsContainer = document.querySelector('.stars-container');
        this.starCount = 150;
        this.shootingStarCount = 8;
        this.nebulaCount = 5;
        this.planetCount = 3;
        
        this.init();
    }
    
    init() {
        this.createStars();
        this.createShootingStars();
        this.createNebulas();
        this.createPlanets();
        this.createPulsars();
        this.createConstellations();
        this.startAnimation();
    }
    
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
            
            if (Math.random() > 0.9) {
                star.style.background = '#FFD700';
            } else if (Math.random() > 0.8) {
                star.style.background = '#87CEEB';
            } else if (Math.random() > 0.7) {
                star.style.background = '#FF69B4';
            }
            
            this.starsContainer.appendChild(star);
        }
    }
    
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
    
    createNebulas() {
        for (let i = 0; i < this.nebulaCount; i++) {
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
    
    createPlanets() {
        const planetColors = [
            'radial-gradient(circle at 30% 30%, #ff6b6b, #ee5a24)',
            'radial-gradient(circle at 30% 30%, #74b9ff, #0984e3)',
            'radial-gradient(circle at 30% 30%, #a29bfe, #6c5ce7)',
            'radial-gradient(circle at 30% 30%, #fd79a8, #e84393)',
            'radial-gradient(circle at 30% 30%, #fdcb6e, #e17055)',
            'radial-gradient(circle at 30% 30%, #00b894, #00a085)',
            'radial-gradient(circle at 30% 30%, #e84393, #fd79a8)'
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
    
    startAnimation() {
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
        
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createRandomShootingStar();
            }
        }, 3000);
        
        setInterval(() => {
            const planets = document.querySelectorAll('.planet');
            planets.forEach(planet => {
                const brightness = 0.8 + Math.random() * 0.4;
                planet.style.filter = `brightness(${brightness})`;
            });
        }, 2000);
    }
    
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