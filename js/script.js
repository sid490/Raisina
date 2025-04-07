// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add page load animation
  document.body.classList.add('loaded');

  // Mobile menu toggle
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');

  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') &&
          !e.target.closest('.hamburger-menu') &&
          !e.target.closest('.nav-links')) {
        navLinks.classList.remove('active');
        hamburgerMenu.classList.remove('active');
      }
    });
  }

  // Image slider functionality
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Change slide every 5 seconds if there are multiple slides
  if (slides.length > 1) {
    setInterval(nextSlide, 5000);
  }

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animated');
      }
    });
  };

  // Add animate-on-scroll class to elements
  const addAnimationClasses = () => {
    document.querySelectorAll('.about-section, .gallery-preview, .gallery-item, .contact-info-card, .contact-form').forEach(el => {
      el.classList.add('animate-on-scroll');
    });
  };

  // Initialize animations
  addAnimationClasses();
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load

  // Parallax effect for background elements
  const parallaxElements = document.querySelectorAll('.parallax');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.2;
      element.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // Add hover effects for interactive elements
  const addHoverEffects = () => {
    const interactiveElements = document.querySelectorAll('.links-container a, .nav-links a, .gallery-item, .view-more, .submit-btn');

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('hover-effect');
      });

      element.addEventListener('mouseleave', () => {
        element.classList.remove('hover-effect');
      });
    });
  };

  addHoverEffects();

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.submit-btn, .view-more');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Handle form submission with animation
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = this.querySelector('.submit-btn');
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';

        // Reset form
        setTimeout(() => {
          this.reset();
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1500);
    });
  }
});

// Add a class to body when page is fully loaded
window.addEventListener('load', () => {
  document.body.classList.add('page-loaded');

  // Add prefers-reduced-motion check for accessibility
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
  }
});

// Handle responsive behavior
window.addEventListener('resize', () => {
  // Close mobile menu on window resize
  const navLinks = document.querySelector('.nav-links');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburgerMenu.classList.remove('active');
  }
});
