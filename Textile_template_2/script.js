document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuBtn = document.querySelector('.menu-btn');
    const backToTopBtn = document.querySelector('.back-to-top');
    const scrollDownBtn = document.querySelector('.scroll-down');
    const currentYear = document.getElementById('current-year');
    
    // Set current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                if (menuBtn && menuBtn.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    function toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = menuBtn.classList.contains('active') ? 'hidden' : '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }

    // --- Navbar Style on Scroll ---
    function handleNavbarStyle() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Show/hide back to top button
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll down button in hero section
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const nextSection = document.querySelector('#collections');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Nav Link Highlighting on Scroll ---
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => highlightObserver.observe(section));

    // --- Element Animations on Scroll ---
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Initialize animations
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial navbar style check
    handleNavbarStyle();

    // --- Gallery Item Hover Effect ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        // Add animation delay based on index
        item.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect for touch devices
        item.addEventListener('touchstart', function() {
            this.classList.add('hover');
        });
        
        item.addEventListener('touchend', function() {
            this.classList.remove('hover');
        });
    });

    // --- Service Items Animation ---
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        // Add animation delay based on index
        item.style.animationDelay = `${index * 0.15}s`;
        item.classList.add('animate');
    });

    // --- Form Submission Handling ---
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formElements = this.elements;
            
            // Simple validation
            let isValid = true;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value.trim()) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    this.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                    this.appendChild(successMessage);
                    
                    // Reset form after delay
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        successMessage.remove();
                    }, 3000);
                }, 1500);
            }
        });
    }

    // --- Parallax Effect for Hero Section ---
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // --- Lazy Loading for Images ---
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // --- Add loading animation to all sections with data-animation attribute ---
    const animatedSections = document.querySelectorAll('[data-animation]');
    animatedSections.forEach(section => {
        const animation = section.getAttribute('data-animation');
        section.style.opacity = '0';
        section.style.transform = animation.includes('fade-up') ? 'translateY(30px)' : 
                                animation.includes('fade-left') ? 'translateX(-30px)' : 
                                animation.includes('fade-right') ? 'translateX(30px)' : 'none';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translate(0, 0)';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        sectionObserver.observe(section);
    });

    // --- Initialize AOS (Animate On Scroll) ---
    // This is a lightweight alternative to the AOS library
    function initAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        
        const checkIfInView = () => {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('aos-animate');
                }
            });
        };
        
        // Run once on load
        checkIfInView();
        
        // Add scroll event listener
        window.addEventListener('scroll', checkIfInView);
    }
    
    // Initialize AOS
    initAOS();
});