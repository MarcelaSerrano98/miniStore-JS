import { state } from '../core/state.js';
import { renderPage } from './pager.js';

// No definimos las variables aquí arriba para evitar errores de tiempo de carga.

/**
 * Filtra los productos basándose en el término de búsqueda.
 */
function applySearch(elements) {
    // 1. Obtenemos el texto del input
    const searchTerm = elements.$searchInput.value.toLowerCase().trim();

    // 2. Si la barra está vacía, mostramos todos los productos
    if (!searchTerm) {
        state.view = state.products.slice();
    } else {
        // 3. Filtramos el array principal de productos
        state.view = state.products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    }

    // 4. Reiniciamos la paginación
    state.page = 1;

    // 5. Volvemos a renderizar la página
    renderPage(elements.$productsContainer, elements.$pagerInfo, elements.$prevButton, elements.$nextButton);
}

/**
 * Registra el evento 'input' en la barra de búsqueda.
 */
export function registerSearchEvents() {
    // --- LOS SELECTORES SE MUEVEN AQUÍ DENTRO ---
    // Esto garantiza que se ejecutan DESPUÉS de que el DOM esté listo.
    const $searchInput = document.getElementById('search');
    const $productsContainer = document.getElementById('products');
    const $pagerInfo = document.getElementById('pager-info');
    const $prevButton = document.querySelector('.back');
    const $nextButton = document.querySelector('.Next');

    // Creamos un objeto para pasar las referencias fácilmente
    const elements = { $searchInput, $productsContainer, $pagerInfo, $prevButton, $nextButton };

    // Si la barra de búsqueda no existe, no hacemos nada
    if (!$searchInput) return; 

    // El evento 'input' ahora llama a applySearch pasándole los elementos
    $searchInput.addEventListener('input', () => applySearch(elements));
}