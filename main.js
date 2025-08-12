// Grupo Ondas Website JavaScript
// Minimal JavaScript for navigation and interactive elements

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Set active navigation item based on current page
    setActiveNavItem();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Initialize any page-specific functionality
    initializePageSpecificFeatures();
});

// Set active navigation item based on current page
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Handle different page matching scenarios
        if (
            (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === './index.html' || linkHref === '/')) ||
            (currentPage === 'about.html' && (linkHref === 'about.html' || linkHref === './about.html')) ||
            (currentPage === 'songs.html' && (linkHref === 'songs.html' || linkHref === './songs.html')) ||
            (currentPage === '' && (linkHref === 'index.html' || linkHref === './index.html' || linkHref === '/'))
        ) {
            link.classList.add('active');
        }
    });
}

// Add enhanced hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.card, .song-card, .instrument-card, .style-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
}

// Initialize page-specific features
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            initializeHomepage();
            break;
        case 'about.html':
            initializeAboutPage();
            break;
        case 'songs.html':
            initializeSongsPage();
            break;
    }
}

// Homepage specific functionality
function initializeHomepage() {
    // Add click-to-call functionality for phone numbers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On desktop, show a confirmation dialog
            if (window.innerWidth > 768) {
                const phoneNumber = this.getAttribute('href').replace('tel:', '');
                if (!confirm(`Call ${phoneNumber}?`)) {
                    e.preventDefault();
                }
            }
        });
    });
    
    // Add animation to location cards on scroll
    observeLocationCards();
}

// About page specific functionality
function initializeAboutPage() {
    // Add fade-in animation for sections
    observeSections();
    
    // Add click functionality to social media links
    const socialLinks = document.querySelectorAll('a[href*="instagram.com"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track social media clicks (placeholder for analytics)
            console.log('Instagram link clicked');
        });
    });
}

// Songs page specific functionality
function initializeSongsPage() {
    // Add interactive elements for instrument cards
    const instrumentCards = document.querySelectorAll('.instrument-card');
    instrumentCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle pulse effect when clicked
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Add comparison highlighting for style cards
    const styleCards = document.querySelectorAll('.style-card');
    styleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Slightly dim other style cards when hovering one
            styleCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Restore opacity to all cards
            styleCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });
}

// Intersection Observer for location cards animation
function observeLocationCards() {
    const locationCards = document.querySelectorAll('.card');
    
    if (locationCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        locationCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
}

// Intersection Observer for sections fade-in
function observeSections() {
    const sections = document.querySelectorAll('section');
    
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }
}

// Utility function to format phone numbers for display
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

// Utility function to validate email addresses
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add CSS animation keyframes dynamically
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animation styles
addAnimationStyles();

// Handle window resize events
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Handle scroll events for header shadow
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    }
});

// Export functions for potential external use
window.GrupoOndasWebsite = {
    setActiveNavItem,
    formatPhoneNumber,
    isValidEmail
};