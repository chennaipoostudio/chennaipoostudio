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
// Gallery Swipe Carousel
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    
    const swipeWrapper = document.getElementById('gallerySwipeWrapper');
    const indicatorsContainer = document.getElementById('galleryIndicators');
    
    let currentIndex = 0;
    let totalSlides = 0;
    let filteredSlides = [];
    let allSlides = [];
    
    // Initialize gallery
    function initGallery() {
        allSlides = Array.from(document.querySelectorAll('.gallery-slide'));
        totalSlides = allSlides.length;
        
        // Create indicators
        createIndicators();
        
        // Set initial active indicator
        updateIndicators();
        
        // Initialize touch events
        initTouchEvents();
        
        // Filter to show all by default
        filterGallery('all');
    }
    
    // Create indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('gallery-swipe-indicator');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Update indicators
    function updateIndicators() {
        const indicators = document.querySelectorAll('.gallery-swipe-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (filteredSlides.length === 0) return;
        
        // Find the actual index in filtered slides
        const actualIndex = Math.min(index, filteredSlides.length - 1);
        currentIndex = actualIndex;
        
        const slideWidth = filteredSlides[0].offsetWidth;
        const gap = 20; // gap in px
        const translateX = -((slideWidth + gap) * actualIndex);
        
        swipeWrapper.style.transform = `translateX(${translateX}px)`;
        updateIndicators();
    }
    
    // Next slide
    window.nextSlide = function() {
        if (filteredSlides.length === 0) return;
        
        currentIndex = (currentIndex + 1) % filteredSlides.length;
        goToSlide(currentIndex);
    }
    
    // Previous slide
    window.prevSlide = function() {
        if (filteredSlides.length === 0) return;
        
        currentIndex = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
        goToSlide(currentIndex);
    }
    
    // Gallery filtering functionality
    window.filterGallery = function(category) {
        // Update active button
        const buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Find and activate the clicked button
        const clickedButton = Array.from(buttons).find(btn => 
            btn.textContent.toLowerCase().includes(category.toLowerCase()) || category === 'all'
        );
        if (clickedButton) {
            clickedButton.classList.add('active');
        }

        // Filter gallery items
        filteredSlides = [];
        allSlides.forEach(slide => {
            if (category === 'all' || slide.classList.contains(category)) {
                slide.classList.remove('hidden');
                filteredSlides.push(slide);
            } else {
                slide.classList.add('hidden');
            }
        });
        
        // Reset to first slide of filtered set
        currentIndex = 0;
        goToSlide(0);
        
        // Update indicators based on filtered slides
        updateIndicators();
    }
    
    // Touch events for swipe
    function initTouchEvents() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        swipeWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        swipeWrapper.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
            touchEndY = e.touches[0].clientY;
        });
        
        swipeWrapper.addEventListener('touchend', () => {
            if (!touchStartX || !touchEndX) return;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Only swipe horizontally if horizontal movement is greater than vertical
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (Math.abs(diffX) > 50) { // Minimum swipe distance
                    if (diffX > 0) {
                        nextSlide(); // Swipe left
                    } else {
                        prevSlide(); // Swipe right
                    }
                }
            }
            
            touchStartX = 0;
            touchEndX = 0;
            touchStartY = 0;
            touchEndY = 0;
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize gallery
    initGallery();
    
    // Open modal function
    window.openModal = function(src, caption) {
        modal.style.display = 'flex';
        modalImg.src = src;
        modalCaption.textContent = caption;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal function
    window.closeModal = function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    }

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});


// ========================================
// Console Easter Egg
// ========================================
console.log('%c🌸 Chennai Poo Studio 🌸', 'font-size: 20px; color: #6B7D5C; font-weight: bold;');
console.log('%cThe Bouquet Shop - Bringing Nature\'s Beauty to Your Special Moments', 'font-size: 12px; color: #8B9D7C;');
console.log('%cWebsite crafted with love 💚', 'font-size: 10px; color: #9CAF88; font-style: italic;');
