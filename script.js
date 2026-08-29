document.addEventListener('DOMContentLoaded', () => {

    /* 1. LOADER & REALTIME CLOCK */
    const counter = document.getElementById('counter');
    let count = 0;
    const loaderInterval = setInterval(() => {
        count += 5;
        counter.textContent = count;
        if (count >= 100) {
            clearInterval(loaderInterval);
            document.getElementById('loader').style.transform = 'translateY(-100%)';
        }
    }, 30);

    const updateTime = () => {
        const now = new Date();
        document.getElementById('live-time').textContent = now.toLocaleTimeString('id-ID');
    };
    setInterval(updateTime, 1000);
    updateTime();

    /* 2. THREE.JS / CANVAS 3D BACKGROUND (Interactive Particle Grid) */
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-color').trim();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    const animateCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateCanvas);
    };
    animateCanvas();

    /* 3. SCROLL REVEAL INTERACTION (INTERSECTION OBSERVER) */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* 4. UNIFIED 3D CARD TILT EFFECT */
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    /* 5. CV MODAL SYSTEM */
    const cvModal = document.getElementById('cv-modal');
    const openCvBtn = document.getElementById('open-cv-btn');
    const closeCvBtn = document.getElementById('close-cv-btn');
    const modalOverlay = document.getElementById('modal-overlay');

    const toggleModal = (show) => {
        cvModal.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : 'auto';
    };

    openCvBtn?.addEventListener('click', () => toggleModal(true));
    closeCvBtn?.addEventListener('click', () => toggleModal(false));
    modalOverlay?.addEventListener('click', () => toggleModal(false));

    /* 6. THEME TOGGLE */
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});
