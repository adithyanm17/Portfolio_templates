// Initialize Feather Icons
feather.replace();

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when a link is clicked
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
            mobileMenu.style.display = 'none';
        }
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-visible');
                // Unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        observer.observe(el);
    });
};

// Sticky header on scroll
const header = document.getElementById('header');
let lastScroll = 0;

const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 20) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
};

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Height of the header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    animateOnScroll();
    
    // Set up scroll event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Handle initial scroll position
    handleScroll();
    
    // Add loading class to body to prevent flash of unstyled content
    document.body.classList.add('loaded');
});

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.href && this.href.includes('#')) return; // Skip anchor links
        
        this.classList.add('loading');
        this.innerHTML = '<span>Loading...</span>';
        
        // Reset after animation
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = this.getAttribute('data-original-text') || 'Submit';
        }, 2000);
    });
    
    // Store original button text
    button.setAttribute('data-original-text', button.textContent);
});

// Handle form submissions
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            // Insert after form
            this.parentNode.insertBefore(successMessage, this.nextSibling);
            
            // Reset button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Fallback in case of error
        img.addEventListener('error', function() {
            this.style.opacity = '1';
            this.alt = 'Image not available';
        });
    }
});
