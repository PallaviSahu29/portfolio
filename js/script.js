document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Counts
    const certTrack = document.getElementById('certsTrack');
    const totalSkills = document.querySelectorAll('.skills-track .skill-item').length;
    const totalProjects = document.querySelectorAll('.projects-grid .project-card-button').length;
    const totalCerts = certTrack ? certTrack.querySelectorAll('.cert-card-button').length : 0;

    const skillsElem = document.getElementById('count-skills');
    const projectsElem = document.getElementById('count-projects');
    const certsElem = document.getElementById('count-certs');

    if (skillsElem) skillsElem.textContent = totalSkills;
    if (projectsElem) projectsElem.textContent = totalProjects;
    if (certsElem) certsElem.textContent = totalCerts;

    // 2. Lab Skills Carousel Navigation
    const skillsTrack = document.getElementById('skillsTrack');
    const skillsPrevBtn = document.getElementById('skillsPrevBtn');
    const skillsNextBtn = document.getElementById('skillsNextBtn');

    if (skillsPrevBtn && skillsNextBtn && skillsTrack) {
        skillsPrevBtn.addEventListener('click', () => {
            skillsTrack.scrollBy({ left: -280, behavior: 'smooth' });
        });

        skillsNextBtn.addEventListener('click', () => {
            skillsTrack.scrollBy({ left: 280, behavior: 'smooth' });
        });
    }

    // 3. Certificates Carousel Navigation
    const certsPrevBtn = document.getElementById('certsPrevBtn');
    const certsNextBtn = document.getElementById('certsNextBtn');

    if (certsPrevBtn && certsNextBtn && certTrack) {
        certsPrevBtn.addEventListener('click', () => {
            certTrack.scrollBy({ left: -324, behavior: 'smooth' });
        });

        certsNextBtn.addEventListener('click', () => {
            certTrack.scrollBy({ left: 324, behavior: 'smooth' });
        });
    }

    // 4. Smooth Navigation & Active Link Highlight
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    let isClickScrolling = false;
    let scrollTimeout = null;

    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        if (isClickScrolling) return;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.getAttribute('id'));
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', () => {
        if (isClickScrolling) return;

        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
        if (isAtBottom) {
            const lastSectionId = sections[sections.length - 1]?.getAttribute('id');
            if (lastSectionId) {
                setActiveLink(lastSectionId);
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            isClickScrolling = true;

            const targetId = link.getAttribute('href').replace('#', '');
            setActiveLink(targetId);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isClickScrolling = false;
            }, 800);
        });
    });
});

// Certificate Lightbox Modal Controls
document.addEventListener('DOMContentLoaded', () => {
    const certCards = document.querySelectorAll('.cert-card-button');
    const certModal = document.getElementById('certModal');
    const certModalBackdrop = document.getElementById('certModalBackdrop');
    const certModalClose = document.getElementById('certModalClose');

    const modalImg = document.getElementById('modalCertImg');
    const modalTitle = document.getElementById('modalCertTitle');
    const modalOrg = document.getElementById('modalCertOrg');
    const modalSkills = document.getElementById('modalCertSkills');

    const openModal = (card) => {
        modalImg.src = card.dataset.img || '';
        modalTitle.textContent = card.dataset.title || '';
        modalOrg.textContent = card.dataset.org || '';
        modalSkills.textContent = card.dataset.skills || 'N/A';

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (certModal.classList.contains('active')) {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    certCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    if (certModalClose) certModalClose.addEventListener('click', closeModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

// Dark Mode Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // 1. Immediately apply blur while current theme is visible
            document.body.classList.add('theme-transitioning');

            // 2. Wait 100ms (until screen is blurred), THEN swap colors hidden under blur
            setTimeout(() => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }, 150);

            // 3. Unblur quickly (200ms total duration)
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        });
    }
});

// Hamburger Mobile Drawer Logic
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburgerMenu');
    const navLinks = document.getElementById('navLinks');
    const menuLinks = document.querySelectorAll('.nav-menu .nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking any nav link on mobile
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
});

// Project Lightbox Modal Controls
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card-button');
    const projectModal = document.getElementById('projectModal');
    const projectModalBackdrop = document.getElementById('projectModalBackdrop');
    const projectModalClose = document.getElementById('projectModalClose');

    const modalImg = document.getElementById('modalProjectImg');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalOrg = document.getElementById('modalProjectOrg');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalSkills = document.getElementById('modalProjectSkills');

    const openModal = (card) => {
        modalImg.src = card.dataset.img || '';
        modalTitle.textContent = card.dataset.title || '';
        modalOrg.textContent = card.dataset.org || '';
        modalDesc.textContent = card.dataset.desc || '';
        // modalSkills.textContent = card.dataset.skills || 'N/A';

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    if (projectModalClose) projectModalClose.addEventListener('click', closeModal);
    if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-about-btn');
    const moreAbout = document.getElementById('more-about');

    if (toggleBtn && moreAbout) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = moreAbout.classList.toggle('expanded');
            toggleBtn.classList.toggle('expanded', isExpanded);

            const btnText = toggleBtn.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = isExpanded ? 'Less About Me' : 'More About Me';
            }
        });
    }
});