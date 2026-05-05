// --- Page Load Animations ---
window.addEventListener('DOMContentLoaded', () => {
    // Lens shapes scale in
    setTimeout(() => {
        document.querySelectorAll('.lens-shape').forEach(lens => {
            lens.classList.add('active');
        });
    }, 100);

    // Hero headline staggered entrance
    setTimeout(() => {
        document.getElementById('hero-headline').classList.add('active');
    }, 400);

    // Initialize Space Atmosphere
    initSpaceAtmosphere();
});

// --- Space Atmosphere: Floating Social Icons ---
function initSpaceAtmosphere() {
    const container = document.getElementById('space-atmosphere');
    if (!container) return;

    const icons = [
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>', // Instagram
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>', // LinkedIn
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>', // YouTube
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.034l4.717 6.237 5.493-6.237zM17.082 19.77h1.832L7.084 4.126H5.117L17.082 19.77z"/></svg>' // X
    ];

    const colors = ['#ff0080', '#00f2ff', '#7000ff', '#f5f5f7'];
    const numIcons = 12;
    const floatingElements = [];

    for (let i = 0; i < numIcons; i++) {
        const el = document.createElement('div');
        el.className = 'floating-icon';
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        const isForeground = Math.random() > 0.3; // 70% of icons in front, 30% behind
        
        const state = {
            el: el,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 20 + Math.random() * 40,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 0.8,
            colorIndex: Math.floor(Math.random() * colors.length),
            isForeground: isForeground
        };

        el.style.width = `${state.size}px`;
        el.style.height = `${state.size}px`;
        el.style.color = colors[state.colorIndex];
        el.style.zIndex = isForeground ? 5 : -1;
        el.style.filter = isForeground ? 'none' : 'blur(3px)';
        el.style.opacity = isForeground ? '0.4' : '0.15';
        
        container.appendChild(el);
        floatingElements.push(state);
    }

    function animate() {
        floatingElements.forEach(s => {
            s.x += s.vx;
            s.y += s.vy;
            s.rotation += s.rotationSpeed;

            // Wrap around screen
            if (s.x < -s.size) s.x = window.innerWidth;
            if (s.x > window.innerWidth) s.x = -s.size;
            if (s.y < -s.size) s.y = window.innerHeight;
            if (s.y > window.innerHeight) s.y = -s.size;

            s.el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`;
            
            // Random color shift
            if (Math.random() < 0.002) {
                s.colorIndex = (s.colorIndex + 1) % colors.length;
                s.el.style.color = colors[s.colorIndex];
            }
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// --- Navbar & Parallax Scroll Effects ---
const navbar = document.getElementById('navbar');
const lenses = document.querySelectorAll('.lens-shape');
let lastKnownScrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    // Navbar effect
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Parallax effect for lens shapes
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            lenses.forEach(lens => {
                const speed = lens.classList.contains('lens-top') ? -0.15 : 0.15;
                const yPos = lastKnownScrollPosition * speed;
                
                if (lens.classList.contains('active')) {
                    lens.style.transform = `scaleX(1) translateY(${yPos}px)`;
                } else {
                    lens.style.transform = `scaleX(0) translateY(${yPos}px)`;
                }
            });
            ticking = false;
        });

        ticking = true;
    }
});

// --- Count-Up Animation ---
const countUpElement = document.getElementById('count-up');
const targetValue = 3375;
let hasCounted = false;

function animateCountUp() {
    let current = 0;
    const duration = 2000;
    const stepTime = 20;
    const increment = targetValue / (duration / stepTime);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            countUpElement.innerHTML = `₹${targetValue}<span>Crore</span>`;
            clearInterval(timer);
        } else {
            countUpElement.innerHTML = `₹${Math.floor(current)}<span>Crore</span>`;
        }
    }, stepTime);
}

// --- Intersection Observer for Scroll Reveals ---
const revealItems = document.querySelectorAll('.reveal-item, .reveal-left, .reveal-right, .reveal-scale');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Special case for count-up
            if (entry.target.contains(countUpElement) && !hasCounted) {
                hasCounted = true;
                animateCountUp();
            }
        } else {
            // Remove the class so it re-animates when scrolling back
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

revealItems.forEach(item => {
    observer.observe(item);
});

// --- Hero Headline Logic (Add transition delay to children) ---
const headlineSpans = document.querySelectorAll('#hero-headline span b');
headlineSpans.forEach((span, index) => {
    span.style.transitionDelay = `${index * 0.15}s`;
});

// --- Magnetic Buttons ---
const magneticButtons = document.querySelectorAll('.btn-nav, .btn-hero');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0, 0) scale(1)`;
    });
});
