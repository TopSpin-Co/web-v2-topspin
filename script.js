document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    // Toggle Theme — support both desktop and mobile buttons
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

    // Tubelight Nav Slider
    const navPill = document.querySelector('.nav-pill-wrap');
    const navSlider = document.querySelector('.nav-slider');
    const navItems = document.querySelectorAll('.nav-item');

    if (navPill && navSlider && navItems.length) {
        const moveSlider = (el) => {
            const navRect = navPill.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            navSlider.style.left = (elRect.left - navRect.left) + 'px';
            navSlider.style.width = elRect.width + 'px';
        };

        // Set initial active item based on current page
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let activeItem = null;

        navItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === currentPath || (currentPath === 'index.html' && href && href.startsWith('index.html'))) {
                activeItem = item;
            } else if (href === currentPath) {
                activeItem = item;
            }
        });

        // Default to first item if no match
        if (!activeItem) activeItem = navItems[0];
        activeItem.classList.add('active');

        // Position slider on load
        requestAnimationFrame(() => moveSlider(activeItem));

        // Hover: move slider to hovered item
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => moveSlider(item));
        });

        // Mouse leave nav: return slider to active item
        navPill.addEventListener('mouseleave', () => {
            const current = navPill.querySelector('.nav-item.active');
            if (current) moveSlider(current);
        });

        // Reposition on resize
        window.addEventListener('resize', () => {
            const current = navPill.querySelector('.nav-item.active');
            if (current) moveSlider(current);
        });
    }

    // Hamburger Menu
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                hamburgerBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            }
        });

        // Close on menu item click
        mobileMenu.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Rotating Phrases in Hero
    const phrases = document.querySelectorAll('.rotating-phrase');
    if (phrases.length > 1) {
        let currentIndex = 0;

        setInterval(() => {
            const current = phrases[currentIndex];
            current.classList.remove('active');
            current.classList.add('exit');

            currentIndex = (currentIndex + 1) % phrases.length;
            const next = phrases[currentIndex];

            // Reset position below before animating in
            next.classList.remove('exit');
            next.style.transition = 'none';
            next.style.transform = 'translateY(100%)';
            next.style.opacity = '0';

            // Force reflow then restore CSS control
            next.offsetHeight;
            next.style.removeProperty('transition');
            next.style.removeProperty('transform');
            next.style.removeProperty('opacity');
            next.classList.add('active');

            // Clean up exit class after transition
            setTimeout(() => {
                current.classList.remove('exit');
            }, 500);
        }, 2500);
    }

    // Metrics Counter Animation
    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection) {
        let hasAnimated = false;

        const countUp = (el, target, prefix, suffix, duration) => {
            const start = 0;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(start + (target - start) * eased);

                el.textContent = (prefix || '') + current + (suffix || '');

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        };

        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // Fade in items
                    const items = metricsSection.querySelectorAll('.metric-item');
                    items.forEach(item => item.classList.add('visible'));

                    // Count up numbers
                    const numbers = metricsSection.querySelectorAll('.metric-number[data-target]');
                    numbers.forEach(el => {
                        const target = parseInt(el.dataset.target);
                        const prefix = el.dataset.prefix || '';
                        const suffix = el.dataset.suffix || '';
                        el.textContent = prefix + '0' + suffix;
                        setTimeout(() => countUp(el, target, prefix, suffix, 1800), 300);
                    });

                    metricsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        metricsObserver.observe(metricsSection);
    }

    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const targetTab = btn.getAttribute('data-tab');
                const pane = document.getElementById(targetTab);
                if (pane) {
                    pane.classList.add('active');
                }
            });
        });
    }

    // Accordion Logic for FAQ
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            // Toggle active class on header
            header.classList.toggle('active');

            // Toggle maxHeight for smooth transition
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Workflow Sticky Scroll Logic
    const wfPhases = document.querySelectorAll('.wf-phase');
    const wfBoxes = document.querySelectorAll('.wf-box');
    const wfConnectors = document.querySelectorAll('.wf-connector');
    const wfNodes = document.querySelectorAll('.wf-node');

    if (wfPhases.length > 0 && wfBoxes.length > 0) {
        const activatePhase = (phaseNum) => {
            // Update boxes
            wfBoxes.forEach(box => box.classList.remove('wf-box--active'));
            const activeNode = document.querySelector(`.wf-node[data-phase="${phaseNum}"]`);
            if (activeNode) {
                activeNode.querySelector('.wf-box').classList.add('wf-box--active');
            }

            // Update connectors — mark all before current phase as done
            wfConnectors.forEach(connector => {
                const afterPhase = parseInt(connector.getAttribute('data-after'));
                if (afterPhase < phaseNum) {
                    connector.classList.add('wf-connector--done');
                } else {
                    connector.classList.remove('wf-connector--done');
                }
            });

            // Update phase content visibility
            wfPhases.forEach(phase => {
                const pNum = parseInt(phase.getAttribute('data-phase'));
                if (pNum === phaseNum) {
                    phase.classList.add('wf-phase--active');
                } else {
                    phase.classList.remove('wf-phase--active');
                }
            });

            // We handle the header shrink continuously via scroll listener rather than discrete phases
        };

        // Sticky Header Continuous Shrink on Scroll
        const wfSection = document.querySelector('.wf-section');
        const wfHeader = document.querySelector('.wf-header');
        
        if (wfSection && wfHeader) {
            const handleHeaderShrink = () => {
                const sectionRect = wfSection.getBoundingClientRect();
                // The header becomes sticky when section top is at 90px (its top offset)
                // We track how far the section has scrolled PAST 90px
                const scrollDist = 90 - sectionRect.top;
                
                // We map 0-250px of scroll distance to a 0-1 progress value
                let progress = 0;
                if (scrollDist > 0) {
                    progress = Math.min(1, scrollDist / 250);
                }
                
                wfHeader.style.setProperty('--shrink-progress', progress);
            };
            
            window.addEventListener('scroll', handleHeaderShrink, { passive: true });
            handleHeaderShrink(); // Initialize on load
        }

        // Intersection Observer
        const wfObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const phaseNum = parseInt(entry.target.getAttribute('data-phase'));
                    activatePhase(phaseNum);
                }
            });
        }, {
            rootMargin: '-150px 0px 0px 0px',
            threshold: 0.33
        });

        wfPhases.forEach(phase => wfObserver.observe(phase));

        // Activate phase 1 on load
        activatePhase(1);
    }
});
