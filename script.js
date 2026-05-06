// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Loading Screen ---
    const loader = document.getElementById('loader');
    if (loader) setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // --- 2. Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Activate custom cursor robustly on first mouse move
    let customCursorInitialized = false;

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        if (!customCursorInitialized) {
            document.body.classList.add('has-custom-cursor');
            customCursorInitialized = true;
        }
        
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Smoother outline follow
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 100, fill: "forwards" });
    });

    // Hover effects on clickable elements
    const clickables = document.querySelectorAll('a, button, .hover-expand, .skill-card, .cert-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '50px';
            cursorOutline.style.height = '50px';
            cursorOutline.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
    }

    // --- 3. Auto Update Year ---
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // --- 4. Navbar Scroll & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinksList = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });

    if (hamburger && navLinksList) hamburger.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
        const isOpen = navLinksList.classList.contains('active');
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        hamburger.innerHTML = isOpen 
            ? "<i class='bx bx-x'></i>" 
            : "<i class='bx bx-menu'></i>";
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList) navLinksList.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (hamburger) {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open navigation menu');
                hamburger.innerHTML = "<i class='bx bx-menu'></i>";
            }
        });
    });

    // --- 5. Highlight active section ---
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        let scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            if (scrollPos > section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href') || '';
                    if (section.getAttribute('id') === href.substring(1)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 6. Typed.js Initialization ---
    const typedText = document.querySelector('.typed-text');
    if (typedText && window.Typed) {
        new Typed('.typed-text', {
            strings: ['IT &amp; AI Solutions Specialist', 'Workflow Automation Expert', 'Problem Solver'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '_'
        });
    } else if (typedText) {
        typedText.textContent = 'IT & AI Solutions Specialist';
    }

    // --- 7. tsParticles Initialization ---
    if (window.tsParticles && document.getElementById('tsparticles')) {
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        background: {
            color: { value: "transparent" }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.5 } },
                push: { quantity: 3 }
            }
        },
        particles: {
            color: { value: "#00D4FF" },
            links: {
                color: "#00D4FF",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false
            },
            number: {
                density: { enable: true, area: 800 },
                value: window.innerWidth < 768 ? 20 : 60
            },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
    });
    }

    // --- 8. AOS Initialization (Scroll Animations) ---
    if (window.AOS) AOS.init({
        duration: 800,
        once: false,
        mirror: true,
        offset: window.innerWidth < 768 ? 50 : 100
    });

    // --- 9. Stats Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / 50; // Controls speed

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                hasCounted = true;
            }
        });
    }, { threshold: 0.2 });
    
    // Find the stats grid directly to trigger counter, ensuring it fires on mobile
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) countUpObserver.observe(statsSection);

    // --- 10. Skills Progress Bar Animation ---
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-progress');
                bar.style.width = width;
            }
        });
    }, { threshold: 0.2 });

    progressBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // --- 11. Magnetic Buttons (Desktop UX) ---
    const magneticElements = document.querySelectorAll('.magnetic');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const btnWidth = rect.width;
                const btnHeight = rect.height;
                const transX = (x - btnWidth / 2) * 0.3; 
                const transY = (y - btnHeight / 2) * 0.3;
                
                el.style.transform = `translate(${transX}px, ${transY}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // --- 12. Private Contact Form Integration ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const contactStartedAt = document.getElementById('contactStartedAt');

    const resetContactTimer = () => {
        if (contactStartedAt) contactStartedAt.value = String(Date.now());
    };

    const setFormStatus = (type, message, iconClass) => {
        if (!formStatus) return;
        formStatus.className = `form-status ${type}`;
        formStatus.replaceChildren();

        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.setAttribute('aria-hidden', 'true');

        const text = document.createElement('span');
        text.textContent = message;

        formStatus.append(icon, text);
    };

    const setSubmitState = (isSending) => {
        if (!submitBtn) return;
        submitBtn.disabled = isSending;
        submitBtn.setAttribute('aria-busy', String(isSending));
    };
    
    if (contactForm) {
        resetContactTimer();

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const formData = new FormData(contactForm);
            const honeypot = String(formData.get('company') || '').trim();
            if (honeypot) {
                setFormStatus('success', 'Message sent successfully.', 'bx bx-check-circle');
                contactForm.reset();
                resetContactTimer();
                return;
            }

            setSubmitState(true);
            setFormStatus('sending', 'Sending your message...', 'bx bx-loader-alt bx-spin');

            const payload = {
                name: String(formData.get('name') || '').trim(),
                email: String(formData.get('email') || '').trim(),
                message: String(formData.get('message') || '').trim(),
                company: honeypot,
                started_at: String(formData.get('started_at') || '')
            };

            try {
                const endpoint = contactForm.getAttribute('action') || '/api/contact';
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                let result = {};
                try {
                    result = await response.json();
                } catch (_) {
                    result = {};
                }

                if (!response.ok || result.ok === false) {
                    throw new Error(result.message || 'Unable to send message right now.');
                }

                setFormStatus('success', 'Message sent successfully.', 'bx bx-check-circle');
                contactForm.reset();
                resetContactTimer();

                setTimeout(() => {
                    formStatus.className = 'form-status';
                }, 5000);
            } catch (error) {
                setFormStatus('error', error.message || 'Unable to send message right now.', 'bx bx-error-circle');
            } finally {
                setSubmitState(false);
            }
        });
    }
});
