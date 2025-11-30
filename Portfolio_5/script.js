document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            sidebar.classList.toggle('active');
            
            // Toggle menu icon
            const menuIcon = mobileMenuButton.querySelector('i');
            if (menuIcon) {
                if (isExpanded) {
                    menuIcon.setAttribute('data-feather', 'menu');
                } else {
                    menuIcon.setAttribute('data-feather', 'x');
                }
                feather.replace();
            }
        });
        
        // Close mobile menu when a link is clicked
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                sidebar.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const menuIcon = mobileMenuButton.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-feather', 'menu');
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
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Active Nav Link Highlighting on Scroll
    const mainContent = document.querySelector('.main-content');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = mainContent.scrollTop + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
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
    }
    
    if (mainContent) {
        mainContent.addEventListener('scroll', updateActiveNavLink);
        // Initial check in case page is loaded with a hash
        setTimeout(updateActiveNavLink, 100);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If we're on mobile, scroll the main content
                if (window.innerWidth <= 1024) {
                    const mobileHeaderHeight = document.querySelector('.mobile-header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - mobileHeaderHeight - 20;
                    mainContent.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // On desktop, scroll the main content
                    mainContent.scrollTo({
                        top: targetElement.offsetTop - 40,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle page load with hash in URL
    function handleInitialHash() {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView();
                }, 100);
            }
        }
    }
    
    // Call this on initial load
    handleInitialHash();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});
