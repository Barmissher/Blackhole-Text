class Particle {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.size = 16;
        this.angle = Math.random() * Math.PI * 2;
    }

    draw(ctx) {
        ctx.fillStyle = 'white';
        ctx.font = '18px "Courier New"';
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
            } else {
                this.x += Math.cos(this.angle) * 2;
                this.y += Math.sin(this.angle) * 2;
            }
        } else {
            this.x -= (this.x - this.baseX) / 20;
            this.y -= (this.y - this.baseY) / 20;
        }
    }
}

const text = `
Alam semesta adalah lautan luas dengan kemungkinan tak terbatas, di mana setiap bintang yang berkelap-kelip
di langit mewakili kisah yang belum diceritakan. Sejak awal, manusia menatap langit, mencari jawaban atas misteri
di balik kegelapan. Planet berputar, galaksi menari, dan lubang hitam melahap cahaya dalam tarikan gravitasinya.

Bahasa adalah refleksi kesadaran manusia, alat untuk mengekspresikan pikiran, emosi, dan aspirasi.
Kata-kata mengalir tanpa henti, membentuk cerita yang bergema sepanjang waktu.

Di dunia siber, kode biner berdenyut seperti sinapsis buatan, menciptakan realitas digital yang menantang eksistensi.
Algoritma menghitung, AI belajar, dan batas antara nyata serta maya semakin kabur.

Dan demikianlah, siklus terus berlanjut. Alam semesta berkembang, bintang-bintang beredar, dan manusia terus mencari
pemahaman tentang yang tak terjangkau.
`;

let particles = [];
let mouse = { x: null, y: null };

function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let squareSize = Math.min(canvas.width, canvas.height) * 0.8;
    let squareX = (canvas.width - squareSize) / 2;
    let squareY = (canvas.height - squareSize) / 2;

    const textLines = text.split('\n');
    const lineHeight = 30;
    const charWidth = 12;
    const startY = squareY + 40;

    textLines.forEach((line, lineIndex) => {
        const characters = line.trim().split('');
        const lineWidth = characters.length * charWidth;
        const lineX = squareX + (squareSize - lineWidth) / 2;

        characters.forEach((char, i) => {
            const x = lineX + i * charWidth;
            const y = startY + lineIndex * lineHeight;
            if (x < squareX + squareSize && y < squareY + squareSize) {
                particles.push(new Particle(x, y, char));
            }
        });
    });
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
