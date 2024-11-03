// Función para cargar las secciones
async function loadSection(sectionName) {
    try {
        console.log(`Intentando cargar sección: ${sectionName}`);
        // Ruta absoluta desde la raíz del proyecto
        const response = await fetch(`/sections/${sectionName}.html`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        console.log('Contenido cargado:', content.substring(0, 50) + '...'); // Muestra los primeros 50 caracteres
        document.querySelector('#content-sections').innerHTML = content;
    } catch (error) {
        console.error('Error detallado:', error);
        // Intenta con una ruta relativa si la absoluta falla
        try {
            const response = await fetch(`sections/${sectionName}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            document.querySelector('#content-sections').innerHTML = content;
        } catch (secondError) {
            console.error('Error con ruta relativa:', secondError);
        }
    }
}

// Cargar todas las secciones al inicio
async function loadAllSections() {
    console.log('Iniciando carga de todas las secciones');
    const sections = ['inicio', 'sobre-mi', 'habilidades', 'certificados', 'proyectos', 'contacto'];
    const contentContainer = document.querySelector('#content-sections');
    contentContainer.innerHTML = '';

    for (const section of sections) {
        try {
            console.log(`Intentando cargar sección: ${section}`);
            // Intenta primero con ruta relativa
            const response = await fetch(`sections/${section}.html`);
            console.log(`Estado de respuesta para ${section}:`, response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const content = await response.text();
            console.log(`Contenido cargado para ${section}:`, content.substring(0, 50) + '...');
            
            const sectionDiv = document.createElement('section');
            sectionDiv.className = 'section';
            sectionDiv.id = section;
            sectionDiv.innerHTML = content;
            contentContainer.appendChild(sectionDiv);
        } catch (error) {
            console.error(`Error cargando sección ${section}:`, error);
        }
    }
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        console.log('Navegando a:', targetId);
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.log('Elemento no encontrado:', targetId);
        }
    });
});

// Cargar todas las secciones cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, iniciando carga de secciones');
    loadAllSections();
});