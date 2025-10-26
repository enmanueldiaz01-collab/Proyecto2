document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('i'); // Selecciona el icono
    const darkModeText = document.getElementById('darkModeText'); // Selecciona el span del texto
    const body = document.body;

    // Función para establecer el modo oscuro
    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
            if (darkModeText) darkModeText.textContent = 'Modo Claro'; // Actualiza el texto
            localStorage.setItem('darkMode', 'enabled');
        } else {
            body.classList.remove('dark');
            darkModeIcon.classList.remove('fa-sun');
            darkModeIcon.classList.add('fa-moon');
            if (darkModeText) darkModeText.textContent = 'Modo Oscuro'; // Actualiza el texto
            localStorage.setItem('darkMode', 'disabled');
        }
    };

    // Auto-detecta prefers-color-scheme y aplica la preferencia guardada
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'enabled') {
        setDarkMode(true);
    } else if (savedDarkMode === 'disabled') {
        setDarkMode(false);
    } else if (prefersDarkMode) {
        setDarkMode(true); // Si el sistema prefiere oscuro y no hay preferencia guardada, activa oscuro
    } else {
        setDarkMode(false); // Si no hay preferencia guardada ni sistema prefiere oscuro, va a claro
    }


    // Toggle dark mode al hacer clic en el botón
    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!body.classList.contains('dark'));
    });

    // Smooth scroll para enlaces de la barra de navegación
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

                // Cierra la barra de navegación en móvil después de hacer clic en un enlace
                const navbarCollapse = document.getElementById('navbarNav');
                // Verifica si Bootstrap's Collapse está cargado e inicializado
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                } else if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    // Si no está inicializado, crea una nueva instancia (puede ocurrir si se llama muy temprano)
                    new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
                }
            }
        });
    });

    // Simulación de envío de formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Previene el envío real del formulario
            alert('¡Tu consulta ha sido enviada! Un miembro de nuestro equipo se pondrá en contacto contigo pronto. 📧');
            this.reset(); // Limpia los campos del formulario
        });
    }

    // Actualiza el estado activo de los enlaces de la barra de navegación al hacer scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#mainNavbar .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight - 50) { // Añadido -50 para un mejor trigger
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
