document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const navbar = document.querySelector('.navbar');

    // --- Navbar Style on Scroll/Page Change ---
    function handleNavbarStyle() {
        const isHomePage = document.getElementById('home').classList.contains('active');
        const scrollPosition = window.scrollY;

        if (!isHomePage || scrollPosition > 50) {
            navbar.classList.add('navbar-solid');
        } else {
            navbar.classList.remove('navbar-solid');
        }
    }

    // --- Single-Page Navigation ---
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        window.scrollTo(0, 0);
        handleNavbarStyle(); // Update navbar style immediately on page change
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.page;
            if (pageId) {
                showPage(pageId);
            }
        });
    });

    // --- Scroll Animations using Intersection Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // --- Event Listeners ---
    window.addEventListener('scroll', handleNavbarStyle);

    // --- Initial Load ---
    showPage('home'); 
});