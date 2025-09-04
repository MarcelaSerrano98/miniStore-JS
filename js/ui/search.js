import { state } from '../core/state.js';
import { renderPage } from './pager.js';

/**
 * Filtra los productos basándose en el término de búsqueda.
 */
function applySearch(elements) {
    // Obtener el texto del input
    const searchTerm = elements.$searchInput.value.toLowerCase().trim();

    // Si la barra está vacía, mostramos todos los productos.
    if (!searchTerm) {
        state.view = state.products.slice();
    } else {
        // Filtrar el array principal de productos.
        state.view = state.products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
    }

    // Reinicia la paginación
    state.page = 1;

    // Vuelve a renderizar la página
    renderPage(elements.$productsContainer, elements.$pagerInfo, elements.$prevButton, elements.$nextButton);
}

/**
 * Registra el evento input en la barra de búsqueda.
 */
export function registerSearchEvents() {
    // Garantiza que se ejecuten despues de que el DOM esté listo.
    const $searchInput = document.getElementById('search');
    const $productsContainer = document.getElementById('products');
    const $pagerInfo = document.getElementById('pager-info');
    const $prevButton = document.querySelector('.back');
    const $nextButton = document.querySelector('.Next');

    // Crea un objeto para pasar las referencias fácilmente.
    const elements = { $searchInput, $productsContainer, $pagerInfo, $prevButton, $nextButton };

    // Si la barra de búsqueda no existe, no hacemos nada.
    if (!$searchInput) return; 

    // El evento 'input' ahora llama a applySearch pasandole los elementos
    $searchInput.addEventListener('input', () => applySearch(elements));
}