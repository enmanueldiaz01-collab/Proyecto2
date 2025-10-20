document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Function to set dark mode
    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun me-2"></i> <span class="d-none d-lg-block">Modo Claro</span>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeToggle.innerHTML = '<i class="fas fa-moon me-2"></i> <span class="d-none d-lg-block">Modo Oscuro</span>';
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Auto-detect prefers-color-scheme and apply saved preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else if (savedDarkMode === 'disabled') {
        setDarkMode(false);
    } else if (prefersDarkMode) {
        setDarkMode(true);
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!body.classList.contains('dark'));
    });

    // Smooth scroll for navbar links
    document.querySelectorAll('#mainNavbar .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close the navbar on mobile after clicking a link
                const navbarCollapse = document.getElementById('navbarNav');
                // Check if Bootstrap's Collapse is loaded and initialized
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    // If not initialized, create a new instance (may happen if called too early)
                    new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
                }
            }
        });
    });

    // Form submission simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent actual form submission
            alert('¡Tu consulta ha sido enviada! Un miembro de nuestro equipo se pondrá en contacto contigo pronto. 📧');
            this.reset(); // Clear the form fields
        });
    }

    // Update active state of navbar links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#mainNavbar .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight - 50) { // Added -50 for better trigger
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
