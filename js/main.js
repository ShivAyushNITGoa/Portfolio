document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    console.log('Website loaded successfully!');
    
    // Initialize Swiper slider immediately if available
    if (typeof Swiper !== 'undefined') {
        console.log('Initializing Swiper...');
        const testimonialsSwiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
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
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        });
    } else {
        console.log('Swiper not available');
        // Try to initialize Swiper after a delay if it wasn't available immediately
        setTimeout(() => {
            if (typeof Swiper !== 'undefined') {
                console.log('Initializing Swiper after delay...');
                const testimonialsSwiper = new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    loop: true,
                    grabCursor: true,
                    autoplay: {
                        delay: 5000,
                        disableOnInteraction: false,
                    },
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
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }
                });
            }
        }, 1000);
    }
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });
    }
    
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update aria-expanded attribute
            const isExpanded = navToggle.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-toggle') && !event.target.closest('.nav-menu') && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer a[href^="#"], .scroll-down, .back-to-top a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link state on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.toggle('fa-sun', savedTheme === 'dark');
            themeToggle.querySelector('i').classList.toggle('fa-moon', savedTheme === 'light');
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
        localStorage.setItem('theme', 'dark');
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Toggle icon
            const icon = themeToggle.querySelector('i');
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }
    
    // Text rotation animation
    const txtRotate = document.querySelector('.txt-rotate');
    if (txtRotate) {
        const period = txtRotate.getAttribute('data-period');
        const rotate = JSON.parse(txtRotate.getAttribute('data-rotate'));
        
        let current = 0;
        let txt = '';
        let isDeleting = false;
        
        function tick() {
            const fullTxt = rotate[current];
            
            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }
            
            txtRotate.textContent = txt;
            
            let delta = 200 - Math.random() * 100;
            
            if (isDeleting) {
                delta /= 2;
            }
            
            if (!isDeleting && txt === fullTxt) {
                delta = parseInt(period, 10);
                isDeleting = true;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                current = (current + 1) % rotate.length;
                delta = 500;
            }
            
            setTimeout(tick, delta);
        }
        
        tick();
    }
    
    // Skills tabs
    const tabBtns = document.querySelectorAll('.skills-tabs .tab-btn');
    const skillsLists = document.querySelectorAll('.skills-list');
    
    if (tabBtns.length > 0 && skillsLists.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class from all buttons and lists
                tabBtns.forEach(b => b.classList.remove('active'));
                skillsLists.forEach(list => list.classList.remove('active'));
                
                // Add active class to current button and target list
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Resume tabs
    const resumeTabBtns = document.querySelectorAll('.resume-tabs .tab-btn');
    const resumeSections = document.querySelectorAll('.resume-section');
    
    if (resumeTabBtns.length > 0 && resumeSections.length > 0) {
        resumeTabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // Remove active class from all buttons and sections
                resumeTabBtns.forEach(b => b.classList.remove('active'));
                resumeSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to current button and target section
                this.classList.add('active');
                document.getElementById(target).classList.add('active');
            });
        });
    }
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.remove('hide');
                        }, 10);
                    } else {
                        card.classList.add('hide');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('[name="name"]').value;
            const email = contactForm.querySelector('[name="email"]').value;
            const subject = contactForm.querySelector('[name="subject"]').value;
            const message = contactForm.querySelector('[name="message"]').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add scroll to top button visibility toggle
    const scrollToTopBtn = document.querySelector('.back-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
}); 