// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.transform = navMenu.classList.contains('active') 
            ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? 0 : index === 0 ? 5 : -5}px, ${index === 1 ? 0 : index === 0 ? 5 : -5}px)`
            : 'none';
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(45deg, #A50708, #DC143C)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'linear-gradient(45deg, #A50708, #DC143C)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    }
});

// Animate elements on scroll
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

// Observe all menu items and gallery items
document.querySelectorAll('.menu-item, .gallery-item, .event-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Form submission
const reservationForm = document.querySelector('.reservation-form form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const date = this.querySelector('input[type="date"]').value;
        const time = this.querySelector('input[type="time"]').value;
        const guests = this.querySelector('select').value;
        const requests = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !phone || !date || !time || !guests) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message
        alert(`Thank you ${name}! Your reservation request has been submitted. We'll contact you at ${phone} to confirm your booking for ${guests} guests on ${date} at ${time}.`);
        
        // Reset form
        this.reset();
    });
}

// Add floating animation to Punjabi motifs
document.querySelectorAll('.punjabi-motifs i').forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`;
});

// Add truck art border animation
const truckArtBorder = document.querySelector('.truck-art-border');
if (truckArtBorder) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        truckArtBorder.style.borderImage = `linear-gradient(45deg, 
            hsl(${hue}, 80%, 50%), 
            hsl(${(hue + 120) % 360}, 80%, 50%), 
            hsl(${(hue + 240) % 360}, 80%, 50%), 
            hsl(${hue}, 80%, 50%)) 1`;
    }, 100);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add entrance animations
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add wavy animation to English letters
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'wavy-letter';
            span.textContent = char === ' ' ? '\u00A0' : char; // Non-breaking space for spaces
            span.style.animationDelay = `${index * 0.1}s`;
            heroSubtitle.appendChild(span);
        });
    }
});

// Menu Book Functionality
let currentPage = 0;
const totalPages = 6;

function updatePageDisplay() {
    const pages = document.querySelectorAll('.menu-page');
    const pageIndicator = document.getElementById('pageIndicator');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');

    if (pages.length === 0) return;

    // Reset all pages and position them correctly
    pages.forEach((page, index) => {
        page.style.display = 'block';
        page.classList.remove('active', 'prev', 'future', 'flipped', 'flipped-right', 'stacked');
        
        // Reset inline styles
        page.style.transform = '';
        page.style.opacity = '';
        
        if (index === currentPage) {
            // Current active page
            page.classList.add('active');
            page.style.zIndex = '10';
        } else if (index < currentPage) {
            // Previous pages - stack behind current page with slight random offset
            page.classList.add('prev');
            page.style.zIndex = String(5 - (currentPage - index));
            
            // Add random scattered effect for pages behind
            const randomX = (Math.random() - 0.5) * 8; // -4 to 4px
            const randomY = (Math.random() - 0.5) * 6; // -3 to 3px
            const randomRot = (Math.random() - 0.5) * 2; // -1 to 1 degree
            page.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${randomRot}deg)`;
        } else {
            // Future pages - create random scattered stack behind first page
            page.classList.add('stacked');
            page.style.zIndex = String(index - currentPage);
            
            // Random scattered stack effect
            const baseOffset = (index - currentPage) * 1.5;
            const randomX = (Math.random() - 0.5) * 12 - baseOffset; // Random with base offset
            const randomY = (Math.random() - 0.5) * 10 + baseOffset; // Random with base offset
            const randomRotation = (Math.random() - 0.5) * 4; // -2 to 2 degrees
            page.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${randomRotation}deg)`;
        }
    });

    // Update page indicator
    if (pageIndicator) {
        pageIndicator.textContent = `Page ${currentPage + 1} of ${totalPages}`;
    }
    
    // Update button states
    if (prevButton) {
        prevButton.disabled = currentPage === 0;
    }
    if (nextButton) {
        nextButton.disabled = currentPage === totalPages - 1;
    }
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        const currentPageElement = document.querySelectorAll('.menu-page')[currentPage];
        
        if (currentPageElement) {
            // Animate current page moving to the back without opacity change
            currentPageElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            currentPageElement.style.transform = 'translateX(0) rotateY(0deg) translateZ(-50px)';
            currentPageElement.style.zIndex = '5';
        }
        
        setTimeout(() => {
            currentPage++;
            updatePageDisplay();
            playPageFlipSound();
        }, 200);
    }
}

function previousPage() {
    if (currentPage > 0) {
        const pages = document.querySelectorAll('.menu-page');
        const newCurrentPage = pages[currentPage - 1];
        
        if (newCurrentPage) {
            // Animate the previous page coming from the back to front without opacity change
            newCurrentPage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            newCurrentPage.style.transform = 'translateX(0) rotateY(0deg) translateZ(0px)';
            newCurrentPage.style.zIndex = '10';
        }
        
        setTimeout(() => {
            currentPage--;
            updatePageDisplay();
            playPageFlipSound();
        }, 200);
    }
}

function playPageFlipSound() {
    // Optional: Add a subtle page flip sound
    // You can add an audio element and play it here
}

// Add click handlers for flip zones
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.menu-page');
    const menuBook = document.querySelector('.menu-book');
    
    // Create side navigation buttons
    const prevButton = document.createElement('button');
    prevButton.id = 'prevPage';
    prevButton.className = 'side-nav-button';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.style.pointerEvents = 'all';
    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        previousPage();
    });
    
    const nextButton = document.createElement('button');
    nextButton.id = 'nextPage';
    nextButton.className = 'side-nav-button';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.style.pointerEvents = 'all';
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        nextPage();
    });
    
    // Insert buttons before and after the menu container
    menuBook.insertBefore(prevButton, menuBook.firstChild);
    menuBook.appendChild(nextButton);
    
    pages.forEach((page) => {
        // Create flip zones for each page
        const flipZones = document.createElement('div');
        flipZones.className = 'page-flip-zones';
        
        const leftZone = document.createElement('div');
        leftZone.className = 'flip-zone-left';
        leftZone.addEventListener('click', (e) => {
            e.stopPropagation();
            previousPage();
        });
        
        const rightZone = document.createElement('div');
        rightZone.className = 'flip-zone-right';
        rightZone.addEventListener('click', (e) => {
            e.stopPropagation();
            nextPage();
        });
        
        flipZones.appendChild(leftZone);
        flipZones.appendChild(rightZone);
        page.appendChild(flipZones);
    });
    
    // Initialize the menu book
    updatePageDisplay();
});

// Keyboard navigation for menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        previousPage();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next page
            nextPage();
        } else {
            // Swiped right - previous page
            previousPage();
        }
    }
}
