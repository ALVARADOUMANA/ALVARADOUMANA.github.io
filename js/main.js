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
    const sections = ['inicio', 'sobre-mi', 'habilidades', 'certificados', 'proyectos', 'contacto', 'mejorando'];
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

// Función para iniciar la animación del contador de edad
function animateAge() {
    // Encontrar todos los elementos con la clase edad-contador
    const counters = document.getElementsByClassName('edad-contador');
    
    if (!counters.length) {
        setTimeout(animateAge, 100);
        return;
    }

    Array.from(counters).forEach(counter => {
        let currentCount = 0;
        const targetAge = 21; // Tu edad actual

        // Resetear el contador
        counter.textContent = '0';

        const interval = setInterval(() => {
            if (currentCount >= targetAge) {
                clearInterval(interval);
                counter.classList.add('highlight');
                
                setTimeout(() => {
                    counter.classList.remove('highlight');
                    setTimeout(() => {
                        currentCount = 0;
                        animateAge();
                    }, 1000);
                }, 1000);
                return;
            }
            currentCount++;
            counter.textContent = currentCount;
        }, 50);
    });
}

// Iniciar animación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', animateAge);

// Si estás usando algún evento personalizado para la carga de secciones
document.addEventListener('sectionLoaded', animateAge);


// Inicializar el carousel cuando se muestre el modal
document.addEventListener('DOMContentLoaded', function() {
    const flotillaModal = document.getElementById('flotillaModal');
    if (flotillaModal) {
        flotillaModal.addEventListener('shown.bs.modal', function () {
            const carousel = new bootstrap.Carousel(document.getElementById('flotillaCarousel'), {
                interval: 5000, // Cambia la imagen cada 5 segundos
                wrap: true     // Permite que el carousel sea cíclico
            });
        });
    }
});

console.warn(`
    ###  #     ##   #    #  #####  #####   ## 
    #    #    #  #  #    #    #      #    #  #
    #    #    ####  #   #     #      #    #  #
    #    #    #  #   # #      #      #    #  #
    ###  ###  #  #    #     #####    #     ## `);