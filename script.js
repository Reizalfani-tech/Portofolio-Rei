/* =========================================================================
   1. THEME TOGGLE (DARK/LIGHT MODE)
========================================================================= */
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.setAttribute("data-theme", "dark");
    if(toggleBtn) toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
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
}

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
   4. SCROLL PARALLAX EFFECT
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
   5. INITIALIZATION ON DOM LOAD
========================================================================= */
document.addEventListener("DOMContentLoaded", () => {
    
    // Split Text & Hero Name entrance
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

    // Intersection Observer for Animations
    const headings = document.querySelectorAll('section h2');
    const animationTypes = ['reveal-slide-up', 'reveal-stomp', 'reveal-slide-side', 'reveal-flip'];

    headings.forEach((h2, index) => {
        const animClass = animationTypes[index % animationTypes.length];
        h2.classList.add('reveal-base', animClass);
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
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

    headings.forEach(h2 => headingObserver.observe(h2));

    // Modals Handling
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

    // Cert Modal
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
});
