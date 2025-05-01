// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
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

    // Add hover effect to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active'); // Close mobile menu after clicking
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
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

    // Sticky Navigation with hide on scroll down
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('sticky');
                
                // Hide navbar on scroll down, show on scroll up
                if (currentScroll > lastScroll) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.classList.remove('sticky');
            }
            
            lastScroll = currentScroll;
        });
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
}); 