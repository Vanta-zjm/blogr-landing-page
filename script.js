const targets = document.querySelectorAll('.editor .text-content, .tools .text-content, header nav, header .hero, .editor .image-content, .editor h2, .tools .image-content, .infrastructure .text-block h2, .infrastructure .text-block p');

const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
});

targets.forEach(el => io.observe(el));

// hamburger button
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileMenu.hidden = !isOpen;                 // ← 关键：控制 #mobileMenu
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

/*const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', String('is-open'));
        hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        if (isOpen) {
            mobileMenu.hidden = false;
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.hidden = true;
            document.body.style.overflow = '';
        }
    });
}*/

// sub-menu folding
document.querySelectorAll('.mobile-menu .m-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const li = btn.closest('.m-dropdown');
        const open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        // Mutual exclusion: expand one and put away the others
        document.querySelectorAll('.mobile-menu .m-dropdown').forEach(other => {
            if (other !== li) other.classList.remove('open');
            const toggle = other.querySelector('.m-toggle');
            if (toggle && other !== li) toggle.setAttribute('aria-expanded', false);
        });
    });
});