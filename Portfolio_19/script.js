// --- Document Ready ---
document.addEventListener('DOMContentLoaded', function() {
    // --- Feather Icons Initialization ---
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            
            // Toggle menu icon between menu and x
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('show')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });

        // Close mobile menu when clicking on links
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                const icon = mobileMenuButton.querySelector('i');
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            });
        });
    }
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animate on Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Add active class to nav links on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Run once on page load
    highlightNav();
});

// --- Form Submission Handling ---
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message. We will get back to you soon!';
    successMessage.style.cssText = 'background-color: #10B981; color: white; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;';
    
    form.reset();
    form.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Add event listener to form if it exists
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
}
