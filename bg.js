class InteractiveStarsBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stars = [];
        this.maxStars = 200;
        this.mouse = { x: 0, y: 0, radius: 150 };

        this.colors = [
            '#FF8A00',  // Orange
            '#FFD700',  // Gold
            '#FF4E50',  // Red
            '#7FFF00',  // Chartreuse
            '#00FA9A',  // Medium Spring Green
            '#1E90FF',  // Dodger Blue
        ];

        this.init();
    }

    init() {
        this.canvas.id = 'interactive-stars-background';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        document.body.appendChild(this.canvas);
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(this.createStar());
        }

        this.addEventListeners();
        this.animate();
    }

    createStar() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
        };
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        this.stars.forEach((star) => {
            star.x += star.vx;
            star.y += star.vy;

            if (star.x < 0 || star.x > this.width) star.vx *= -1;
            if (star.y < 0 || star.y > this.height) star.vy *= -1;

            const dx = this.mouse.x - star.x;
            const dy = this.mouse.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.mouse.radius) {
                this.ctx.beginPath();
                this.ctx.moveTo(star.x, star.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = star.color;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }

            this.drawStar(star);
        });

        requestAnimationFrame(() => this.animate());
    }

    drawStar(star) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color;
        this.ctx.fill();
    }
}

// Initialize
new InteractiveStarsBackground();