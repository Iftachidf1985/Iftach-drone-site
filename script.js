    // DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const loading = document.getElementById('loading');

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.classList.add('fade-out');
        document.body.style.opacity = '1';
    }, 1500);
});

// Initialize page opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.8s ease-in';

// Mobile Navigation Toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Animate mobile menu bars
    const spans = mobileMenu.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        // Reset mobile menu bars
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Enhanced Navbar Scroll Effects
let lastScrollTop = 0;
let ticking = false;

function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for background effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll with smooth animation
    if (scrollTop > lastScrollTop && scrollTop > 300) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animations for service cards
            if (entry.target.classList.contains('service-card')) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            } else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .about-text, .about-image, .portfolio-item, .contact-item, .stat-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });
});

// Enhanced Parallax Effect
let parallaxElements = [];

function initParallax() {
    parallaxElements = [
        {
            element: document.querySelector('.hero-video'),
            speed: 0.5
        },
        {
            element: document.querySelector('.hero-overlay'),
            speed: 0.3
        }
    ];
}

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(item => {
        if (item.element) {
            const yPos = -(scrolled * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        }
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateParallax);
});

window.addEventListener('load', initParallax);

// Advanced Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
        submitButton.disabled = true;
        
        // Simulate form processing
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success notification
            showNotification('תודה! ההודעה נשלחה בהצלחה. נחזור אליך בהקדם.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('אירעה שגיאה. אנא נסה שוב מאוחר יותר.', 'error');
        } finally {
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Advanced Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const bgColor = type === 'success' ? 
        'linear-gradient(135deg, #00d455, #00aa44)' : 
        'linear-gradient(135deg, #ff3232, #cc2828)';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced notification styling
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transform: translateX(120%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 400px;
        min-width: 300px;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 16px;
        font-weight: 500;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
        margin-left: auto;
        padding: 5px;
    `;
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeNotification(notification);
    }, 6000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 400);
}

// Enhanced Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled > 200) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Animated Counter for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        let count = 0;
        const increment = target / 60; // 60 frames for smooth animation
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.ceil(count) + '+';
            }
        }, 30);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    let countersAnimated = false;
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                setTimeout(animateCounters, 500);
                countersAnimated = true;
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    aboutObserver.observe(aboutSection);
}

// Enhanced Button Interactions
document.querySelectorAll('.cta-button').forEach(btn => {
    btn.addEventListener('mouseenter', createRippleEffect);
    btn.addEventListener('mouseleave', () => {
        // Add subtle scale animation on hover out
        btn.style.transform = btn.style.transform.replace('scale(1.02)', 'scale(1)');
    });
});

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
        
        if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Video Error Handling with Enhanced Fallback
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.addEventListener('error', () => {
        const hero = document.querySelector('.hero');
        hero.style.background = `
            linear-gradient(135deg, 
                rgba(0, 212, 255, 0.3) 0%, 
                rgba(0, 0, 0, 0.8) 50%, 
                rgba(0, 0, 0, 0.9) 100%),
            radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.2) 0%, transparent 50%),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(0,212,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>')
        `;
        hero.style.backgroundSize = 'cover, cover, 80px 80px';
        hero.style.backgroundPosition = 'center, center, center';
        heroVideo.style.display = 'none';
    });
}

// Enhanced Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #0099cc);
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
window.addEventListener('load', createScrollProgress);

// Enhanced Service Card Hover Effects
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        // Add glow effect to icon
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.filter = 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.8))';
        }
        
        // Animate feature badges
        const badges = card.querySelectorAll('.feature-badge');
        badges.forEach((badge, i) => {
            setTimeout(() => {
                badge.style.transform = 'scale(1.05)';
                badge.style.background = 'rgba(0, 212, 255, 0.3)';
            }, i * 100);
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.filter = 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))';
        }
        
        const badges = card.querySelectorAll('.feature-badge');
        badges.forEach(badge => {
            badge.style.transform = 'scale(1)';
            badge.style.background = 'rgba(0, 212, 255, 0.2)';
        });
    });
});

// Portfolio Item Enhanced Interactions
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Add subtle rotation and glow
        item.style.transform = 'scale(1.05) rotate(1deg)';
        item.style.boxShadow = '0 25px 50px rgba(0, 212, 255, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
        item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
    });
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 2000);
});

// Advanced Form Field Animations
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(field => {
    field.addEventListener('focus', () => {
        field.parentElement.style.transform = 'translateY(-2px)';
        field.style.borderColor = '#00d4ff';
        field.style.boxShadow = '0 5px 25px rgba(0, 212, 255, 0.3)';
    });
    
    field.addEventListener('blur', () => {
        field.parentElement.style.transform = 'translateY(0)';
        if (!field.value) {
            field.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            field.style.boxShadow = 'none';
        }
    });
});

// Mouse Trail Effect (Subtle)
let mouseTrail = [];
document.addEventListener('mousemove', (e) => {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    // Limit trail length
    if (mouseTrail.length > 15) {
        mouseTrail = mouseTrail.slice(-15);
    }
    
    // Clean old trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
});

// Performance Optimization - Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
const handleResize = debounce(() => {
    // Recalculate parallax elements
    initParallax();
    
    // Update mobile menu state
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        
        const spans = mobileMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}, 250);

window.addEventListener('resize', handleResize);

// Add dynamic styles for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: #00d4ff !important;
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.8) !important;
    }
    
    .nav-menu a.active::after {
        width: 100% !important;
    }
    
    .scroll-progress {
        animation: pulse-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes pulse-glow {
        from { box-shadow: 0 0 5px rgba(0, 212, 255, 0.5); }
        to { box-shadow: 0 0 15px rgba(0, 212, 255, 0.8); }
    }
`;

document.head.appendChild(dynamicStyles);

// Final initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚁 SkyTech Drones website loaded successfully!');
    
    // Add entrance animation to main elements
    setTimeout(() => {
        document.querySelector('.navbar').style.opacity = '1';
        document.querySelector('.hero-content').style.opacity = '1';
    }, 500);
});
