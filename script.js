class Particle {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillText(this.char, this.x, this.y);
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;
        const gravitationalPull = 2;

        if (distance < maxDistance) {
            let force = (1 - distance / maxDistance) * gravitationalPull;
            this.x += (dx / distance) * force;
            this.y += (dy / distance) * force;
        } else {
            this.x -= (this.x - this.baseX) / 20;
            this.y -= (this.y - this.baseY) / 20;
        }
    }
}

const text = `Alam semesta adalah lautan luas dengan kemungkinan tak terbatas, di mana setiap bintang yang berkelap-kelip di langit mewakili sebuah kisah yang belum diceritakan, sebuah rahasia yang tersembunyi di ujung waktu dan ruang. Sejak awal keberadaannya, umat manusia telah menatap langit malam, berusaha memahami misteri yang tersembunyi di balik kegelapan.

Planet-planet berputar dalam orbit yang tak terlihat, galaksi-galaksi saling berjalin dalam tarian kosmik yang abadi, dan lubang hitam melahap cahaya dengan gravitasi yang luar biasa kuat. Waktu, entitas yang tak kenal ampun, terus berjalan tanpa henti, membawa peradaban-peradaban dalam arusnya, menghapus kerajaan-kerajaan yang dulu megah, dan membentuk takdir mereka yang berani menantang hukumnya.

Di sudut-sudut dunia siber, kode biner berdenyut seperti sinapsis buatan, menghidupkan realitas digital yang menantang persepsi akan keberadaan. Seiring kemajuan teknologi yang pesat, batas antara dunia nyata dan virtual semakin kabur, mempertanyakan makna kesadaran dan identitas itu sendiri.

Dan demikianlah, siklus terus berlanjut, tanpa henti, tanpa batas. Alam semesta terus mengembang, benda-benda langit mengikuti jalurnya, dan umat manusia bergerak maju menuju hal yang belum diketahui.`;

let particles = [];
let mouse = { x: null, y: null };
let fontSize = 24;

function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    fontSize = Math.min(canvas.width, canvas.height) * 0.025;
    ctx.font = `${fontSize}px "Courier New", monospace`;
    ctx.textAlign = 'center';

    let startX = canvas.width / 2;
    let startY = canvas.height / 4;
    let lineHeight = fontSize * 1.5;

    text.split('\n').forEach((line, index) => {
        let y = startY + index * lineHeight;
        let x = startX - (ctx.measureText(line).width / 2);

        line.split('').forEach((char, i) => {
            particles.push(new Particle(x + i * fontSize * 0.7, y, char));
        });
    });
}

function animate() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Hapus gambar sebelumnya (background putih)
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
