// Star Trek Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Audio control functionality
    const audio = document.getElementById('background-audio');
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    
    if (audio && audioToggle && audioIcon) {
        // Set initial volume
        audio.volume = 0.3;
        
        // Handle audio toggle
        audioToggle.addEventListener('click', function() {
            if (audio.muted) {
                audio.muted = false;
                audioIcon.textContent = '🎵';
                audioToggle.setAttribute('aria-label', 'Mute background music');
            } else {
                audio.muted = true;
                audioIcon.textContent = '🔇';
                audioToggle.setAttribute('aria-label', 'Unmute background music');
            }
        });
        
        // Handle user interaction to start audio (required by browsers)
        function enableAudio() {
            audio.muted = false;
            audioIcon.textContent = '🎵';
            audioToggle.setAttribute('aria-label', 'Mute background music');
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('keydown', enableAudio);
        }
        
        // Add event listeners for user interaction
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('keydown', enableAudio, { once: true });
    }
    
    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        let currentSection = '';
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const scrollTop = window.pageYOffset;
            
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
    
    // Star Trek Stardate Calculator
    function calculateStardate() {
        const now = new Date();
        const start = new Date('2323-01-01'); // Star Trek TNG era start
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysSinceStart = Math.floor((now - start) / msPerDay);
        const stardate = (daysSinceStart / 365.25).toFixed(1);
        
        return stardate;
    }
    
    // Update stardate in footer
    const stardateElement = document.getElementById('stardate');
    if (stardateElement) {
        stardateElement.textContent = calculateStardate();
    }
    
    // Terminal typing animation
    function typeText(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Animate terminal content on page load
    const terminalLines = document.querySelectorAll('.terminal-line');
    if (terminalLines.length > 0) {
        terminalLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            setTimeout(() => {
                typeText(line, text, 30);
            }, index * 1000);
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.work-card, .stat-card, .about-text, .hero-text');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // LCARS-style button sound effects (optional)
    function playButtonSound() {
        // This would be where you'd add sound effects
        // For now, we'll just add a visual feedback
        const buttons = document.querySelectorAll('.btn, .nav-link, .work-link');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
    
    playButtonSound();
    
    // Console command simulation
    const consoleCommands = [
        { prompt: 'humanities@research:~$', command: 'explore --digital-frontier' },
        { prompt: '', command: 'Initializing digital humanities protocols...' },
        { prompt: '', command: 'Philosophy.js loaded successfully' },
        { prompt: '', command: 'Ready for exploration' }
    ];
    
    // Dynamic background grid effect
    function createStarField() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.backgroundColor = '#ffffff';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.5 + 0.2;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            
            heroSection.appendChild(star);
        }
    }
    
    // Add twinkling animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize star field
    createStarField();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Console blinking cursor effect
    function addBlinkingCursor() {
        const lastTerminalLine = document.querySelector('.terminal-line:last-child .output');
        if (lastTerminalLine) {
            const cursor = document.createElement('span');
            cursor.textContent = '█';
            cursor.style.animation = 'blink 1s infinite';
            cursor.style.color = '#99CC99';
            lastTerminalLine.appendChild(cursor);
            
            // Add blink animation
            const blinkStyle = document.createElement('style');
            blinkStyle.textContent = `
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(blinkStyle);
        }
    }
    
    // Add cursor after terminal animation completes
    setTimeout(addBlinkingCursor, 4000);
    
    // Form validation and LCARS-style feedback (for future contact forms)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add LCARS-style loading indicator
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'TRANSMITTING...';
                    submitBtn.disabled = true;
                    
                    // Simulate transmission
                    setTimeout(() => {
                        submitBtn.textContent = 'TRANSMISSION COMPLETE';
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 2000);
                }
            });
        });
    }
    
    initFormValidation();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        // Arrow key navigation for featured work cards
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const workCards = document.querySelectorAll('.work-card');
            const focusedElement = document.activeElement;
            const currentIndex = Array.from(workCards).indexOf(focusedElement);
            
            if (currentIndex !== -1) {
                e.preventDefault();
                let nextIndex;
                
                if (e.key === 'ArrowLeft') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : workCards.length - 1;
                } else {
                    nextIndex = currentIndex < workCards.length - 1 ? currentIndex + 1 : 0;
                }
                
                workCards[nextIndex].focus();
            }
        }
    });
    
    // Make work cards focusable
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const link = card.querySelector('.work-link');
                if (link) {
                    e.preventDefault();
                    link.click();
                }
            }
        });
    });
});

// Additional utility functions
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('preferred-theme', theme);
}

function getPreferredTheme() {
    return localStorage.getItem('preferred-theme') || 'default';
}

// Initialize theme
document.addEventListener('DOMContentLoaded', function() {
    setTheme(getPreferredTheme());
});
