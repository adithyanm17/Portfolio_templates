document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                feather.icons.menu.replaceFeatherIcon(icon);
            } else {
                feather.icons.x.replaceFeatherIcon(icon);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    feather.icons.menu.replaceFeatherIcon(icon);
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for mobile header
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(targetId);
            }
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-menu a');
    
    function updateActiveLink(id) {
        // Update desktop nav
        navLinks.forEach(link => {
            if (link.getAttribute('href') === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
            if (link.getAttribute('href') === id) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-visible');
                
                // Update active nav link based on visible section
                const id = '#' + entry.target.id;
                updateActiveLink(id);
            }
        });
    }, observerOptions);
    
    // Observe all sections with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(section => {
        observer.observe(section);
    });
    
    // Initialize active section on page load
    function setInitialActiveSection() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = '#' + section.id;
            }
        });
        
        if (currentSection) {
            updateActiveLink(currentSection);
        }
    }
    
    // Run on page load
    setInitialActiveSection();
    
    // Update active section on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.id;
            }
        });
        
        if (currentSection) {
            updateActiveLink(currentSection);
        }
    });
});
