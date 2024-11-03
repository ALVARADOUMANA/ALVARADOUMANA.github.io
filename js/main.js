// js/main.js

// Función para cargar las secciones
async function loadSection(sectionName) {
    try {
        const response = await fetch(`sections/${sectionName}.html`);
        const content = await response.text();
        document.querySelector('#content-sections').innerHTML = content;
    } catch (error) {
        console.error('Error loading section:', error);
    }
}

// Cargar todas las secciones al inicio
async function loadAllSections() {
    const sections = ['inicio', 'sobre-mi', 'habilidades', 'certificados', 'proyectos', 'contacto'];
    for (const section of sections) {
        const response = await fetch(`sections/${section}.html`);
        const content = await response.text();
        const container = document.createElement('div');
        container.innerHTML = content;
        document.querySelector('#content-sections').appendChild(container);
    }
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cargar todas las secciones cuando se carga la página
document.addEventListener('DOMContentLoaded', loadAllSections);

// Función para copiar al portapapeles
function copyToClipboard(text, iconElement) {
    navigator.clipboard.writeText(text).then(
        function () {
            // Cambiar icono a uno de éxito
            iconElement.classList.remove('bi-clipboard');
            iconElement.classList.add('bi-check-circle');

            // Volver al icono original después de 2 segundos
            setTimeout(() => {
                iconElement.classList.remove('bi-check-circle');
                iconElement.classList.add('bi-clipboard');
            }, 2000);
        },
        function (err) {
            // Puedes manejar el error aquí si es necesario
            console.error("Error al copiar: ", err);
        }
    );
}