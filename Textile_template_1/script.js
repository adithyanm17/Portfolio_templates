document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuBtn = document.createElement('div');
    const scrollTopBtn = document.createElement('div');
    
    // Create mobile menu button
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    navbar.appendChild(menuBtn);
    
    // Create scroll to top button
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    // --- Navbar Style on Scroll ---
    function handleNavbarStyle() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            scrollTopBtn.classList.add('active');
        } else {
            navbar.classList.remove('navbar-scrolled');
            scrollTopBtn.classList.remove('active');
        }
    }

    // --- Smooth Scrolling for Navigation Links ---
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navbar.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }

    // --- Mobile Menu Toggle ---
    function toggleMobileMenu() {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // --- Scroll to Top Function ---
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // --- Nav Link Highlighting on Scroll ---
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50% 0px'
    });

    // --- Element Fade-in Animations on Scroll ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate stats counter if it's the about section
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // --- Animate Stats Counter ---
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const duration = 2000; // 2 seconds
        const startValues = [0, 0, 0];
        const endValues = [150, 25, 5]; // Example values, adjust as needed
        
        statNumbers.forEach((stat, index) => {
            const startTime = Date.now();
            const endTime = startTime + duration;
            
            function updateNumber() {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);
                
                // Easing function for smooth animation
                const easeInOutCubic = t => t < 0.5 
                    ? 4 * t * t * t 
                    : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                
                const easedProgress = easeInOutCubic(progress);
                const currentValue = Math.floor(easedProgress * endValues[index]);
                stat.textContent = currentValue + (index === 0 ? '+' : index === 1 ? 'K+' : 'K+');
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }
            
            updateNumber();
        });
    }

    // --- Initialize Elements ---
    function initElements() {
        // Add animation classes to gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            animationObserver.observe(item);
        });
        
        // Add animation to service items
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            animationObserver.observe(item);
        });
        
        // Add animation to about section
        const aboutImage = document.querySelector('.about-image');
        const aboutText = document.querySelector('.about-text');
        if (aboutImage) animationObserver.observe(aboutImage);
        if (aboutText) animationObserver.observe(aboutText);
        
        // Add animation to contact section
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        const contactMap = document.querySelector('.contact-map');
        if (contactInfo) animationObserver.observe(contactInfo);
        if (contactForm) animationObserver.observe(contactForm);
        if (contactMap) animationObserver.observe(contactMap);
    }

    // --- Event Listeners ---
    window.addEventListener('scroll', handleNavbarStyle);
    menuBtn.addEventListener('click', toggleMobileMenu);
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            if (navbar.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Initialize elements
    initElements();
    
    // Initial check for navbar style
    handleNavbarStyle();
    
    // Observe sections for nav highlighting
    sections.forEach(section => highlightObserver.observe(section));
    
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Add hover effect to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const caption = item.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const caption = item.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(20px)';
                caption.style.opacity = '0';
            }
        });
    });
});