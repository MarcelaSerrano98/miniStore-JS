// js/ui/categories.js
// PARA QUÉ: Dibuja las tarjetas de categorías en el HTML.

import { fetchCategories } from './js/core/api.js';

export function renderCategories($container, list) {
    if (!$container) return;

    // Mensaje si no hay categorías que mostrar
    if (!list || !list.length) {
        $container.innerHTML = `<p style="padding:1rem;">No se encontraron categorías.</p>`;
        return;
    }

    // Crea el HTML para cada categoría usando .map()
    const html = list.map(category => `

        <a href="/?category=${encodeURIComponent(category)}" class="category-card" aria-label="Ver productos de ${category}">

            <div class="category-card__icon"></div>
            <span class="category-card__name">${category}</span>
        </a>
    `).join(''); // .join('') une todos los elementos del array en un solo string

    // Inserta el HTML generado en el contenedor
    $container.innerHTML = html;
}

// 1. Selecciona el contenedor donde se mostrarán las categorías
const $categoriesGrid = document.getElementById('categories-grid');

// 2. Función principal asíncrona para iniciar la página
async function initCategoriesPage() {
    // Muestra un mensaje de carga mientras se obtienen los datos
    if ($categoriesGrid) $categoriesGrid.innerHTML = `<p>Cargando categorías...</p>`;

    try {
        // 3. Llama a la API para obtener la lista de categorías
        const categories = await fetchCategories();

        // 4. Llama a la función render para "dibujar" las categorías en el HTML
        renderCategories($categoriesGrid, categories);

    } catch (error) {
        // 5. En caso de error, muéstralo en la consola y en la página
        console.error(error);
        if ($categoriesGrid) $categoriesGrid.innerHTML = `<p style="color:red;">Error al cargar las categorías.</p>`;
    }
}

// 6. Ejecuta la función principal cuando el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', initCategoriesPage);