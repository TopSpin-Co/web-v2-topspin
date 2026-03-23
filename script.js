document.addEventListener('DOMContentLoaded', () => {
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
        const serviciosPaths = ['lgaas.html', 'roaas.html', 'crm-admin.html'];
        let activeItem = null;

        const fullPath = window.location.pathname;

        if (currentPath === 'index.html' || currentPath === '' || currentPath === '/') {
            activeItem = navPill.querySelector('.nav-item-home');
        } else if (serviciosPaths.includes(currentPath)) {
            activeItem = navPill.querySelector('.nav-item-servicios');
        } else if (fullPath.includes('/blog/') || fullPath.includes('/case/')) {
            const section = fullPath.includes('/blog/') ? 'blog.html' : 'case.html';
            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href && href.includes(section)) {
                    activeItem = item;
                }
            });
        } else {
            navItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === currentPath) {
                    activeItem = item;
                }
            });
        }

        // Pages with no nav item selected (e.g. contacto)
        const noHighlightPages = ['contacto.html', 'privacy-policy.html'];
        if (noHighlightPages.includes(currentPath)) {
            activeItem = null;
        }

        // Default to home if no match (except for no-highlight pages)
        if (!activeItem && !noHighlightPages.includes(currentPath)) {
            activeItem = navPill.querySelector('.nav-item-home') || navItems[0];
        }

        if (activeItem) {
            activeItem.classList.add('active');
            requestAnimationFrame(() => moveSlider(activeItem));
        } else {
            navSlider.style.width = '0';
        }

        // Hover: move slider to hovered item
        navItems.forEach(item => {
            item.addEventListener('mouseenter', () => moveSlider(item));
        });

        // Mouse leave nav: return slider to active item (or hide if none)
        navPill.addEventListener('mouseleave', () => {
            const current = navPill.querySelector('.nav-item.active');
            if (current) {
                moveSlider(current);
            } else {
                navSlider.style.width = '0';
            }
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

    // Dolor Section — Carousel
    const carouselDolor = document.getElementById('carouselDolor');
    if (carouselDolor) {
        const slides = carouselDolor.querySelectorAll('.slide-dolor');
        const prevBtn = document.getElementById('prevDolor');
        const nextBtn = document.getElementById('nextDolor');
        const dotsContainer = document.getElementById('dotsContainer');
        let currentDolor = 0;
        let dolorInterval;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'dot-dolor' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToDolor(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot-dolor');

        function goToDolor(index) {
            slides[currentDolor].classList.remove('active');
            dots[currentDolor].classList.remove('active');
            currentDolor = ((index % slides.length) + slides.length) % slides.length;
            slides[currentDolor].classList.add('active');
            dots[currentDolor].classList.add('active');
            resetDolorInterval();
        }

        function resetDolorInterval() {
            clearInterval(dolorInterval);
            dolorInterval = setInterval(() => goToDolor(currentDolor + 1), 4000);
        }

        prevBtn.addEventListener('click', () => goToDolor(currentDolor - 1));
        nextBtn.addEventListener('click', () => goToDolor(currentDolor + 1));

        // Pause on hover
        carouselDolor.addEventListener('mouseenter', () => clearInterval(dolorInterval));
        carouselDolor.addEventListener('mouseleave', resetDolorInterval);

        resetDolorInterval();
    }

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

        // Activate the phase with the highest % visible in the viewport
        const getMostVisiblePhase = () => {
            let maxVisible = -1;
            let best = 1;
            const vh = window.innerHeight;
            wfPhases.forEach(phase => {
                const rect = phase.getBoundingClientRect();
                const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
                const ratio = rect.height > 0 ? visiblePx / rect.height : 0;
                if (ratio > maxVisible) {
                    maxVisible = ratio;
                    best = parseInt(phase.getAttribute('data-phase'));
                }
            });
            return best;
        };

        window.addEventListener('scroll', () => activatePhase(getMostVisiblePhase()), { passive: true });

        // Initialize on load
        activatePhase(getMostVisiblePhase());
    }

    // ICP Sector Tabs
    const sectorTabBtns = document.querySelectorAll('.sector-tab-btn');
    const sectorTabPanes = document.querySelectorAll('.sector-tab-pane');

    if (sectorTabBtns.length > 0) {
        sectorTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sectorTabBtns.forEach(b => b.classList.remove('active'));
                sectorTabPanes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const targetId = btn.getAttribute('data-sector');
                const pane = document.getElementById(targetId);
                if (pane) pane.classList.add('active');
            });
        });
    }

    // Evolución Section — Fade in on scroll
    const evolucionSection = document.querySelector('.evolucion-section');
    if (evolucionSection) {
        const evoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = evolucionSection.querySelectorAll('.evolucion-card');
                    const closing = evolucionSection.querySelector('.evolucion-closing');
                    cards.forEach(card => card.classList.add('visible'));
                    if (closing) closing.classList.add('visible');
                    evoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        evoObserver.observe(evolucionSection);
    }

    // Cases Carousel — click to expand
    const caseSlides = document.querySelectorAll('.case-slide');
    const casesCarousel = document.querySelector('.cases-carousel');
    caseSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('active')) return;

            // Lock the carousel height to prevent jump during transition
            if (casesCarousel) {
                const currentHeight = casesCarousel.offsetHeight;
                casesCarousel.style.height = currentHeight + 'px';
            }

            caseSlides.forEach(s => s.classList.remove('active'));
            void slide.offsetHeight;
            slide.classList.add('active');

            // After flex transition ends, release the fixed height smoothly
            if (casesCarousel) {
                setTimeout(() => {
                    const newHeight = casesCarousel.scrollHeight;
                    casesCarousel.style.transition = 'height 0.3s ease';
                    casesCarousel.style.height = newHeight + 'px';
                    setTimeout(() => {
                        casesCarousel.style.height = '';
                        casesCarousel.style.transition = '';
                    }, 320);
                }, 500);
            }
        });
    });

    // FAQ Toggle — show/hide extra questions
    const faqToggle = document.getElementById('faqToggle');
    if (faqToggle) {
        let faqExpanded = false;
        faqToggle.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.faq-hidden');
            faqExpanded = !faqExpanded;
            hiddenItems.forEach(item => {
                item.classList.toggle('faq-visible', faqExpanded);
            });
            faqToggle.textContent = faqExpanded ? 'Ver menos preguntas −' : 'Ver más preguntas +';
        });
    }

    // Cases Filter
    const caseCards = document.querySelectorAll('.card-case');
    const casesCountNum = document.getElementById('casesCountNum');
    const filterBar = document.getElementById('casesFilterBar');
    const filterWrap = document.querySelector('.cases-filter-wrap');
    const filterTrigger = document.getElementById('casesFilterTrigger');
    const filterLabel = document.getElementById('casesFilterLabel');
    const filterOptions = document.querySelectorAll('.filter-option');

    if (caseCards.length > 0) {
        // Staggered scroll-in animation
        const caseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    caseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        caseCards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.04}s`;
            caseObserver.observe(card);
        });

        // Sticky detection
        if (filterBar) {
            const stickyObserver = new IntersectionObserver(
                ([entry]) => {
                    filterBar.classList.toggle('stuck', !entry.isIntersecting);
                },
                { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
            );
            stickyObserver.observe(filterBar);
        }

        // Filter function
        const filterCases = (category) => {
            let visibleCount = 0;
            let delay = 0;

            caseCards.forEach(card => {
                if (card.classList.contains('card-case-cta') || category === 'todos' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.style.transitionDelay = `${delay * 0.03}s`;
                    card.classList.remove('visible');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('visible');
                        });
                    });
                    visibleCount++;
                    delay++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });

            if (casesCountNum) {
                casesCountNum.textContent = visibleCount;
            }
        };

        // Mobile toggle
        if (filterTrigger && filterWrap) {
            filterTrigger.addEventListener('click', () => {
                filterWrap.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!filterWrap.contains(e.target)) {
                    filterWrap.classList.remove('open');
                }
            });
        }

        // Option click — filter, update label, close dropdown
        filterOptions.forEach(option => {
            option.addEventListener('click', () => {
                const category = option.getAttribute('data-category');
                filterOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                if (filterLabel) filterLabel.textContent = option.textContent;
                if (filterWrap) filterWrap.classList.remove('open');
                filterCases(category);
            });
        });
    }

    // Team Carousel
    const teamCards = document.querySelectorAll('.about-team-carousel .team-member-card');
    const carouselDots = document.querySelectorAll('.carousel-dot');

    if (teamCards.length > 0) {
        let teamIndex = 0;
        let teamInterval;

        const showTeamCard = (index) => {
            teamCards.forEach(card => card.classList.remove('active'));
            carouselDots.forEach(dot => dot.classList.remove('active'));
            teamCards[index].classList.add('active');
            carouselDots[index].classList.add('active');
            teamIndex = index;
        };

        const startTeamRotation = () => {
            teamInterval = setInterval(() => {
                showTeamCard((teamIndex + 1) % teamCards.length);
            }, 3500);
        };

        carouselDots.forEach(dot => {
            dot.addEventListener('click', () => {
                clearInterval(teamInterval);
                showTeamCard(parseInt(dot.dataset.index));
                startTeamRotation();
            });
        });

        startTeamRotation();
    }

    // LGaaS scroll animations — IntersectionObserver
    document.querySelectorAll('.lgaas-fade, .lgaas-slide-left, .lgaas-slide-right, .lgaas-scale-in').forEach(el => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        observer.observe(el);
    });

    // Blog Filter
    const blogCards = document.querySelectorAll('.blog-card');
    const blogCountNum = document.getElementById('blogCountNum');
    const blogFilterBar = document.getElementById('blogFilterBar');
    const blogFilterWrap = document.querySelector('.blog-filter-wrap');
    const blogFilterTrigger = document.getElementById('blogFilterTrigger');
    const blogFilterLabel = document.getElementById('blogFilterLabel');
    const blogFilterOptions = document.querySelectorAll('.blog-filter-options .filter-option');

    if (blogCards.length > 0) {
        // Staggered scroll-in animation
        const blogObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    blogObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        blogCards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 0.04}s`;
            blogObserver.observe(card);
        });

        // Sticky detection
        if (blogFilterBar) {
            const blogStickyObserver = new IntersectionObserver(
                ([entry]) => {
                    blogFilterBar.classList.toggle('stuck', !entry.isIntersecting);
                },
                { threshold: 1, rootMargin: '-1px 0px 0px 0px' }
            );
            blogStickyObserver.observe(blogFilterBar);
        }

        // Filter function
        const filterBlog = (category) => {
            let visibleCount = 0;
            let delay = 0;

            blogCards.forEach(card => {
                const cardCategories = card.getAttribute('data-categories') || '';
                if (category === 'todos' || cardCategories.includes(category)) {
                    card.classList.remove('hidden');
                    card.style.transitionDelay = `${delay * 0.03}s`;
                    card.classList.remove('visible');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('visible');
                        });
                    });
                    visibleCount++;
                    delay++;
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });

            if (blogCountNum) {
                blogCountNum.textContent = visibleCount;
            }
        };

        // Mobile toggle
        if (blogFilterTrigger && blogFilterWrap) {
            blogFilterTrigger.addEventListener('click', () => {
                blogFilterWrap.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!blogFilterWrap.contains(e.target)) {
                    blogFilterWrap.classList.remove('open');
                }
            });
        }

        // Option click
        blogFilterOptions.forEach(option => {
            option.addEventListener('click', () => {
                const category = option.getAttribute('data-category');
                blogFilterOptions.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                if (blogFilterLabel) blogFilterLabel.textContent = option.textContent;
                if (blogFilterWrap) blogFilterWrap.classList.remove('open');
                filterBlog(category);
            });
        });
    }

    // Float logos — fade + blur on scroll
    const floatBg = document.querySelector('.float-bg');
    if (floatBg) {
        const logos = floatBg.querySelectorAll('.float-logo');
        const maxScroll = 400;

        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            const progress = Math.min(1, y / maxScroll);
            const opacity = 1 - progress * 0.75; // min 0.25 — never fully disappear
            const blur = progress * 10; // max 10px blur

            logos.forEach(logo => {
                logo.style.opacity = opacity;
                logo.style.filter = `blur(${blur}px)`;
            });
        }, { passive: true });
    }

    // ── Calculadora TAM (flujo por pasos) ──
    const calcTrigger = document.getElementById('calcTrigger');
    const calcTamForm = document.getElementById('calcTamForm');

    if (calcTrigger && calcTamForm) {
        const formatNum = (n) => n.toLocaleString('es-ES');

        // Datos hardcodeados por país (estimaciones simplificadas de empresas B2B)
        const TAM_DATA = {
            industries: {
                finance_insurance_legal: { base: 42000 },
                technology_software_internet: { base: 28000 },
                education_training: { base: 18000 },
                science_health_wellness: { base: 35000 },
                construction_manufacturing: { base: 52000 },
                consumer_retail_goods: { base: 61000 },
                food_hospitality: { base: 72000 },
                transport_logistics_travel: { base: 24000 },
                business_services_consulting: { base: 47000 },
                creative_media_entertainment: { base: 15000 },
                agriculture_food_rural: { base: 31000 },
                nonprofits_public: { base: 12000 },
                materials_light_manufacturing: { base: 19000 },
                research_design_innovation: { base: 8000 }
            },
            employeeBuckets: [
                { max: 10, pct: 0.72 },
                { max: 50, pct: 0.18 },
                { max: 250, pct: 0.07 },
                { max: 1000, pct: 0.02 },
                { max: Infinity, pct: 0.01 }
            ],
            // Revenue en miles de €
            revenueBuckets: [
                { max: 500, pct: 0.55 },
                { max: 2000, pct: 0.25 },
                { max: 10000, pct: 0.12 },
                { max: 50000, pct: 0.06 },
                { max: Infinity, pct: 0.02 }
            ],
            // Multiplicador por país (base = España = 1.0)
            countries: {
                espana: 1.00, portugal: 0.22, francia: 1.85, alemania: 2.10,
                italia: 1.45, reino_unido: 1.90, paises_bajos: 0.55,
                belgica: 0.35, suiza: 0.30, eeuu: 8.50, latam: 3.20
            }
        };

        // Filtrar por buckets con overlap parcial
        function filterByBuckets(min, max, buckets) {
            if (!min && !max) return 1.0;
            const userMin = min || 0;
            const userMax = max || Infinity;
            let total = 0;
            let prevMax = 0;
            for (const b of buckets) {
                if (userMax > prevMax && userMin <= b.max) {
                    const bucketRange = b.max === Infinity ? 10000 : (b.max - prevMax);
                    const overlapStart = Math.max(userMin, prevMax);
                    const overlapEnd = b.max === Infinity ? Math.max(userMax, overlapStart + 1) : Math.min(userMax, b.max);
                    const fraction = Math.min(1, (overlapEnd - overlapStart) / bucketRange);
                    total += b.pct * fraction;
                }
                prevMax = b.max;
            }
            return Math.min(1, total);
        }

        function calculateTAM() {
            const checked = calcTamForm.querySelectorAll('input[name="tam-industry"]:checked');
            if (checked.length === 0) return { tam: 0, reuniones: 0 };

            let industryTotal = 0;
            checked.forEach(cb => {
                const data = TAM_DATA.industries[cb.value];
                if (data) industryTotal += data.base;
            });

            const empMin = parseFloat(document.getElementById('tam-emp-min').value) || 0;
            const empMax = parseFloat(document.getElementById('tam-emp-max').value) || 0;
            const empMultiplier = filterByBuckets(empMin, empMax, TAM_DATA.employeeBuckets);

            const revMin = parseFloat(document.getElementById('tam-rev-min').value) || 0;
            const revMax = parseFloat(document.getElementById('tam-rev-max').value) || 0;
            const revMultiplier = filterByBuckets(revMin, revMax, TAM_DATA.revenueBuckets);

            // Sumar multiplicadores de países seleccionados
            const locationChecked = calcTamForm.querySelectorAll('input[name="tam-location"]:checked');
            let countryMultiplier = 0;
            locationChecked.forEach(cb => {
                countryMultiplier += TAM_DATA.countries[cb.value] || 0;
            });
            if (countryMultiplier === 0) countryMultiplier = 1.0; // default si no selecciona ninguno

            const tam = Math.round(industryTotal * empMultiplier * revMultiplier * countryMultiplier);
            const reuniones = Math.max(5, Math.min(120, Math.round(tam * 0.003)));

            return { tam, reuniones };
        }

        // Actualizar contador de industrias seleccionadas
        const industryCount = document.getElementById('calcIndustryCount');
        calcTamForm.querySelectorAll('input[name="tam-industry"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const count = calcTamForm.querySelectorAll('input[name="tam-industry"]:checked').length;
                industryCount.textContent = '(' + count + ' seleccionado' + (count !== 1 ? 's' : '') + ')';
            });
        });

        // Location dropdown toggle
        const locationSelect = document.getElementById('calcLocationSelect');
        const locationTrigger = document.getElementById('calcLocationTrigger');
        const locationLabel = document.getElementById('calcLocationLabel');
        const locationCount = document.getElementById('calcLocationCount');

        if (locationTrigger) {
            locationTrigger.addEventListener('click', () => {
                locationSelect.classList.toggle('open');
            });

            // Cerrar al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!locationSelect.contains(e.target)) {
                    locationSelect.classList.remove('open');
                }
            });

            // Actualizar label y contador
            calcTamForm.querySelectorAll('input[name="tam-location"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    const checked = calcTamForm.querySelectorAll('input[name="tam-location"]:checked');
                    const count = checked.length;
                    locationCount.textContent = '(' + count + ' seleccionado' + (count !== 1 ? 's' : '') + ')';
                    if (count === 0) {
                        locationLabel.textContent = 'Selecciona países';
                    } else {
                        const names = Array.from(checked).map(c => c.closest('.calc-checkbox-item').querySelector('span:last-child').textContent);
                        locationLabel.textContent = names.length <= 3 ? names.join(', ') : names.slice(0, 3).join(', ') + ' +' + (names.length - 3);
                    }
                });
            });
        }

        // Flujo por pasos
        const loading = document.getElementById('calcLoading');
        const results = document.getElementById('calcResults');
        const leadSection = document.getElementById('calcLeadSection');
        const recalcBtn = document.getElementById('calcRecalc');

        const runCalculation = () => {
            const checked = calcTamForm.querySelectorAll('input[name="tam-industry"]:checked');
            if (checked.length === 0) {
                const grid = calcTamForm.querySelector('.calc-checkbox-grid');
                grid.classList.add('highlight');
                setTimeout(() => grid.classList.remove('highlight'), 1500);
                return;
            }

            calcTrigger.style.display = 'none';
            calcTamForm.style.display = 'none';
            recalcBtn.classList.remove('visible');
            results.classList.remove('visible');
            leadSection.classList.remove('visible');
            loading.classList.add('visible');

            setTimeout(() => {
                const { tam, reuniones } = calculateTAM();
                document.getElementById('calc-res-tam').textContent = formatNum(tam);
                document.getElementById('calc-res-reuniones').textContent = '+' + reuniones;

                loading.classList.remove('visible');
                results.classList.add('visible');
                recalcBtn.classList.add('visible');

                setTimeout(() => { leadSection.classList.add('visible'); }, 600);
            }, 2000);
        };

        const recalculate = () => {
            results.classList.remove('visible');
            recalcBtn.classList.remove('visible');
            leadSection.classList.remove('visible');
            calcTamForm.style.display = 'flex';
            calcTrigger.style.display = 'inline-block';
        };

        calcTrigger.addEventListener('click', runCalculation);
        recalcBtn.addEventListener('click', recalculate);

        // Submit email → toast
        const calcForm = document.getElementById('calcLeadForm');
        if (calcForm) {
            calcForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const toast = document.getElementById('calcToast');
                const btn = calcForm.querySelector('button[type="submit"]');

                btn.disabled = true;
                btn.textContent = 'Enviado';
                btn.style.opacity = '0.6';
                calcForm.querySelector('input').disabled = true;

                toast.classList.add('visible');
                setTimeout(() => { toast.classList.remove('visible'); }, 4000);
            });
        }
    }
});
