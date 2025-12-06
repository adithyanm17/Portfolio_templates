document.addEventListener('DOMContentLoaded', function() {
    // Templates data - we'll dynamically generate this from the folders
    const templates = [];
    
    // Generate portfolio templates (1-28)
    for (let i = 1; i <= 28; i++) {
        templates.push({
            id: `portfolio-${i}`,
            name: `Portfolio ${i}`,
            category: 'portfolio',
            path: `Portfolio_${i}/index.html`,
            thumbnail: `Portfolio_${i}/screenshot.jpg` // You'll need to add these screenshots
        });
    }
    
    // Generate restaurant templates (1-6)
    for (let i = 1; i <= 6; i++) {
        templates.push({
            id: `restaurant-${i}`,
            name: `Restaurant ${i}`,
            category: 'restaurant',
            path: `Resturant_template_${i}/index.html`,
            thumbnail: `Resturant_template_${i}/screenshot.jpg`
        });
    }
    
    // Generate textile templates (1-2)
    for (let i = 1; i <= 2; i++) {
        templates.push({
            id: `textile-${i}`,
            name: `Textile ${i}`,
            category: 'textile',
            path: `Textile_template_${i}/index.html`,
            thumbnail: `Textile_template_${i}/screenshot.jpg`
        });
    }

    // DOM Elements
    const templatesContainer = document.getElementById('templatesContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('previewModal');
    const closeBtn = document.querySelector('.close-btn');
    const closePreviewBtn = document.getElementById('closePreviewBtn');
    const templateFrame = document.getElementById('templateFrame');
    const viewLiveBtn = document.getElementById('viewLiveBtn');
    
    // Current filter
    let currentFilter = 'all';
    
    // Display templates
    function displayTemplates() {
        templatesContainer.innerHTML = '';
        
        const filteredTemplates = currentFilter === 'all' 
            ? templates 
            : templates.filter(template => template.category === currentFilter);
        
        filteredTemplates.forEach(template => {
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.dataset.category = template.category;
            
            templateCard.innerHTML = `
                <div class="template-preview">
                    <img src="${template.thumbnail}" alt="${template.name} Preview" onerror="this.src='https://via.placeholder.com/300x225?text=No+Preview'">
                </div>
                <div class="template-info">
                    <h3>${template.name}</h3>
                    <span class="template-category category-${template.category}">
                        ${template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </span>
                </div>
            `;
            
            templateCard.addEventListener('click', () => openModal(template));
            templatesContainer.appendChild(templateCard);
        });
    }
    
    // Open modal with template preview
    function openModal(template) {
        templateFrame.src = template.path;
        viewLiveBtn.href = template.path;
        
        // Update download button with current template info
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.setAttribute('data-template-path', template.path);
        downloadBtn.setAttribute('data-template-name', template.name);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        templateFrame.src = '';
        document.body.style.overflow = 'auto';
    }
    
    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update filter and display templates
            currentFilter = button.dataset.filter;
            displayTemplates();
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);
    closePreviewBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Function to create and trigger download
    function downloadTemplate(templatePath, templateName) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = templatePath;
        link.download = `${templateName}.zip`; // You'll need to create zip files for each template
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    // Add download button event listener
    document.getElementById('downloadBtn').addEventListener('click', function() {
        const currentTemplate = this.getAttribute('data-template-path');
        const templateName = this.getAttribute('data-template-name');
        if (currentTemplate) {
            downloadTemplate(currentTemplate, templateName);
        }
    });
    
    // Initial display
    displayTemplates();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
