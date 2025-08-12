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

// Instagram Feed Integration
function initInstagramFeed() {
    const instagramContainer = document.getElementById('instagram-feed');
    if (!instagramContainer) return;
    
    // Primary method: Elfsight Widget (recommended from research)
    loadElfsightWidget();
    
    // Fallback method: Custom implementation with error handling
    setTimeout(() => {
        if (instagramContainer.querySelector('.instagram-loading')) {
            loadCustomInstagramFeed();
        }
    }, 5000); // Wait 5 seconds for Elfsight to load
}

// Load Elfsight Instagram Widget
function loadElfsightWidget() {
    // For this implementation, we'll use the custom fallback directly
    // since we don't have a specific Elfsight widget ID configured
    console.log('Using custom Instagram feed implementation');
    loadCustomInstagramFeed();
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
