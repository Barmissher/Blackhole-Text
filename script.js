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
        ctx.fillStyle = 'black'; // Teks hitam
        ctx.font = '18px "Courier New", monospace';
        ctx.fillText(this.char, this.x, this.y);
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        const minDistance = 5;
        const gravitationalPull = 2;

        if (distance < maxDistance) {
            let force = (1 - distance / maxDistance) * gravitationalPull;
            this.angle += 0.05 * force;

            if (distance > minDistance) {
                let forceX = dx / distance;
                let forceY = dy / distance;
                this.x += forceX * force * this.density;
                this.y += forceY * force * this.density;
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

const text = `Alam semesta adalah lautan luas dengan kemungkinan tak terbatas, di mana setiap bintang yang berkelap-kelip di langit mewakili sebuah kisah yang belum diceritakan, sebuah rahasia yang tersembunyi di ujung waktu dan ruang. Sejak awal keberadaannya, umat manusia telah menatap langit malam, berusaha memahami misteri yang tersembunyi di balik kegelapan. Planet-planet berputar dalam orbit yang tak terlihat, galaksi-galaksi saling berjalin dalam tarian kosmik yang abadi, dan lubang hitam melahap cahaya dengan gravitasi yang luar biasa kuat. Waktu, entitas yang tak kenal ampun, terus berjalan tanpa henti, membawa peradaban-peradaban dalam arusnya, menghapus kerajaan-kerajaan yang dulu megah, dan membentuk takdir mereka yang berani menantang hukumnya.

Bahasa, pada gilirannya, adalah cerminan dari kesadaran manusia, sebuah alat yang memungkinkan kita untuk mengekspresikan pemikiran, emosi, dan aspirasi. Kata-kata mengalir seperti sungai yang tak berujung, saling terjalin dalam narasi yang kompleks, melampaui zaman dan budaya. Huruf-huruf membentuk kata, kata membentuk kalimat, dan kalimat melahirkan kisah yang bergema sepanjang abad. Kekuatan komunikasi terletak pada kemampuannya untuk menghubungkan pikiran yang berjauhan, menyampaikan pengetahuan, menginspirasi revolusi, dan menjaga esensi pengalaman manusia.

Di sudut-sudut dunia siber, kode biner berdenyut seperti sinapsis buatan, menghidupkan realitas digital yang menantang persepsi akan keberadaan. Algoritma menghitung probabilitas, kecerdasan buatan mempelajari pola, dan jaringan saraf mensimulasikan proses kognitif yang dulu hanya dimiliki oleh pikiran manusia. Seiring kemajuan teknologi yang pesat, batas antara dunia nyata dan virtual semakin kabur, mempertanyakan makna kesadaran dan identitas itu sendiri.

Dan demikianlah, siklus terus berlanjut, tanpa henti, tanpa batas. Alam semesta terus mengembang, benda-benda langit mengikuti jalurnya, dan umat manusia bergerak maju menuju hal yang belum diketahui, didorong oleh rasa ingin tahu yang tak terpuaskan dan keinginan untuk memahami yang tak terjangkau.`;

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 100
};

function init() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let squareSize = Math.min(canvas.width, canvas.height) * 0.8;
    let squareX = canvas.width / 2 - squareSize / 2;
    let squareY = canvas.height / 2 - squareSize / 2;

    ctx.textAlign = 'left';
    const textLines = text.split('\n');
    const lineHeight = 32;
    const charWidth = 11;

    textLines.forEach((line, lineIndex) => {
        const characters = line.split('');
        const lineWidth = characters.length * charWidth;
        const lineX = squareX + (squareSize - lineWidth) / 2;

        characters.forEach((char, i) => {
            const x = lineX + (i * charWidth);
            const y = squareY + (lineIndex * lineHeight) + 40;
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
