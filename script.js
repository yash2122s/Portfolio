// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with mobile-friendly settings
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: 'mobile' // Disable animations on mobile for better performance
    });

    // Skill Progress Animation
    const progressBars = document.querySelectorAll('.progress');
    
    // Function to animate progress bars
    function animateProgressBar(progressBar) {
        const value = progressBar.getAttribute('data-value');
        progressBar.style.width = `${value}%`;
    }

    // Observe progress bars and animate when they come into view
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Start observing each progress bar
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Mobile Menu Toggle with improved touch handling
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn.querySelector('i');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    if (menuBtn && navLinks) {
        // Handle both click and touch events
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Close menu when clicking/touching outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Handle touch events on nav links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (isMenuOpen) {
                    toggleMenu();
                }
            });

            // Add touch feedback
            item.addEventListener('touchstart', () => {
                item.style.opacity = '0.7';
            });

            item.addEventListener('touchend', () => {
                item.style.opacity = '1';
            });
        });
    }

    // Improved Smooth scroll for navigation with touch handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    toggleMenu();
                }
                
                // Smooth scroll with offset for header
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to Top functionality
    const scrollTopButton = document.getElementById('scroll-top');
    if (scrollTopButton) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollTopButton.style.display = 'flex';
                scrollTopButton.style.opacity = '1';
            } else {
                scrollTopButton.style.opacity = '0';
                setTimeout(() => {
                    if (scrollTopButton.style.opacity === '0') {
                        scrollTopButton.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Smooth scroll to top
        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Improved Sticky Navigation with better performance
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let scrollTimeout;

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Throttle scroll events for better performance
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 50) {
                        navbar.classList.add('sticky');
                        
                        // Only hide navbar if menu is closed
                        if (!isMenuOpen) {
                            if (currentScroll > lastScroll && currentScroll > 300) {
                                navbar.style.transform = 'translateY(-100%)';
                            } else {
                                navbar.style.transform = 'translateY(0)';
                            }
                        }
                    } else {
                        navbar.classList.remove('sticky');
                    }
                    
                    lastScroll = currentScroll;
                    scrollTimeout = null;
                }, 50);
            }
        }, { passive: true }); // Add passive flag for better scroll performance
    }

    // Typing Animation for Hero Section
    const typeText = document.querySelector('.bio');
    if (typeText) {
        const text = typeText.textContent;
        typeText.textContent = '';

        let i = 0;
        function type() {
            if (i < text.length) {
                typeText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-item');
    const projects = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Animate projects filtering
                projects.forEach(project => {
                    project.style.opacity = '0';
                    project.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || project.classList.contains(filter)) {
                            project.style.display = 'block';
                            setTimeout(() => {
                                project.style.opacity = '1';
                                project.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            project.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
    }

    // Form Submission with validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message with animation
            contactForm.reset();
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.remove();
                }, 300);
            }, 3000);
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle device orientation changes
    window.addEventListener('orientationchange', () => {
        // Reset any necessary styles or states
        if (isMenuOpen) {
            toggleMenu();
        }
        
        // Force AOS to refresh
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    });

    // Add touch ripple effect to buttons
    const buttons = document.querySelectorAll('.primary-btn, .secondary-btn');
    buttons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.touches[0].clientX - rect.left}px`;
            ripple.style.top = `${e.touches[0].clientY - rect.top}px`;
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}); 