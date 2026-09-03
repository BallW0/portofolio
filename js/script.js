/* ===================================================================
   Portfolio – JavaScript
   Scroll animations, navbar, mobile menu, contact form (mailto)
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initActiveNavHighlight();
    initContactForm();
});

/* ──────────────────────────────────────
   Navbar – add .scrolled class on scroll
   ────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ──────────────────────────────────────
   Mobile menu toggle
   ────────────────────────────────────── */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    const closeMenu = () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openMenu = () => {
        toggle.classList.add('active');
        links.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ──────────────────────────────────────
   Scroll Reveal (Intersection Observer)
   ────────────────────────────────────── */
function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger the animation
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 80);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────
   Active navigation link on scroll
   ────────────────────────────────────── */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '-72px 0px -40% 0px', // account for navbar height
        }
    );

    sections.forEach(section => observer.observe(section));
}

/* ──────────────────────────────────────
   Contact form → Gmail mailto link
   ────────────────────────────────────── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name    = form.querySelector('#name').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !subject || !message) return;

        const email   = 'afif.indradzat@gmail.com';
        const body    = `Halo Afif,\n\nPerkenalkan, nama saya ${name}.\n\n${message}\n\nSalam,\n${name}`;
        const mailto  = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(mailto, '_blank');

        // Visual feedback
        const btn = document.getElementById('submitBtn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Gmail Terbuka!</span>
        `;
        btn.style.background = 'rgba(0, 212, 170, 0.2)';
        btn.style.color = '#00d4aa';
        btn.style.border = '1px solid rgba(0, 212, 170, 0.3)';

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.removeAttribute('style');
            form.reset();
        }, 3000);
    });
}
