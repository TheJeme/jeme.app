// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.fontSize = 14;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Terminal Typewriter Effect
class TerminalTypewriter {
    constructor() {
        this.init();
    }
    
    init() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        const terminalOutputs = document.querySelectorAll('.terminal-output');
        let delay = 1500; // Initial delay
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
                
                // Show the corresponding output after the command
                if (terminalOutputs[index]) {
                    setTimeout(() => {
                        terminalOutputs[index].style.opacity = '1';
                        terminalOutputs[index].style.transform = 'translateX(0)';
                    }, 800); // Show output 800ms after command
                }
            }, delay);
            delay += 2000; // 2 second delay between each command
        });
        
    }
}

// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
        });
    }
}

// Interactive Effects
class InteractiveEffects {
    constructor() {
        this.init();
    }
    
    init() {
        // Mouse trail effect
        document.addEventListener('mousemove', (e) => {
            this.createTrail(e.clientX, e.clientY);
        });
        
        // Terminal click effects
        const terminal = document.querySelector('.terminal');
        terminal.addEventListener('click', (e) => {
            this.createClickEffect(e.clientX, e.clientY);
        });
        
        // Keyboard effects
        document.addEventListener('keydown', (e) => {
            this.createKeyboardEffect(e.key);
        });
    }
    
    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = '#00ff41';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '1000';
        trail.style.opacity = '0.8';
        trail.style.animation = 'trailFade 1s ease-out forwards';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            document.body.removeChild(trail);
        }, 1000);
    }
    
    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.position = 'fixed';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.border = '2px solid #00ff41';
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1000';
        effect.style.animation = 'clickRipple 0.6s ease-out forwards';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 600);
    }
    
    createKeyboardEffect(key) {
        const keyElement = document.createElement('div');
        keyElement.textContent = key;
        keyElement.style.position = 'fixed';
        keyElement.style.left = Math.random() * window.innerWidth + 'px';
        keyElement.style.top = Math.random() * window.innerHeight + 'px';
        keyElement.style.color = '#00ff41';
        keyElement.style.fontSize = '24px';
        keyElement.style.fontWeight = 'bold';
        keyElement.style.pointerEvents = 'none';
        keyElement.style.zIndex = '1000';
        keyElement.style.animation = 'keyFloat 2s ease-out forwards';
        
        document.body.appendChild(keyElement);
        
        setTimeout(() => {
            document.body.removeChild(keyElement);
        }, 2000);
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        0% { opacity: 0.8; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes clickRipple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(3); opacity: 0; }
    }
    
    @keyframes keyFloat {
        0% { opacity: 1; transform: translateY(0) rotate(0deg); }
        100% { opacity: 0; transform: translateY(-100px) rotate(360deg); }
    }
    
    .terminal-line {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.5s ease;
    }
    
    
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for fonts to load before starting animations
    document.fonts.ready.then(() => {
        // Add a small delay to ensure everything is ready
        setTimeout(() => {
            new MatrixRain();
            new TerminalTypewriter();
            new ParticleSystem();
            new InteractiveEffects();
            
            // Add some random glitch effects (delayed)
            setTimeout(() => {
                setInterval(() => {
                    if (Math.random() < 0.1) {
                        document.body.style.filter = 'hue-rotate(90deg)';
                        setTimeout(() => {
                            document.body.style.filter = 'none';
                        }, 100);
                    }
                }, 3000);
            }, 2000);
        }, 100);
    });
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Activate special mode
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = 'none';
        }, 10000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
