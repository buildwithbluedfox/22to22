/* ================================================
   PLAYLIST STORY — BIRTHDAY WEBSITE FOR YASASWINI
   GSAP Animations & ScrollTrigger
   ================================================ */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ========== CONFIGURATION ==========
    const config = {
        ease: 'power2.out',
        duration: {
            text: 1.4,
            container: 1.2,
            floral: 2.5,
            floralSlow: 3.5
        },
        stagger: 0.15
    };

    // ========== UTILITY FUNCTIONS ==========

    /**
     * Initialize stroke-dasharray and stroke-dashoffset for SVG paths
     * This enables the drawing animation effect
     */
    function initFloralPaths() {
        const paths = document.querySelectorAll('.floral-path');
        paths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });
    }

    /**
     * Animate floral SVG drawing
     */
    function animateFloral(container, triggerElement, options = {}) {
        const svg = container.querySelector('.floral-svg');
        const paths = container.querySelectorAll('.floral-path');

        if (!svg || paths.length === 0) return;

        const defaults = {
            start: 'top 85%',
            duration: config.duration.floral,
            targetOpacity: 0.06,
            scrub: false
        };

        const settings = { ...defaults, ...options };

        // Animate the SVG opacity
        gsap.fromTo(svg,
            { opacity: 0 },
            {
                opacity: settings.targetOpacity,
                duration: settings.duration * 0.4,
                ease: config.ease,
                scrollTrigger: {
                    trigger: triggerElement,
                    start: settings.start,
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate each path's stroke
        paths.forEach((path, index) => {
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: settings.duration + (index * 0.3),
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: triggerElement,
                    start: settings.start,
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    /**
     * Animate text reveal
     */
    function animateText(elements, triggerElement, options = {}) {
        const defaults = {
            start: 'top 80%',
            stagger: config.stagger
        };

        const settings = { ...defaults, ...options };

        elements.forEach((el, index) => {
            const delay = parseFloat(el.dataset.delay) || (index * settings.stagger);

            gsap.fromTo(el,
                {
                    y: 15,
                    opacity: 0,
                    filter: 'blur(4px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: config.duration.text,
                    delay: delay,
                    ease: config.ease,
                    scrollTrigger: {
                        trigger: triggerElement,
                        start: settings.start,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    /**
     * Animate container entrance
     */
    function animateContainer(element, options = {}) {
        const defaults = {
            start: 'top 80%'
        };

        const settings = { ...defaults, ...options };

        gsap.fromTo(element,
            {
                scale: 0.96,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: config.duration.container,
                ease: config.ease,
                scrollTrigger: {
                    trigger: element,
                    start: settings.start,
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // ========== INITIALIZE ==========
    initFloralPaths();

    // ========== HERO SECTION ANIMATIONS ==========
    const heroSection = document.querySelector('.hero');
    const heroFloral = document.querySelector('.hero-floral');
    const heroTexts = document.querySelectorAll('.hero .reveal-text');

    // Hero floral animation (on load, not scroll)
    if (heroFloral) {
        const heroSvg = heroFloral.querySelector('.floral-svg');
        const heroPaths = heroFloral.querySelectorAll('.floral-path');

        // Animate SVG opacity
        gsap.fromTo(heroSvg,
            { opacity: 0 },
            {
                opacity: 0.07,
                duration: 2.5,
                delay: 0.3,
                ease: config.ease
            }
        );

        // Animate paths drawing
        heroPaths.forEach((path, index) => {
            gsap.to(path, {
                strokeDashoffset: 0,
                duration: 3 + (index * 0.4),
                delay: 0.5,
                ease: 'power1.out'
            });
        });
    }

    // Hero text animations (on load)
    heroTexts.forEach((el) => {
        const delay = parseFloat(el.dataset.delay) || 0;

        gsap.fromTo(el,
            {
                y: 20,
                opacity: 0,
                filter: 'blur(5px)'
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.6,
                delay: 0.8 + delay,
                ease: config.ease
            }
        );
    });

    // ========== PLAYLIST SECTION ==========
    const playlistSection = document.querySelector('.playlist-section');
    const playlistFloral = document.querySelector('.playlist-floral');
    const playlistTexts = playlistSection?.querySelectorAll('.reveal-text');
    const spotifyEmbed = document.querySelector('.spotify-embed');

    if (playlistFloral && playlistSection) {
        animateFloral(playlistFloral, playlistSection, {
            targetOpacity: 0.05,
            duration: 3
        });
    }

    if (playlistTexts) {
        animateText(playlistTexts, playlistSection);
    }

    if (spotifyEmbed) {
        animateContainer(spotifyEmbed);
    }

    // ========== SONG CHAPTERS ==========
    const chapters = document.querySelectorAll('.song-chapter');

    chapters.forEach((chapter, chapterIndex) => {
        const chapterFloral = chapter.querySelector('.chapter-floral');
        const chapterTexts = chapter.querySelectorAll('.reveal-text');
        const chapterContainer = chapter.querySelector('.section-container');
        const spotifyTrackEmbed = chapter.querySelector('.spotify-track-embed');

        // Floral animation
        if (chapterFloral) {
            animateFloral(chapterFloral, chapter, {
                start: 'top 85%',
                targetOpacity: 0.05 + (chapterIndex * 0.005), // Slightly increase opacity for later chapters
                duration: config.duration.floralSlow
            });
        }

        // Container animation
        if (chapterContainer) {
            animateContainer(chapterContainer, { start: 'top 80%' });
        }

        // Text animations
        if (chapterTexts.length > 0) {
            animateText(chapterTexts, chapter, {
                start: 'top 75%',
                stagger: 0.12
            });
        }

        // Spotify track embed animation
        if (spotifyTrackEmbed) {
            gsap.fromTo(spotifyTrackEmbed,
                {
                    scale: 0.96,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: config.duration.container,
                    delay: 0.3,
                    ease: config.ease,
                    scrollTrigger: {
                        trigger: spotifyTrackEmbed,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });

    // ========== ADD MEMORY IMAGES TO CHAPTERS ==========
    const memoryImages = [
        'assets/WhatsApp Image 2026-01-19 at 12.30.31 AM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.32 AM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.32 AM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.32 AM (2).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.33 AM.jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.33 AM (1).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.33 AM (2).jpeg',
        'assets/WhatsApp Image 2026-01-19 at 12.30.33 AM (3).jpeg'
    ];

    const positions = [
        'pos-left-center',
        'pos-right-top',
        'pos-left-bottom',
        'pos-right-center',
        'pos-left-top',
        'pos-right-bottom',
        'pos-left-center',
        'pos-right-top'
    ];

    chapters.forEach((chapter, index) => {
        if (index < memoryImages.length) {
            const img = document.createElement('img');
            img.src = memoryImages[index];
            img.alt = 'Memory';
            img.className = `memory-image ${positions[index]}`;
            img.loading = 'lazy';
            chapter.appendChild(img);

            // Animate memory images
            gsap.fromTo(img,
                {
                    opacity: 0,
                    scale: 0.8
                },
                {
                    opacity: 0.85,
                    scale: 1,
                    duration: 1.2,
                    ease: config.ease,
                    scrollTrigger: {
                        trigger: chapter,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });

    // ========== CLOSING SECTION ==========
    const closingSection = document.querySelector('.closing');
    const closingFloral = document.querySelector('.closing-floral');
    const closingTexts = closingSection?.querySelectorAll('.reveal-text');

    if (closingFloral && closingSection) {
        animateFloral(closingFloral, closingSection, {
            start: 'top 70%',
            targetOpacity: 0.08,
            duration: 4
        });
    }

    if (closingTexts) {
        closingTexts.forEach((el, index) => {
            const delay = parseFloat(el.dataset.delay) || (index * 0.25);

            gsap.fromTo(el,
                {
                    y: 20,
                    opacity: 0,
                    filter: 'blur(5px)'
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.8,
                    delay: delay,
                    ease: config.ease,
                    scrollTrigger: {
                        trigger: closingSection,
                        start: 'top 65%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // ========== BACKGROUND GRADIENT SHIFT ==========
    // Subtle color shift as user scrolls through the page
    gsap.to('body', {
        backgroundPosition: '0% 100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1
        }
    });

    // ========== SMOOTH SCROLL INDICATOR FADE ==========
    const scrollHint = document.querySelector('.scroll-hint');

    if (scrollHint) {
        gsap.to(scrollHint, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: '20% top',
                scrub: true
            }
        });
    }

    // ========== REFRESH SCROLL TRIGGER ON RESIZE ==========
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });

    // ========== CONSOLE EASTER EGG ==========
    console.log('%c💕 Happy Birthday, Yasaswini! 💕',
        'font-size: 20px; color: #C9657A; font-family: Georgia, serif; font-style: italic;'
    );
    console.log('%cThis playlist story was made with love.',
        'font-size: 12px; color: #E8B4BC;'
    );
});
