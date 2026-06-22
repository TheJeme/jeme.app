class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.context = this.canvas.getContext('2d');
        this.characters = '01アイウエオカキクケコサシスセソ';
        this.fontSize = 15;
        this.lastFrame = 0;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        requestAnimationFrame((time) => this.animate(time));
    }

    resize() {
        const scale = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = window.innerWidth * scale;
        this.canvas.height = window.innerHeight * scale;
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        this.context.setTransform(scale, 0, 0, scale, 0, 0);
        this.columns = Math.ceil(window.innerWidth / this.fontSize);
        this.drops = new Array(this.columns).fill(0).map(() => Math.random() * -40);
    }

    animate(time) {
        if (time - this.lastFrame > 70) {
            this.context.fillStyle = 'rgba(7, 10, 8, 0.14)';
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.context.fillStyle = '#58e58b';
            this.context.font = `${this.fontSize}px JetBrains Mono, monospace`;

            this.drops.forEach((drop, index) => {
                const character = this.characters[Math.floor(Math.random() * this.characters.length)];
                const x = index * this.fontSize;
                const y = drop * this.fontSize;
                this.context.fillText(character, x, y);

                if (y > window.innerHeight && Math.random() > 0.985) {
                    this.drops[index] = Math.random() * -20;
                } else {
                    this.drops[index] += 1;
                }
            });

            this.lastFrame = time;
        }

        requestAnimationFrame((nextTime) => this.animate(nextTime));
    }
}

class TerminalReveal {
    constructor() {
        this.lines = [...document.querySelectorAll('.terminal-line')];
        this.outputs = [...document.querySelectorAll('.terminal-output')];
        this.reveal();
    }

    reveal() {
        let delay = 350;

        this.lines.forEach((line, index) => {
            window.setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, delay);

            if (this.outputs[index]) {
                window.setTimeout(() => {
                    this.outputs[index].style.opacity = '1';
                    this.outputs[index].style.transform = 'translateY(0)';
                }, delay + 280);
            }

            delay += 720;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
        new MatrixRain();
    }

    new TerminalReveal();
});
