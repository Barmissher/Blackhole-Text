class Particle {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        ctx.fillText(this.char, this.x, this.y);
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        const maxDistance = 200;
        const minDistance = 5;
        const gravitationalPull = 2;
        
        if (distance < maxDistance) {
            let force = (1 - distance / maxDistance) * gravitationalPull;
            this.angle += 0.05 * force;
            
            if (distance > minDistance) {
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                
                this.x += forceDirectionX * force * this.density;
                this.y += forceDirectionY * force * this.density;
                this.x += Math.cos(this.angle) * force;
                this.y += Math.sin(this.angle) * force;
            }
        } else {
            this.x -= (this.x - this.baseX) / 20;
            this.y -= (this.y - this.baseY) / 20;
        }
    }
}

const text = "Alam semesta adalah lautan kemungkinan tak terbatas...";

let particles = [];
let mouse = { x: null, y: null, radius: 100 };

function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let x = 50, y = 100;
    for (let char of text) {
        if (char === "\n") {
            x = 50;
            y += 30;
        } else {
            particles.push(new Particle(x, y, char));
            x += 15;
        }
    }
}

function animate() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(mouse);
        particle.draw(ctx);
    });

    requestAnimationFrame(animate);
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    particles = [];
    init();
});

init();
animate();