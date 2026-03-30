
        // ============== Theme Toggle ==============
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themePref = localStorage.getItem('theme') || 'light';
        
        if (themePref === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        
        // ============== Language Toggle ==============
        const langToggle = document.getElementById('langToggle');
        let currentLang = localStorage.getItem('lang') || 'en';
        
        function updateLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = lang;
            localStorage.setItem('lang', lang);
            
            // Update all elements with data attributes
            document.querySelectorAll('[data-en][data-ar]').forEach(el => {
                if (el.hasAttribute('data-en') && el.hasAttribute('data-ar')) {
                    if (lang === 'ar') {
                        el.textContent = el.getAttribute('data-ar');
                        el.parentElement?.style.setProperty('direction', 'rtl');
                    } else {
                        el.textContent = el.getAttribute('data-en');
                        el.parentElement?.style.setProperty('direction', 'ltr');
                    }
                }
            });
            
            // Update button text
            langToggle.textContent = lang === 'en' ? 'AR' : 'EN';
            
            // Update document direction
            if (lang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
                document.body.style.direction = 'rtl';
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                document.body.style.direction = 'ltr';
            }
        }
        
        // Initialize language
        updateLanguage(currentLang);
        
        langToggle.addEventListener('click', () => {
            updateLanguage(currentLang === 'en' ? 'ar' : 'en');
        });
        
        // ============== Mobile Menu Toggle ==============
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // ============== Scroll Animations ==============
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-on-scroll');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all skill items, project cards, and timeline items
        document.querySelectorAll('.skill-item, .project-card, .timeline-item, .education-card').forEach(el => {
            observer.observe(el);
        });
        
        // ============== Smooth Scroll for Mobile ==============
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ============== Performance Optimization ==============
        // Lazy load images when they enter viewport
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // ============== Active Navigation Link ==============
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });