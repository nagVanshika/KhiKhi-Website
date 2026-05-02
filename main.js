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
});

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
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
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

// --- Pillar Rows Interaction (Haptic-like snappy hover handled in CSS) ---
// But we can add a small sound or haptic feedback here if it was a mobile app.
// For web, the CSS transition is enough for that "snappy" feel.
