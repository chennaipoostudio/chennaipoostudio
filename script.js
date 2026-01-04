// ========================================
// Smooth Scroll for Navigation Links
// ========================================
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

// ========================================
// Add Active State to Navigation Links
// ========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Intersection Observer for Fade-in Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .contact-method, .social-btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// Add Parallax Effect to Hero Section (Fixed)
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ========================================
// Dynamic Floating Flowers
// ========================================
const heroFlowers = document.querySelector('.hero-flowers');
if (heroFlowers) {
    // Add random movement to flowers on mouse move
    document.addEventListener('mousemove', (e) => {
        const flowers = document.querySelectorAll('.floating-flower');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        flowers.forEach((flower, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            flower.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ========================================
// Add Loading Animation
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Button Click Effects
// ========================================
document.querySelectorAll('.btn, .social-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn, .social-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        background: rgba(255, 255, 255, 0.3);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ========================================
// Slideshow Gallery Functionality
// ========================================
let slideIndex = 1;
let slideInterval;

// Initialize slideshow when page loads
window.addEventListener('load', () => {
    showSlides(slideIndex);
    // Auto-advance slides every 5 seconds
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
});

// Next/previous controls
function changeSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    // Restart auto-advance after manual change
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Thumbnail image controls
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    // Restart auto-advance after manual change
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return; // No slides found
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add("active");
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

// Pause slideshow when user hovers over it
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 5000);
    });
}

// Keyboard navigation for slideshow
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// ========================================
// Console Easter Egg
// ========================================
console.log('%c🌸 Chennai Poo Studio 🌸', 'font-size: 20px; color: #6B7D5C; font-weight: bold;');
console.log('%cThe Bouquet Shop - Bringing Nature\'s Beauty to Your Special Moments', 'font-size: 12px; color: #8B9D7C;');
console.log('%cWebsite crafted with love 💚', 'font-size: 10px; color: #9CAF88; font-style: italic;');
