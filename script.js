
        // Initialize Typed.js
        var typed = new Typed(".text", {
            strings: ["Full Stack Developer", "Web Designer", "UI/UX Enthusiast"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        // Toggle Mobile Menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.innerHTML = navMenu.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Custom cursor
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn-box, .home-sci a, .row, .send');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });

        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#0ef" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#0ef",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });

        // Projects data
        const projects = [
            {
                title: "ScoreBoard",
                image: "./Scoreboard.png",
                description: "A simple React-based Score Keeper app to track scores, wickets, and comments in real-time with a dynamic UI. Perfect for learning React fundamentals.",
                link: "https://ashutosh6565.github.io/ScoreBoard/"
            },
            {
                title: "MovieApp",
                image: "./Movieapp.png",
                description: "A Movie App built with React that lets users browse and search for movies with detailed information. The project features a clean UI and modular code.",
                link: "https://github.com/Ashutosh6565/MovieApp"
            },
            {
                title: "E-Commerce Platform",
                image: "./project3.png",
                description: "A full-stack e-commerce solution with user authentication, product management, and payment integration. Built with MERN stack.",
                link: "#"
            },
            {
                title: "Task Management App",
                image: "https://via.placeholder.com/300x200?text=Task+App",
                description: "A productivity application for managing tasks with drag-and-drop functionality, categories, and deadline reminders.",
                link: "#"
            },
            {
                title: "Weather Dashboard",
                image: "https://via.placeholder.com/300x200?text=Weather+App",
                description: "Real-time weather application with 5-day forecast, location detection, and interactive charts using weather API.",
                link: "#"
            },
            {
                title: "Blog Platform",
                image: "https://via.placeholder.com/300x200?text=Blog+Platform",
                description: "Content management system for bloggers with rich text editor, categories, tags, and comment functionality.",
                link: "#"
            }
        ];

        // Render projects
        const projectsContainer = document.getElementById('projects-container');
        
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('row');
            projectElement.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="layer">
                    <h5>${project.title}</h5>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank"><i class='bx bx-link-external'></i></a>
                </div>
            `;
            projectsContainer.appendChild(projectElement);
        });

        // Form validation
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    isValid = false;
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = 'none';
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });

        // Scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 1s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections for animation
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
