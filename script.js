/* =========================================================================
   1. THEME TOGGLE (DARK/LIGHT MODE)
========================================================================= */
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.setAttribute("data-theme", "dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    } else {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    }
});

/* =========================================================================
   2. LIVE TIME CLOCK (PALEMBANG, ID)
========================================================================= */
function updateLiveTime() {
    const timeElement = document.getElementById('live-time');
    if (!timeElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}
updateLiveTime();
setInterval(updateLiveTime, 1000);

/* =========================================================================
   3. HAMBURGER MENU LOGIC
========================================================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.jas-nav li a');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

document.addEventListener('click', (event) => {
    if (!navMenu || !hamburger) return;
    
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (navMenu.classList.contains('active') && !isClickInsideMenu && !isClickOnHamburger) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('toggle');
    }
});

/* =========================================================================
   4. SCROLL PARALLAX EFFECT (PORTFOLIO TIMELINE)
========================================================================= */
window.addEventListener('scroll', () => {
    const portfolio = document.getElementById('portfolio-section');
    const experiences = document.getElementById('experiences-section');
    
    if (!portfolio || !experiences) return;

    const expRect = experiences.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (expRect.top < windowHeight && expRect.top > 0) {
        let progress = 1 - (expRect.top / windowHeight);
        portfolio.style.opacity = 1 - (progress * 0.7);
        portfolio.style.transform = `scale(${1 - (progress * 0.05)}) translateY(${progress * 30}px)`;
    } else if (expRect.top >= windowHeight) {
        portfolio.style.opacity = 1;
        portfolio.style.transform = 'scale(1) translateY(0)';
    }
});

/* =========================================================================
   5. INITIALIZATION ON DOM LOAD (LOADING, ANIMATIONS, EFFECTS)
========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- A. FUNGSI LOADER & HERO NAME ANIMATION ---
    function splitTextIntoSpans() {
        const nameElement = document.getElementById("interactive-name");
        if (!nameElement) return; 

        const text = nameElement.innerText;
        nameElement.innerText = ""; 

        text.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char === " " ? "\u00A0" : char; 
            nameElement.appendChild(span);
        });
    }

    function animateNameEntrance() {
        const nameElement = document.getElementById("interactive-name");
        if (!nameElement) return;

        const letters = nameElement.querySelectorAll('span');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.classList.add('animate-in');
            }, index * 80); 
        });
    }

    function startLoader() {
        let counterElement = document.getElementById("counter");
        let loader = document.getElementById("loader");
        
        if (!counterElement || !loader) return; 

        let currentValue = 0;

        function updateCounter() {
            if (currentValue === 100) {
                loader.style.transform = "translateY(-100%)";
                setTimeout(animateNameEntrance, 800); 
                return;
            }

            currentValue += Math.floor(Math.random() * 15) + 1;
            if (currentValue > 100) currentValue = 100;

            counterElement.textContent = currentValue.toString().padStart(3, '0');

            let delay = Math.floor(Math.random() * 150) + 30;
            setTimeout(updateCounter, delay);
        }
        updateCounter();
    }

    splitTextIntoSpans();
    startLoader();

    // --- B. ABOUT IZZAN ROLLING TEXT EFFECT ---
    const aboutContainer = document.getElementById('about-izzan');
    if (aboutContainer) {
        const aboutText = aboutContainer.innerText.trim();
        aboutContainer.innerHTML = ''; 

        const words = aboutText.split(' '); 
        const charsArray = [];

        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('word');
            
            word.split('').forEach(char => {
                const charWrapper = document.createElement('span');
                charWrapper.classList.add('char-wrapper', 'dir-right'); 
                
                const charFront = document.createElement('span');
                charFront.classList.add('char-front');
                charFront.innerText = char;
                
                const charBack = document.createElement('span');
                charBack.classList.add('char-back');
                charBack.innerText = char;
                
                charWrapper.appendChild(charFront);
                charWrapper.appendChild(charBack);
                wordSpan.appendChild(charWrapper); 
                
                charsArray.push(charWrapper); 
            });
            aboutContainer.appendChild(wordSpan);
        });

        let currentDirection = 'right';
        let lastX = 0;
        
        document.addEventListener('mousemove', (e) => {
            if (e.clientX > lastX) currentDirection = 'right';
            else if (e.clientX < lastX) currentDirection = 'left';
            lastX = e.clientX;
        });

        charsArray.forEach(char => {
            char.addEventListener('mouseenter', () => {
                char.classList.add('no-transition');
                char.classList.remove('dir-right', 'dir-left');
                char.classList.add(`dir-${currentDirection}`);
                void char.offsetWidth;
                char.classList.remove('no-transition');
            });
        });
    }

    // --- C. SCROLL REVEAL UNTUK JUDUL SECTION (H2) ---
    const headings = document.querySelectorAll('section h2');
    const animationTypes = ['reveal-slide-up', 'reveal-stomp', 'reveal-slide-side', 'reveal-flip'];

    headings.forEach((h2, index) => {
        const animClass = animationTypes[index % animationTypes.length];
        h2.classList.add('reveal-base', animClass);
    });

    // Pengaturan sensor layar (SUDAH DIPERBAIKI ANTI-KEDIP)
    const observerOptions = {
        root: null,
        // Sensor akan mendeteksi saat elemen berjarak 50px sebelum menyentuh bawah layar
        rootMargin: '0px 0px -50px 0px', 
        // Set ke 0 agar animasi tidak nyala-mati saat ukuran elemen berubah-ubah
        threshold: 0 
    };

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    headings.forEach(h2 => {
        headingObserver.observe(h2);
    });
    
    const aboutTitle = document.getElementById('about-izzan');
    if (aboutTitle) {
        // Tambahkan class animasi dasar dan efek meluncur ke atas (Slide Up)
        aboutTitle.classList.add('reveal-base', 'reveal-slide-up');
        
        // Tempelkan sensor layar yang sama agar ikut terdeteksi saat di-scroll
        headingObserver.observe(aboutTitle);
    }

    // --- D. HOVER REVEAL PORTFOLIO (STATIC POSITION) ---
    const cursorImg = document.getElementById('cursor-img');
    const portRows = document.querySelectorAll('.portfolio-row');

    if (cursorImg && portRows.length > 0) {
        portRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const imgSrc = row.getAttribute('data-hover');
                if (imgSrc) {
                    cursorImg.src = imgSrc;
                    
                    // Hitung koordinat baris portofolio saat ini
                    const rect = row.getBoundingClientRect();
                    
                    // Kunci posisi vertikal di tengah baris, dan horizontal di sisi kanan teks (sekitar 60% dari lebar layar)
                    cursorImg.style.top = (rect.top + rect.height / 2) + 'px';
                    cursorImg.style.left = (rect.left + rect.width * 0.65) + 'px'; 
                    
                    cursorImg.classList.add('active');
                }
            });

            row.addEventListener('mouseleave', () => {
                cursorImg.classList.remove('active');
                setTimeout(() => {
                    if(!cursorImg.classList.contains('active')) {
                        cursorImg.src = "";
                    }
                }, 300);
            });
            
            // Perintah 'mousemove' sepenuhnya dihapus di sini
        });
    }

// --- E. CV MODAL LOGIC ---
    const cvModal = document.getElementById('cv-modal');
    const viewCvLink = document.getElementById('view-cv-link'); 
    const closeCvBtn = document.getElementById('close-cv');
    const overlay = document.getElementById('modal-overlay');

    if (viewCvLink && cvModal) {
        viewCvLink.addEventListener('click', (e) => {
            e.preventDefault();
            cvModal.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
    }

    const closeFunc = () => {
        if (cvModal) {
            cvModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (closeCvBtn) closeCvBtn.addEventListener('click', closeFunc);
    if (overlay) overlay.addEventListener('click', closeFunc);

// --- F. CERTIFICATE IMAGE MODAL LOGIC ---
    const certModal = document.getElementById('cert-modal');
    const certPreviewImg = document.getElementById('cert-preview-img');
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    const closeCertBtn = document.getElementById('close-cert-btn');
    const certOverlay = document.getElementById('cert-modal-overlay');

    if (certModal && viewCertBtns.length > 0) {
        viewCertBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const imgSrc = btn.getAttribute('data-cert');
                if (imgSrc && imgSrc !== "#") {
                    certPreviewImg.src = imgSrc;
                    certModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; 
                } else {
                    alert("Gambar sertifikat sedang disiapkan! Jangan lupa masukkan gambar ke folder Asset.");
                }
            });
        });

        const closeCertModal = () => {
            certModal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
            setTimeout(() => { certPreviewImg.src = ""; }, 300); 
        };

        if (closeCertBtn) closeCertBtn.addEventListener('click', closeCertModal);
        if (certOverlay) certOverlay.addEventListener('click', closeCertModal);
    }

}); // <-- INI ADALAH PENUTUP DOMContentLoaded YANG BENAR (Paling Bawah File!)
