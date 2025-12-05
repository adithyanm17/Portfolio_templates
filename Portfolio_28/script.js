document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle between menu and X icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.setAttribute('data-feather', 'menu');
            } else {
                icon.setAttribute('data-feather', 'x');
            }
            feather.replace();
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.setAttribute('data-feather', 'menu');
            feather.replace();
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation plays
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });

    // Add staggered animation delays
    const staggerContainers = document.querySelectorAll('.stagger-children');
    
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.setProperty('--stagger-delay', `${index * 100}ms`);
        });
    });

    // Handle window resize to update layout
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 400);
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                document.querySelector(`.desktop-nav a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.desktop-nav a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Initial check
    highlightNavigation();
});

// Add CSS for resize animation stopper
const style = document.createElement('style');
style.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
    
    .desktop-nav a.active {
        color: var(--primary-teal);
        font-weight: 600;
    }
    
    #mobile-menu {
        display: none;
    }
    
    #mobile-menu.hidden {
        display: none;
    }
    
    @media (max-width: 767px) {
        #mobile-menu:not(.hidden) {
            display: flex;
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);
