// Projects page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter project cards
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update visible count
            updateProjectCount(filterValue);
        });
    });
    
    function updateProjectCount(filter) {
        const visibleCards = Array.from(projectCards).filter(card => {
            const categories = card.getAttribute('data-category').split(' ');
            return filter === 'all' || categories.includes(filter);
        });
        
        console.log(`Showing ${visibleCards.length} projects for filter: ${filter}`);
    }
    
    // Search functionality for projects
    function addProjectSearch() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search projects...';
        searchInput.className = 'project-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 12px 16px;
            margin: 0 auto 2rem;
            display: block;
            background: var(--bg-card);
            border: 2px solid var(--lcars-blue);
            border-radius: var(--border-radius);
            color: var(--text-primary);
            font-family: var(--font-secondary);
            font-size: 1rem;
        `;
        
        const filterSection = document.querySelector('.projects-filter');
        if (filterSection) {
            filterSection.appendChild(searchInput);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                projectCards.forEach(card => {
                    const title = card.querySelector('.project-title').textContent.toLowerCase();
                    const description = card.querySelector('.project-description').textContent.toLowerCase();
                    const techTags = Array.from(card.querySelectorAll('.tech-tag'))
                        .map(tag => tag.textContent.toLowerCase()).join(' ');
                    
                    const matches = title.includes(searchTerm) || 
                                  description.includes(searchTerm) || 
                                  techTags.includes(searchTerm);
                    
                    if (matches) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.4s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // If search is active, disable filter buttons
                if (searchTerm) {
                    filterButtons.forEach(btn => btn.disabled = true);
                } else {
                    filterButtons.forEach(btn => btn.disabled = false);
                    // Reapply current filter
                    const activeFilter = document.querySelector('.filter-btn.active');
                    if (activeFilter) {
                        activeFilter.click();
                    }
                }
            });
        }
    }
    
    // Add search functionality
    addProjectSearch();
    
    // Animate project cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // Project card interaction enhancements
    projectCards.forEach(card => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        // Add click to expand functionality
        card.addEventListener('click', function(e) {
            // Don't expand if clicking on a link
            if (e.target.tagName === 'A') return;
            
            const isExpanded = this.classList.contains('expanded');
            
            // Collapse all other cards
            projectCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            this.classList.toggle('expanded');
            
            // Add expanded content if it doesn't exist
            if (!isExpanded && !this.querySelector('.expanded-content')) {
                addExpandedContent(this);
            }
        });
    });
    
    function addExpandedContent(card) {
        const expandedContent = document.createElement('div');
        expandedContent.className = 'expanded-content';
        expandedContent.style.cssText = `
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--lcars-blue);
            animation: fadeIn 0.3s ease-out;
        `;
        
        const projectTitle = card.querySelector('.project-title').textContent;
        const additionalInfo = getAdditionalProjectInfo(projectTitle);
        
        expandedContent.innerHTML = `
            <h4 style="color: var(--lcars-purple); margin-bottom: 0.5rem;">Project Details</h4>
            <p style="color: var(--text-secondary); line-height: 1.6;">${additionalInfo}</p>
            <div style="margin-top: 1rem;">
                <strong style="color: var(--lcars-orange);">Timeline:</strong>
                <span style="color: var(--text-secondary); margin-left: 0.5rem;">2023 - Present</span>
            </div>
            <div style="margin-top: 0.5rem;">
                <strong style="color: var(--lcars-orange);">Collaborators:</strong>
                <span style="color: var(--text-secondary); margin-left: 0.5rem;">Various institutions and researchers</span>
            </div>
        `;
        
        card.appendChild(expandedContent);
    }
    
    function getAdditionalProjectInfo(title) {
        const projectInfo = {
            'Philosophical Text Mining: Mapping Conceptual Networks': 'This project involves analyzing over 10,000 philosophical texts using advanced NLP techniques. The goal is to create an interactive map of philosophical concepts and their relationships across different time periods and philosophical traditions.',
            'Interactive Ethics of AI Decision Trees': 'A comprehensive web application that allows users to explore different ethical frameworks including utilitarianism, deontology, and virtue ethics as they apply to AI decision-making scenarios.',
            'Digital Critical Edition of Kant\'s Notebooks': 'Working with international Kant scholars to create the most comprehensive digital edition of Kant\'s Reflexionen, including advanced search capabilities and cross-referencing tools.',
            'Virtual Reality Philosophy Classroom': 'An innovative VR environment that recreates historical philosophical settings and allows students to engage with thought experiments in immersive ways.',
            'Sentiment Analysis of Philosophical Discourse': 'Applying state-of-the-art machine learning models to understand how emotional appeals and rhetorical strategies function in philosophical argumentation.',
            'Digital Humanities Research Dashboard': 'A comprehensive analytics platform that tracks research trends, funding patterns, and collaborative networks in the digital humanities field.'
        };
        
        return projectInfo[title] || 'Additional project details and methodology information available upon request.';
    }
    
    // Add CSS for expanded cards
    const expandedStyles = document.createElement('style');
    expandedStyles.textContent = `
        .project-card.expanded {
            grid-column: 1 / -1;
            max-width: none;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .project-search:focus {
            outline: none;
            border-color: var(--lcars-orange);
            box-shadow: 0 0 15px rgba(255, 153, 0, 0.3);
        }
        
        @media (max-width: 768px) {
            .project-card.expanded {
                grid-column: 1;
            }
        }
    `;
    document.head.appendChild(expandedStyles);
    
    // Keyboard navigation for project cards
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Collapse all expanded cards
            projectCards.forEach(card => {
                card.classList.remove('expanded');
            });
        }
    });
    
    // Add project statistics
    function displayProjectStats() {
        const stats = {
            total: projectCards.length,
            active: document.querySelectorAll('.project-status.active').length,
            completed: document.querySelectorAll('.project-status.completed').length,
            ongoing: document.querySelectorAll('.project-status.ongoing').length
        };
        
        console.log('Project Statistics:', stats);
        
        // Could add a visual stats display here
        const statsElement = document.createElement('div');
        statsElement.className = 'project-stats';
        statsElement.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
            text-align: center;
        `;
        
        statsElement.innerHTML = `
            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--lcars-blue);">
                <div style="font-size: 2rem; color: var(--lcars-orange); font-family: var(--font-primary);">${stats.total}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">Total Projects</div>
            </div>
            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--lcars-green);">
                <div style="font-size: 2rem; color: var(--lcars-green); font-family: var(--font-primary);">${stats.active}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">Active</div>
            </div>
            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--lcars-blue);">
                <div style="font-size: 2rem; color: var(--lcars-blue); font-family: var(--font-primary);">${stats.completed}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">Completed</div>
            </div>
            <div style="background: var(--bg-card); padding: 1rem; border-radius: var(--border-radius); border: 1px solid var(--lcars-orange);">
                <div style="font-size: 2rem; color: var(--lcars-orange); font-family: var(--font-primary);">${stats.ongoing}</div>
                <div style="color: var(--text-secondary); font-size: 0.9rem;">Ongoing</div>
            </div>
        `;
        
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.parentNode.insertBefore(statsElement, projectsGrid);
        }
    }
    
    // Display project statistics
    displayProjectStats();
});
