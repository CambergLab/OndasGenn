// Grupo Ondas Website JavaScript - Enhanced with Instagram Integration
// Mobile navigation, smooth scrolling, animations, and Instagram feed

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initAnimations();
    initInstagramFeed();
    initPhoneLinks();
    initAccessibility();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .contact-item, .instagram-post');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Instagram Feed Integration - Simplified and Reliable
function initInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    // Use a simple, reliable approach with embedded Instagram posts
    loadInstagramEmbed();
}

// Load Instagram Embed - Working Solution
function loadInstagramEmbed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;

    // Clear existing content
    instagramContainer.innerHTML = `
        <div class="instagram-embed-container">
            <div class="instagram-embed-message">
                <div class="instagram-icon" style="margin-bottom: 1rem;">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>
                    </svg>
                </div>
                <h3 style="color: #2E5BBA; margin-bottom: 1rem;">Latest from @grupoondascapoeira</h3>
                <p style="color: #666; margin-bottom: 2rem; line-height: 1.6;">
                    Follow our Instagram for daily updates, training highlights, and community events.
                    See our capoeira journey unfold with behind-the-scenes content and live training sessions.
                </p>
                <div class="instagram-cta-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <a href="https://instagram.com/grupoondascapoeira"
                       target="_blank"
                       rel="noopener"
                       class="instagram-button-primary"
                       style="background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
                              color: white;
                              padding: 12px 24px;
                              text-decoration: none;
                              border-radius: 25px;
                              font-weight: bold;
                              transition: transform 0.3s ease;
                              display: inline-block;">
                        Follow @grupoondascapoeira
                    </a>
                    <a href="https://instagram.com/grupoondascapoeira"
                       target="_blank"
                       rel="noopener"
                       class="instagram-button-secondary"
                       style="border: 2px solid #2E5BBA;
                              color: #2E5BBA;
                              padding: 10px 22px;
                              text-decoration: none;
                              border-radius: 25px;
                              font-weight: bold;
                              transition: all 0.3s ease;
                              display: inline-block;">
                        View Recent Posts
                    </a>
                </div>
            </div>
        </div>
    `;

    // Add hover effects
    const primaryButton = instagramContainer.querySelector('.instagram-button-primary');
    const secondaryButton = instagramContainer.querySelector('.instagram-button-secondary');

    if (primaryButton) {
        primaryButton.addEventListener('mouseenter', () => {
            primaryButton.style.transform = 'translateY(-2px) scale(1.05)';
        });
        primaryButton.addEventListener('mouseleave', () => {
            primaryButton.style.transform = 'translateY(0) scale(1)';
        });
    }

    if (secondaryButton) {
        secondaryButton.addEventListener('mouseenter', () => {
            secondaryButton.style.background = '#2E5BBA';
            secondaryButton.style.color = 'white';
            secondaryButton.style.transform = 'translateY(-2px)';
        });
        secondaryButton.addEventListener('mouseleave', () => {
            secondaryButton.style.background = 'transparent';
            secondaryButton.style.color = '#2E5BBA';
            secondaryButton.style.transform = 'translateY(0)';
        });
    }
}

// Custom Instagram Feed Implementation (Fallback)
function loadCustomInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    
    // Simulate Instagram posts with fallback content
    const fallbackPosts = [
        {
            id: '1',
            caption: 'Training session at our Warwick location! 🥋 #capoeira #grupoondas #martialarts',
            media_url: 'images/grupo_ondas_ocean_state_encounter.jpg',
            permalink: 'https://instagram.com/grupoondascapoeira'
        },
        {
            id: '2',
            caption: 'Community performance bringing Afro-Brazilian culture to Rhode Island! 🎵 #capoeira #culture #performance',
            media_url: 'images/grupo_ondas_southside_cultural_center.jpg',
            permalink: 'https://instagram.com/grupoondascapoeira'
        }
    ];
    
    try {
        // Clear loading content
        instagramContainer.innerHTML = '';
        
        // Create posts from fallback data
        fallbackPosts.forEach(post => {
            const postElement = createInstagramPost(post);
            instagramContainer.appendChild(postElement);
        });
        
        // Add message about live feed
        const messageDiv = document.createElement('div');
        messageDiv.className = 'instagram-message';
        messageDiv.innerHTML = `
            <p style="text-align: center; color: #666; font-style: italic; margin-top: 2rem;">
                For the latest posts, visit our 
                <a href="https://instagram.com/grupoondascapoeira" target="_blank" style="color: #2E5BBA;">
                    Instagram page @grupoondascapoeira
                </a>
            </p>
        `;
        instagramContainer.appendChild(messageDiv);
        
    } catch (error) {
        console.error('Error loading custom Instagram feed:', error);
        showInstagramFallback();
    }
}

// Create Instagram Post Element
function createInstagramPost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'instagram-post';
    postDiv.style.opacity = '0';
    postDiv.style.transform = 'translateY(30px)';
    
    postDiv.innerHTML = `
        <img src="${post.media_url}" alt="Instagram post" loading="lazy" />
        <p>${post.caption || ''}</p>
        <a href="${post.permalink}" target="_blank" rel="noopener">View on Instagram</a>
    `;
    
    // Animate post appearance
    setTimeout(() => {
        postDiv.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        postDiv.style.opacity = '1';
        postDiv.style.transform = 'translateY(0)';
    }, 100);
    
    return postDiv;
}

// Instagram Fallback Content
function showInstagramFallback() {
    const instagramContainer = document.getElementById('instagram-feed');
    instagramContainer.innerHTML = `
        <div class="instagram-fallback" style="text-align: center; padding: 3rem;">
            <h3 style="color: #2E5BBA; margin-bottom: 1rem;">Follow Our Journey</h3>
            <p style="color: #666; margin-bottom: 2rem;">
                Stay updated with our latest capoeira training sessions, performances, and community events.
            </p>
            <a href="https://instagram.com/grupoondascapoeira" 
               target="_blank" 
               rel="noopener"
               class="instagram-link">
                Visit @grupoondascapoeira on Instagram
            </a>
        </div>
    `;
}

// Phone Number Click-to-Call Enhancement
function initPhoneLinks() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2E5BBA;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
        main.setAttribute('role', 'main');
    }
    
    // Enhance form accessibility
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-labelledby', label.id || 'label-' + input.id);
            }
        }
    });
}

// Card Hover Effects Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Logo Animation - Simplified to always show logo
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo-img');
    if (logo) {
        // Ensure logo is always visible
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
        logo.style.transition = 'transform 0.3s ease';

        // Only add hover effect
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});



// Error Handling for External Resources
window.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        console.warn('Image failed to load:', event.target.src);
        event.target.style.display = 'none';
    }
});

// Social Media Link Tracking (Optional Analytics)
function initSocialTracking() {
    const socialLinks = document.querySelectorAll('a[href*="instagram.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track social media clicks (can be integrated with analytics)
            console.log('Instagram link clicked:', this.href);
        });
    });
}

// Initialize social tracking
document.addEventListener('DOMContentLoaded', initSocialTracking);

// Responsive Navigation Enhancements
function enhanceResponsiveNav() {
    const navMenu = document.querySelector('.nav-menu');
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const hamburger = document.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });
}

// Initialize responsive navigation enhancements
document.addEventListener('DOMContentLoaded', enhanceResponsiveNav);

// Scroll-based Header Effects
function initScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Initialize scroll effects
document.addEventListener('DOMContentLoaded', initScrollEffects);

// Add CSS for scroll effects
const scrollStyles = document.createElement('style');
scrollStyles.textContent = `
    header.scrolled {
        background-color: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(scrollStyles);
