/**
 * =============================================================================
 * AYAN SHARMA — DARK CINEMATIC DEVELOPER PORTFOLIO
 * Vanilla JavaScript Engine
 * 
 * Features:
 * 1. Cinematic Entry Sequence for Hero Elements
 * 2. Sticky Glassmorphism Navbar with Scroll Detection & Active Section Highlighting
 * 3. Mobile Navigation Drawer Toggle
 * 4. IntersectionObserver Scroll Reveal for Elements
 * 5. Interactive Case Study Modal Engine (Data-driven for zero framework overhead)
 * 6. One-Click Copy-to-Clipboard for Email with Feedback
 * 7. Desktop Custom Interactive Cursor with Hover Physics
 * =============================================================================
 */

(function () {
  'use strict';

  // ===========================================================================
  // 1. DATA SOURCE FOR CASE STUDY MODAL
  // Strictly mirrors the PRD requirements and authentic resume details.
  // ===========================================================================
  const CASE_STUDIES = {
    manthan: {
      category: "01 / FULL-STACK FEST PLATFORM",
      title: "MANTHAN 2026",
      subtitle: "Intercollegiate Fest Platform for Poddar Group of Institutions",
      overview: "Manthan 2026 is an end-to-end full-stack digital fest management solution designed to handle attendee traffic across multiple collegiate departments and institutions.",
      whatIBuilt: "Architected the backend and frontend registration workflow, pass generation logic, and the administrative console.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "QR Code Generation & Cryptographic Verification"],
      keyFeatures: [
        "Dynamic multi-event registration system with input validation",
        "Unique QR-coded digital entry passes generated instantly upon confirmation",
        "Administrative dashboard providing real-time attendee check-in counts and event roster controls",
        "Role-based authentication protecting attendee records"
      ],
      challenges: "Ensuring instant, low-latency generation of scannable QR passes while managing concurrent registrations during peak enrollment spikes.",
      status: "Production deployment for Poddar Group of Institutions."
    },
    tricon: {
      category: "02 / GLOBAL HACKATHON COLLABORATION",
      title: "TRICON",
      subtitle: "2nd NextGen Hackathon — ACM Fremont Chapter, USA (with SCRS)",
      overview: "Participated in an intensive global hackathon hosted by the ACM Fremont Chapter in association with SCRS. Our team engineered and pitched a real-world concept against international student developers.",
      whatIBuilt: "Collaborated closely within a 4-person multidisciplinary engineering unit: Team GPAK (Pragya Sharma, Khyati Pathak, Garvit Manwani, and Ayan Sharma). Formulated architecture diagrams, technical feasibility specs, and the core presentation deck.",
      technologies: ["ACM Fremont Chapter Framework", "SCRS Integration", "Team GPAK Collaboration", "System Architecture", "Technical Pitching"],
      keyFeatures: [
        "Rapid 48-hour ideation-to-pitch turnaround",
        "Comprehensive problem statement analysis and targeted market solutioning",
        "Collaborative division of technical research and deck execution"
      ],
      challenges: "Navigating cross-time-zone synchronization and refining complex technical features into an authoritative, high-impact investor/jury pitch under strict time constraints.",
      status: "Presented and pitched successfully as Team GPAK."
    },
    autoclicker: {
      category: "03 / PERSONAL UTILITY TOOL",
      title: "DESKTOP AUTO CLICKER",
      subtitle: "Python Input Automation with Native Windows Sound Workaround",
      overview: "A lightweight, reliable desktop utility built to automate precise mouse input routines for testing and workflow automation without burdensome dependencies.",
      whatIBuilt: "Built the graphical interface with CustomTkinter and engineered click injection routines via PyAutoGUI.",
      technologies: ["Python", "CustomTkinter", "PyAutoGUI", "winsound", "Windows API"],
      keyFeatures: [
        "Clean modern dark GUI crafted with CustomTkinter",
        "Millisecond-level click interval tuning and coordinate lock-in",
        "Global keyboard hotkeys for immediate start/stop safety toggles"
      ],
      challenges: "Technical Challenge: Python 3.14 on newer Windows updates caused compatibility issues and unexpected crashes when relying on standard audio/pygame backends. Successfully resolved this by replacing the dependency with native Windows winsound for instant acoustic click alerts.",
      status: "Open-source personal desktop utility."
    },
    clonelab: {
      category: "04 / INTERFACE LAB",
      title: "CLONE LAB",
      subtitle: "Dissecting & Recreating Real-World Production UIs",
      overview: "To attain instinctive mastery of CSS layout algorithms, responsive viewports, and clean semantic markup, I conducted dedicated structural dissections of major commercial consumer platforms.",
      whatIBuilt: "Rebuilt core interfaces from scratch: an iterative Swiggy food delivery experience, a Netflix streaming homepage, and a Dineout restaurant discovery card interface.",
      technologies: ["Semantic HTML5", "CSS3 Flexbox & Grid", "Horizontal Overflow Scrolling", "Image Handling & Lazy Loading", "Typography Matching"],
      keyFeatures: [
        "Swiggy Clone: Multi-iteration refactoring, progressively mastering complex responsive grids and layout flows",
        "Netflix Clone: Recreation of the iconic landing experience accompanied by a comprehensive Hinglish walkthrough tutorial",
        "Dineout UI: Intricate card hierarchy, tag badges, and rating components"
      ],
      challenges: "Achieving pixel-faithful typography spacing, handling dynamic horizontal overflow cards without ugly scrollbars, and ensuring mobile touch friendliness.",
      status: "Completed interface practice lab."
    }
  };

  // ===========================================================================
  // 2. DOM INITIALIZATION & REFERENCES
  // ===========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeroSequence();
    initHeroScrollTransition();
    initNavbarScroll();
    initMobileNav();
    initScrollObserver();
    initCaseStudyModal();
    initCopyEmail();
    initCustomCursor();
    initFloatingAvatarWidget();
    initInteractiveTerminal();
  });

  // ===========================================================================
  // 3. CINEMATIC HERO ENTRANCE SEQUENCE
  // Staggers in text elements, silhouette, and the background typography.
  // ===========================================================================
  function initHeroSequence() {
    const heroElements = document.querySelectorAll('#hero .reveal-item');
    const heroBgText = document.querySelector('.hero-bg-text-wrapper');

    // Subtle fade and elevation
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('revealed');
      }, 150 + index * 120);
    });

    // Slow cinematic reveal for massive background "AYAN"
    if (heroBgText) {
      setTimeout(() => {
        heroBgText.style.transition = 'opacity 1.6s ease, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)';
        heroBgText.style.opacity = '0.35';
      }, 700);
    }
  }

  // ===========================================================================
  // 3b. HERO MINIMIZING & ABOUT MAXIMIZING SCROLL TRANSITION
  // Smooth scroll interpolation: scales down & minimizes Hero while scaling up
  // & maximizing the About section to full-screen. Standard scrolling resumes after.
  // ===========================================================================
  function initHeroScrollTransition() {
    const stage = document.getElementById('heroTransitionStage');
    const hero = document.getElementById('hero');
    const about = document.getElementById('about');

    if (!stage || !hero || !about) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTransition();
          ticking = false;
        });
        ticking = true;
      }
    }

    function updateTransition() {
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Balanced transition distance: smooth and responsive (~480px, roughly 1.5 to 2 gentle scroll notches)
      const transitionDistance = 480;
      
      // Calculate linear progress clamped from 0 to 1
      const rawProgress = Math.min(Math.max(scrollY / transitionDistance, 0), 1);

      if (rawProgress <= 0) {
        // At top: Hero is 100% normal, About is resting in initial state
        hero.style.transform = 'none';
        hero.style.opacity = '1';
        hero.style.filter = 'none';
        hero.style.borderRadius = '0px';
        hero.style.boxShadow = 'none';

        about.style.transform = 'scale(0.86) translateY(40px)';
        about.style.opacity = '0.1';
        about.style.borderRadius = '28px';
      } else if (rawProgress < 1) {
        // Active transition zone with smooth easing curve
        const progress = rawProgress;

        // HERO: Scales down gradually from 1 to 0.80, blurs, rounds corners like an app window
        const heroScale = 1 - (progress * 0.20);
        const heroOpacity = Math.max(1 - (progress * 1.05), 0);
        const heroBlur = progress * 12;
        const heroRadius = progress * 32;

        hero.style.transform = `scale(${heroScale.toFixed(4)}) translateY(-${(progress * 50).toFixed(1)}px)`;
        hero.style.opacity = heroOpacity.toFixed(3);
        hero.style.filter = `blur(${heroBlur.toFixed(1)}px)`;
        hero.style.borderRadius = `${heroRadius.toFixed(1)}px`;
        hero.style.boxShadow = `0 30px 80px rgba(0, 0, 0, ${(progress * 0.9).toFixed(2)})`;

        // ABOUT: Scales up progressively from 0.86 to 1.0, opacity rises from 0.1 to 1.0, corners unround
        const aboutScale = 0.86 + (progress * 0.14);
        const aboutOpacity = Math.min(0.1 + (progress * 0.9), 1);
        const aboutTranslateY = (1 - progress) * 40;
        const aboutRadius = (1 - progress) * 28;

        about.style.transform = `scale(${aboutScale.toFixed(4)}) translateY(${aboutTranslateY.toFixed(1)}px)`;
        about.style.opacity = aboutOpacity.toFixed(3);
        about.style.borderRadius = `${aboutRadius.toFixed(1)}px`;
      } else {
        // Past transition: Hero minimized and tucked away, About fully maximized and normal
        hero.style.transform = 'scale(0.80) translateY(-50px)';
        hero.style.opacity = '0';
        hero.style.filter = 'blur(12px)';
        hero.style.borderRadius = '32px';

        about.style.transform = 'none';
        about.style.opacity = '1';
        about.style.borderRadius = '0px';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTransition, { passive: true });

    // Initial calculation on page load
    updateTransition();
  }

  // ===========================================================================
  // 4. NAVBAR SCROLL LISTENER & SECTION HIGHLIGHTING
  // ===========================================================================
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.cta-link)');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Adjust glassmorphic opacity
      if (scrollPos > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Highlight active navigation link
      let currentSection = '';
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // ===========================================================================
  // 5. MOBILE NAVIGATION DRAWER
  // ===========================================================================
  function initMobileNav() {
    const toggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const links = navMenu.querySelectorAll('.nav-link');

    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    links.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===========================================================================
  // 6. INTERSECTION OBSERVER FOR SCROLL REVEALS
  // Lightweight native observer for buttery smooth reveal effects
  // ===========================================================================
  function initScrollObserver() {
    const targets = document.querySelectorAll(
      '.section-header, .about-story, .profile-card, .capability-card, .project-card, .skill-category-card, .timeline-node, .public-card, .contact-box'
    );

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(target => {
      target.classList.add('reveal-item');
      observer.observe(target);
    });
  }

  // ===========================================================================
  // 7. INTERACTIVE CASE STUDY MODAL
  // ===========================================================================
  function initCaseStudyModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('modalCloseBtn');
    const triggerButtons = document.querySelectorAll('[data-modal]');

    if (!modal || !modalBody) return;

    function openModal(projectId) {
      const data = CASE_STUDIES[projectId];
      if (!data) return;

      const techItems = data.technologies.map(t => `<span class="tech-pill">${t}</span>`).join('');
      const featureItems = data.keyFeatures.map(f => `<li>${f}</li>`).join('');

      modalBody.innerHTML = `
        <div class="modal-header-section">
          <span class="modal-category">${data.category}</span>
          <h3 class="modal-title" id="modalTitle">${data.title}</h3>
          <p class="modal-subtitle">${data.subtitle}</p>
        </div>

        <div class="modal-block">
          <h4>Overview</h4>
          <p>${data.overview}</p>
        </div>

        <div class="modal-block">
          <h4>What I Built &amp; Role</h4>
          <p>${data.whatIBuilt}</p>
        </div>

        <div class="modal-block">
          <h4>Technologies &amp; Tools</h4>
          <div class="project-tech-stack">${techItems}</div>
        </div>

        <div class="modal-block">
          <h4>Key Technical Highlights</h4>
          <ul class="modal-list">${featureItems}</ul>
        </div>

        <div class="modal-block">
          <h4>Technical Challenge &amp; Resolution</h4>
          <p>${data.challenges}</p>
        </div>

        <div class="modal-block">
          <h4>Current Status</h4>
          <p><em>${data.status}</em></p>
        </div>

        <div class="modal-block" style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
          <h4>Explore Further</h4>
          <div class="project-action-row" style="margin-top: 0.75rem;">
            <a href="https://www.linkedin.com/in/ayan-sharma-420218369/" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <span>DISCUSS ON LINKEDIN</span>
            </a>
            <a href="https://github.com/Ayansh15" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>VIEW GITHUB REPO</span>
            </a>
          </div>
        </div>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-modal');
        openModal(projectId);
      });
    });

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Keyboard ESC listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // ===========================================================================
  // 8. ONE-CLICK EMAIL COPY WITH FEEDBACK
  // ===========================================================================
  function initCopyEmail() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyText = document.getElementById('copyBtnText');

    if (!copyBtn || !copyText) return;

    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email') || 'ayan09072007@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const original = copyText.textContent;
        copyText.textContent = 'COPIED!';
        copyBtn.style.background = '#ffffff';
        copyBtn.style.color = '#000000';

        setTimeout(() => {
          copyText.textContent = original;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        // Fallback if clipboard API restricted
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // ===========================================================================
  // 9. DESKTOP CUSTOM CURSOR
  // Subtle magnetic feel with hover states for links and project cards
  // ===========================================================================
  function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor) return;

    // Check if device supports fine hover pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none';
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    // Interactive Hover Listeners
    const interactiveElements = document.querySelectorAll('a, button, .skill-chip, .profile-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-project-hover');
      });
      card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-project-hover');
      });
    });
  }

  // ===========================================================================
  // 10. FLOATING STICKY AVATAR CONNECT WIDGET (DRAGGABLE & MOVABLE ANYWHERE)
  // - Shows welcoming speech bubble for the first 5 seconds on load
  // - Can be freely dragged/moved anywhere across the screen
  // - Keeps within screen bounds
  // - Expands full connect popup options on hover or tap/click
  // ===========================================================================
  function initFloatingAvatarWidget() {
    const widget = document.getElementById('floatingConnectWidget');
    const bubble = document.getElementById('avatarSpeechBubble');
    const dismissBtn = document.getElementById('bubbleDismissBtn');
    const triggerBtn = document.getElementById('avatarTriggerBtn');
    const navContactBtn = document.getElementById('navContactBtn');

    if (!widget || !bubble || !triggerBtn) return;

    // Display speech bubble after a brief 600ms load delay
    let bubbleTimer = null;
    setTimeout(() => {
      bubble.classList.add('visible');

      // Auto-hide the speech bubble after exactly 5 seconds
      bubbleTimer = setTimeout(() => {
        bubble.classList.remove('visible');
      }, 5000);
    }, 600);

    // Allow manual dismiss of speech bubble
    if (dismissBtn) {
      dismissBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bubbleTimer) clearTimeout(bubbleTimer);
        bubble.classList.remove('visible');
      });
    }

    // -------------------------------------------------------------------------
    // DRAG AND DROP ENGINE (Mouse & Touch)
    // -------------------------------------------------------------------------
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    let hasMoved = false;

    function getCoords(e) {
      if (e.touches && e.touches.length > 0) {
        return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      }
      return { clientX: e.clientX, clientY: e.clientY };
    }

    function onPointerDown(e) {
      // Don't drag if clicking dismiss or menu links
      if (e.target.closest('.avatar-speech-bubble') || e.target.closest('.avatar-connect-menu')) {
        return;
      }

      isDragging = true;
      hasMoved = false;
      const coords = getCoords(e);
      startX = coords.clientX;
      startY = coords.clientY;

      const rect = widget.getBoundingClientRect();
      initialLeft = rect.left;
      initialTop = rect.top;

      widget.classList.add('is-dragging');

      document.addEventListener('mousemove', onPointerMove, { passive: false });
      document.addEventListener('mouseup', onPointerUp);
      document.addEventListener('touchmove', onPointerMove, { passive: false });
      document.addEventListener('touchend', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const coords = getCoords(e);
      const deltaX = coords.clientX - startX;
      const deltaY = coords.clientY - startY;

      // Small threshold to distinguish a click from a drag
      if (Math.hypot(deltaX, deltaY) > 5) {
        hasMoved = true;
        if (e.cancelable) e.preventDefault(); // Prevent accidental mobile scroll while dragging
      }

      if (hasMoved) {
        let newLeft = initialLeft + deltaX;
        let newTop = initialTop + deltaY;

        // Screen boundary safety
        const widgetWidth = widget.offsetWidth;
        const widgetHeight = widget.offsetHeight;
        const maxLeft = window.innerWidth - widgetWidth - 10;
        const maxTop = window.innerHeight - widgetHeight - 10;

        newLeft = Math.max(10, Math.min(newLeft, maxLeft));
        newTop = Math.max(10, Math.min(newTop, maxTop));

        // Switch positioning from bottom/right to top/left coordinates
        widget.style.bottom = 'auto';
        widget.style.right = 'auto';
        widget.style.left = `${newLeft}px`;
        widget.style.top = `${newTop}px`;
      }
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      widget.classList.remove('is-dragging');

      document.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseup', onPointerUp);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', onPointerUp);
    }

    triggerBtn.addEventListener('mousedown', onPointerDown);
    triggerBtn.addEventListener('touchstart', onPointerDown, { passive: false });

    // Toggle menu on avatar DOUBLE CLICK only
    triggerBtn.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (hasMoved) return;
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubble.classList.remove('visible');
      widget.classList.toggle('menu-open');
    });

    // Touch double-tap detection for mobile devices
    let lastTapTime = 0;
    triggerBtn.addEventListener('touchend', (e) => {
      if (hasMoved) return;
      const currentTime = new Date().getTime();
      const tapInterval = currentTime - lastTapTime;
      if (tapInterval < 320 && tapInterval > 0) {
        e.preventDefault();
        e.stopPropagation();
        if (bubbleTimer) clearTimeout(bubbleTimer);
        bubble.classList.remove('visible');
        widget.classList.toggle('menu-open');
        lastTapTime = 0;
      } else {
        lastTapTime = currentTime;
      }
    });

    // Connect navbar "LET'S CONNECT" button: supports click/tap toggle on mobile
    if (navContactBtn) {
      const navItem = navContactBtn.closest('.nav-connect-item');
      navContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (navItem) {
          navItem.classList.toggle('menu-open');
        }
      });

      // Close nav dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (navItem && !navItem.contains(e.target)) {
          navItem.classList.remove('menu-open');
        }
      });
    }

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!widget.contains(e.target)) {
        widget.classList.remove('menu-open');
      }
    });

    // Close menu on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        widget.classList.remove('menu-open');
        bubble.classList.remove('visible');
      }
    });
  }

  // ===========================================================================
  // 11. INTERACTIVE DEVELOPER TERMINAL
  // ===========================================================================
  function initInteractiveTerminal() {
    const dynamicCmd = document.getElementById('terminalDynamicCmd');
    const chips = document.querySelectorAll('.term-action-chip');
    if (!dynamicCmd || chips.length === 0) return;

    const COMMANDS = {
      'cat stats': [
        'fetching system benchmarks...',
        'RAM Usage: 42% | Active Threads: 8',
        'Projects Shipped: Manthan 2026, TriCon ACM, AutoClicker',
        'Academic Track: B.Tech CSE (Sem 2)'
      ],
      'cat stack': [
        'Frontend: HTML5, CSS3, Vanilla JS, React.js',
        'Backend: Node.js, Express, MongoDB, REST APIs',
        'Languages: C++, Python, JavaScript',
        'Workflows: Git/GitHub, GenAI & Prompt Engineering'
      ],
      'cat mission': [
        'Philosophy: "I learn by building."',
        'Goal: Turn abstract algorithms into living software.',
        'Content: Hinglish tech breakdowns for YouTube & Instagram.'
      ]
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (!cmd) return;

        // Animate command text
        dynamicCmd.textContent = cmd;
        dynamicCmd.style.color = '#38bdf8';

        // Find or create dynamic output line
        let outputLine = document.getElementById('terminalDynamicOutput');
        if (!outputLine) {
          outputLine = document.createElement('div');
          outputLine.id = 'terminalDynamicOutput';
          outputLine.className = 'term-line output';
          outputLine.style.color = '#e2e8f0';
          outputLine.style.fontSize = '0.8rem';
          outputLine.style.lineHeight = '1.6';
          outputLine.style.paddingLeft = '0.5rem';
          outputLine.style.borderLeft = '2px solid #22c55e';
          outputLine.style.marginTop = '0.4rem';
          dynamicCmd.closest('.terminal-body').appendChild(outputLine);
        }

        const lines = COMMANDS[cmd] || ['command executed successfully.'];
        outputLine.innerHTML = lines.map(line => `<div>▸ ${line}</div>`).join('');
      });
    });
  }

})();

