document.addEventListener('DOMContentLoaded', () => {
    const userMenu = document.querySelector('.user-menu');
    const dropdownUser = userMenu.querySelector('.dropdown-user');
    const bellMenu = document.querySelector('.bell-menu');
    const dropdownBell = bellMenu.querySelector('.dropdown-bell');
    const menuToggle = document.querySelector('.menu-toggle');
    const scrollToggle = document.querySelector('.header');
    const sidebar = document.querySelector('.sidebar');
    const btnToggleSidebar = document.getElementById("toggleSidebar")
    const overlay = document.querySelector('.overlay');
    const btnClose = document.querySelector('.btn-close');
    const subMenu = document.querySelector('.submenu-toggle');


    new DataTable('#table', {
        language: {
            url: '/administrative_panel/vendor/datatables/lang/es-ES.json'
        },
        responsive: true,
        pageLength: 5,
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
        ordering: true,
        order: [[0, 'asc']],
        autoWidth: false,
        columnDefs: [
            { targets: -1, orderable: false },
            { targets: 0, width: '1%', className: 'text-center' },
        ]
    });

    // Toggler para el menú
    const toggleMenu = () => {
        sidebar.classList.toggle('show');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Desactiva el scroll del body
        scrollToggle.classList.toggle('no-scroll');
    };

    // Toggler para el sidebar
    const toggleSidebar = () => {
        document.body.classList.toggle("body-small-sidebar");
    };

    userMenu.addEventListener('click', () => {
        dropdownUser.classList.toggle('active');
    });

    bellMenu.addEventListener('click', () => {
        dropdownBell.classList.toggle('active');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            overlay.classList.remove('active');
            sidebar.classList.remove('show');

            // Restaurar el scroll solo si el modal no está abierto
            if (!document.getElementById('myModal').classList.contains('active')) {
                document.body.classList.remove('no-scroll');
                scrollToggle.classList.remove('no-scroll');
            }
        }
        if (window.innerWidth < 792) {
            document.body.classList.remove("body-small-sidebar");
            btnToggleSidebar.classList.remove("active");
        }
    });

    subMenu.addEventListener('click', function () {
        this.classList.toggle('active');
    });

    btnToggleSidebar.addEventListener('click', toggleSidebar);
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    btnClose.addEventListener('click', toggleMenu);

    // Cierra el menú si se hace clic fuera de él
    document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
            dropdownUser.classList.remove('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (!bellMenu.contains(e.target)) {
            dropdownBell.classList.remove('active');
        }
    });

});

document.querySelectorAll('.active-submenu').forEach(menu => {
    menu.addEventListener('click', function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        // Seleccionar el icono SVG del menú actual
        const svgIcon = this.querySelector('.svg-submenu');
        svgIcon.classList.toggle('active'); // Alternar la clase active en el icono

        // Mostrar/ocultar el submenú mediante clases
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            submenu.classList.toggle('active'); // Alternar la clase active en el submenú
        }
    });
});

//Modal
// Mostrar y ocultar el modal
document.querySelectorAll('.modal-close').forEach(button => {
    button.addEventListener('click', () => {
        // Cerrar el modal y restaurar el scroll
        document.getElementById('myModal').classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.header').classList.remove('no-scroll');
    });
});

// Abrir el modal
document.getElementById('openModalButton')?.addEventListener('click', () => {
    // Abrir el modal y desactivar el scroll
    document.getElementById('myModal').classList.add('active');
    document.body.classList.add('no-scroll');  // Desactivar scroll en body
    document.querySelector('.header').classList.add('no-scroll');  // Desactivar scroll en header
});

// Cerrar el modal al hacer clic fuera
document.getElementById('myModal').addEventListener('click', (e) => {
    const modalContent = document.querySelector('.modal-content');
    if (!modalContent.contains(e.target)) {
        // Cerrar el modal y restaurar el scroll
        document.getElementById('myModal').classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.header').classList.remove('no-scroll');
    }
});

// Cerrar el modal al presionar Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        // Cerrar el modal y restaurar el scroll
        document.getElementById('myModal').classList.remove('active');
        document.body.classList.remove('no-scroll');
        document.querySelector('.header').classList.remove('no-scroll');
    }
});
