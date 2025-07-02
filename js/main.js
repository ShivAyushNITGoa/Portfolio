/*=============== PRELOADER ===============*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }, 1000);
});

/*=============== DARK/LIGHT THEME ===============*/
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check if user has a theme preference in localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', '');
    }
});

/*=============== MOBILE MENU ===============*/
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('show-menu');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('show-menu');
    });
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 80;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*=============== HEADER SCROLL ===============*/
function scrollHeader() {
    const header = document.querySelector('.header');
    if (this.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

/*=============== TEXT TYPING EFFECT ===============*/
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    
    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
        
        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
        
        let delta = 200 - Math.random() * 100;
        
        if (this.isDeleting) {
            delta /= 2;
        }
        
        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }
        
        setTimeout(() => {
            this.tick();
        }, delta);
    }
}

window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    
    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid var(--primary-color) }";
    document.body.appendChild(css);
};

/*=============== SKILLS TABS ===============*/
const skillsTabs = document.querySelectorAll('.skills-tabs .tab-btn');
const skillsContents = document.querySelectorAll('.skills-list');

skillsTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        skillsTabs.forEach(t => t.classList.remove('active'));
        skillsContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
});

/*=============== RESUME TABS ===============*/
const resumeTabs = document.querySelectorAll('.resume-tabs .tab-btn');
const resumeSections = document.querySelectorAll('.resume-section');

resumeTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        resumeTabs.forEach(t => t.classList.remove('active'));
        resumeSections.forEach(c => c.classList.remove('active'));
        
        // Add active class to current tab and content
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
});

/*=============== PROJECT FILTERING ===============*/
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/*=============== TESTIMONIAL SLIDER ===============*/
document.addEventListener('DOMContentLoaded', () => {
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease',
            once: true,
            offset: 100
        });
    }
});

/*=============== FORM VALIDATION ===============*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        let valid = true;
        const formElements = contactForm.elements;
        
        for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                valid = false;
                formElements[i].classList.add('error');
            } else if (formElements[i].type !== 'submit') {
                formElements[i].classList.remove('error');
            }
        }
        
        // Email validation
        const emailInput = document.querySelector('input[name="email"]');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailPattern.test(emailInput.value)) {
            valid = false;
            emailInput.classList.add('error');
        }
        
        if (valid) {
            // In a real scenario, you would submit the form to a server
            // For this demo, we'll just show a success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thanks for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        }
    });
}

/*=============== UPDATE COPYRIGHT YEAR ===============*/
document.getElementById('current-year').textContent = new Date().getFullYear();

/*=============== SMOOTH SCROLLING ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== LAZY LOADING IMAGES ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Convert all images to lazy loaded images
    const images = document.querySelectorAll('img:not([loading])');
    
    images.forEach(img => {
        // Skip images that are already set up
        if (img.dataset.src || img.hasAttribute('loading')) return;
        
        // Store original src
        const src = img.getAttribute('src');
        if (src) {
            img.setAttribute('data-src', src);
            img.setAttribute('src', 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E');
            img.classList.add('loading');
        }
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
    }
});

/*=============== SCROLL ANIMATIONS WITH INTERSECTION OBSERVER ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll', 'slide-up');
        
        // Add animation to child elements
        section.querySelectorAll('h2, h3').forEach((el, index) => {
            el.classList.add('animate-on-scroll', 'slide-up');
            el.style.transitionDelay = `${0.1 * (index + 1)}s`;
        });
        
        section.querySelectorAll('p, .btn').forEach((el, index) => {
            el.classList.add('animate-on-scroll', 'fade-in');
            el.style.transitionDelay = `${0.15 * (index + 1)}s`;
        });
        
        section.querySelectorAll('.project-card, .skill-item, .info-item, .timeline-item').forEach((el, index) => {
            el.classList.add('animate-on-scroll', 'scale-up');
            el.style.transitionDelay = `${0.1 * (index + 1)}s`;
        });
    });
    
    // Convert project images to have zoom effect
    document.querySelectorAll('.project-img').forEach(el => {
        el.classList.add('img-hover-zoom');
    });
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.classList.add('fade-in');
        });
    }
});

/*=============== ACCESSIBILITY IMPROVEMENTS ===============*/
document.addEventListener('DOMContentLoaded', () => {
    // Add skip to content link
    const header = document.querySelector('header');
    if (header) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to content';
        document.body.insertBefore(skipLink, header);
    }
    
    // Add ARIA labels to navigation
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', (!expanded).toString());
        });
    }
    
    // Add appropriate roles and states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', btn.classList.contains('active').toString());
        
        btn.addEventListener('click', () => {
            // Update ARIA states when tab is clicked
            document.querySelectorAll('.tab-btn').forEach(otherBtn => {
                otherBtn.setAttribute('aria-selected', 'false');
            });
            btn.setAttribute('aria-selected', 'true');
        });
    });
});

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Debounce function to limit frequent function calls
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
const scrollHandlers = ['scrollActive', 'scrollHeader'];
scrollHandlers.forEach(handler => {
    if (typeof window[handler] === 'function') {
        window.removeEventListener('scroll', window[handler]);
        window.addEventListener('scroll', debounce(window[handler]));
    }
}); 