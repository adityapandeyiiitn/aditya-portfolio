document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Check if it's a touch device, if so don't run custom cursor logic to save performance
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a slight delay to the outline for a trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Add hover effect to interactive elements
        const interactables = document.querySelectorAll('a, button, .project-card, .skill-category, .hamburger');

        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const navIcon = document.querySelector('.hamburger i');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                navIcon.classList.remove('fa-bars');
                navIcon.classList.add('fa-times');
            } else {
                navIcon.classList.remove('fa-times');
                navIcon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navIcon.classList.remove('fa-times');
            navIcon.classList.add('fa-bars');
        });
    });

    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- Typing Effect for Tagline ---
    const typeWriterElement = document.querySelector('.type-writer');
    if (typeWriterElement) {
        const text = typeWriterElement.innerHTML;
        typeWriterElement.innerHTML = '';
        let i = 0;

        // Wait a bit before starting the typing effect
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    typeWriterElement.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50); // Adjust speed here
        }, 1000);
    }

    // --- Matrix Rain Background Canvas ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/'.split('');
        const fontSize = 14;
        let columns = canvas.width / fontSize;
        let drops = [];

        // Initialize drops
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        const drawMatrix = () => {
            // Translucent black background to create fading tail
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41'; // Matrix Green
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];

                // Add some blue/purple characters randomly for cyberpunk feel
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#00f0ff'; // Neon Blue
                } else if (Math.random() > 0.96) {
                    ctx.fillStyle = '#bd00ff'; // Neon Purple
                } else {
                    ctx.fillStyle = '#00ff41'; // Back to Green
                }

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Re-initialize drops if window is resized significantly
        window.addEventListener('resize', () => {
            columns = canvas.width / fontSize;
            drops = [];
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
        });

        // Only draw matrix if not on mobile to save battery/performance, 
        // or draw it slower.
        let matrixInterval = isTouchDevice ? 100 : 50;
        setInterval(drawMatrix, matrixInterval);
    }
});
