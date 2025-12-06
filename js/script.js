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
            // Create template card with sanitized content
            const templateCard = document.createElement('div');
            templateCard.className = 'template-card';
            templateCard.dataset.category = template.category;
            
            // Create preview container
            const previewDiv = document.createElement('div');
            previewDiv.className = 'template-preview';
            
            // Create image element for thumbnail
            const img = document.createElement('img');
            img.src = template.thumbnail || 'https://via.placeholder.com/300x225?text=No+Preview';
            img.alt = `${template.name} Preview`;
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/300x225?text=No+Preview';
            };
            
            // Create info container
            const infoDiv = document.createElement('div');
            infoDiv.className = 'template-info';
            
            // Create title
            const title = document.createElement('h3');
            title.textContent = template.name;
            
            // Create category badge
            const categorySpan = document.createElement('span');
            categorySpan.className = `template-category category-${template.category}`;
            categorySpan.textContent = template.category.charAt(0).toUpperCase() + template.category.slice(1);
            
            // Assemble the card
            previewDiv.appendChild(img);
            infoDiv.appendChild(title);
            infoDiv.appendChild(categorySpan);
            templateCard.appendChild(previewDiv);
            templateCard.appendChild(infoDiv);
            
            // Add click handler
            templateCard.addEventListener('click', () => openModal(template));
            
            // Add to container
            templatesContainer.appendChild(templateCard);
        });
    }
    
    // Open modal with template preview
    function openModal(template) {
        // Create a sandboxed iframe to prevent script execution
        const sandboxAttrs = [
            'allow-same-origin',
            'allow-scripts',
            'allow-forms',
            'allow-modals',
            'allow-popups',
            'allow-presentation'
        ];
        
        // Clear previous iframe and create a new one
        const newIframe = document.createElement('iframe');
        newIframe.id = 'templateFrame';
        newIframe.sandbox = sandboxAttrs.join(' ');
        newIframe.allow = 'fullscreen';
        newIframe.style.width = '100%';
        newIframe.style.height = '100%';
        newIframe.style.border = 'none';
        
        // Replace the iframe in the DOM
        const previewContainer = document.querySelector('.preview-container');
        const oldIframe = document.getElementById('templateFrame');
        if (oldIframe) {
            previewContainer.replaceChild(newIframe, oldIframe);
        } else {
            previewContainer.appendChild(newIframe);
        }
        
        // Set the source after a small delay to ensure the iframe is in the DOM
        setTimeout(() => {
            newIframe.src = template.path;
        }, 100);
        
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
        
        // Convert template path to zip file path
        // Example: 'Portfolio_1/index.html' -> 'downloads/Portfolio_1.zip'
        const zipPath = `downloads/${templatePath.split('/')[0]}.zip`;
        
        link.href = zipPath;
        link.download = `${templateName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // If the file doesn't exist, show an error after a short delay
        setTimeout(() => {
            if (!link.visited) {
                alert('Download failed. The template zip file was not found.');
            }
        }, 2000);
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
