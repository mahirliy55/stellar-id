// Dynamic Cosmic Background Generator
class CosmicBackground {
    constructor() {
        this.starsContainer = document.querySelector('.stars-container');
        this.starCount = 100;
        this.shootingStarCount = 5;
        this.nebulaCount = 3;
        this.planetCount = 2;
        
        this.init();
    }
    
    init() {
        this.createStars();
        this.createShootingStars();
        this.createNebulas();
        this.createPlanets();
        this.startAnimation();
    }
    
    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            
            star.className = `star ${size}`;
            star.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                animation-delay: ${delay}s;
            `;
            
            this.starsContainer.appendChild(star);
        }
    }
    
    createShootingStars() {
        for (let i = 0; i < this.shootingStarCount; i++) {
            const shootingStar = document.createElement('div');
            const top = Math.random() * 100;
            const delay = Math.random() * 15;
            
            shootingStar.className = 'shooting-star';
            shootingStar.style.cssText = `
                top: ${top}%;
                animation-delay: ${delay}s;
            `;
            
            this.starsContainer.appendChild(shootingStar);
        }
    }
    
    createNebulas() {
        for (let i = 0; i < this.nebulaCount; i++) {
            const nebula = document.createElement('div');
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = 100 + Math.random() * 200;
            const delay = Math.random() * 10;
            
            nebula.className = 'nebula';
            nebula.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
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
            'radial-gradient(circle at 30% 30%, #fdcb6e, #e17055)'
        ];
        
        for (let i = 0; i < this.planetCount; i++) {
            const planet = document.createElement('div');
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = 40 + Math.random() * 40;
            const color = planetColors[Math.floor(Math.random() * planetColors.length)];
            const orbitRadius = 80 + Math.random() * 120;
            const orbitSpeed = 15 + Math.random() * 25;
            
            planet.className = 'planet';
            planet.style.cssText = `
                top: ${top}%;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                animation: orbit ${orbitSpeed}s linear infinite;
            `;
            
            // Add orbit path
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
    
    startAnimation() {
        // Add parallax effect
        document.addEventListener('mousemove', (e) => {
            const stars = document.querySelectorAll('.star');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            stars.forEach((star, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;
                
                star.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
        
        // Add twinkle effect to random stars
        setInterval(() => {
            const stars = document.querySelectorAll('.star');
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            
            randomStar.style.animation = 'none';
            setTimeout(() => {
                randomStar.style.animation = 'twinkle 2s ease-in-out infinite';
            }, 10);
        }, 2000);
    }
}

// Initialize cosmic background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CosmicBackground();
});

export default CosmicBackground; 