// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle between menu and close icon
            const icon = mobileMenuButton.querySelector('svg');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace();
            }
        });

        // Close mobile menu when a link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuButton.querySelector('svg');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            });
        });
    }

    // Animate on Scroll
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-visible');
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Active Nav Link Highlighting on Scroll
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mainContent) {
        // Set initial active link
        setActiveLink();
        
        mainContent.addEventListener('scroll', setActiveLink);
        
        // Also check on window resize in case layout changes
        window.addEventListener('resize', setActiveLink);
    }
    
    function setActiveLink() {
        let current = 'home'; // Default to home
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200; // Adjust this value to change when the active state changes
            const sectionHeight = section.offsetHeight;
            const scrollPosition = mainContent.scrollTop || window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Also update mobile menu active state
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // For mobile, scroll the main content
                if (window.innerWidth < 1024) {
                    mainContent.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                } else {
                    // For desktop, scroll the window
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
