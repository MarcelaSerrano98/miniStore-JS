// Conexiones api
import { fetchProducts } from './core/api.js';
import { state, setProducts } from './core/state.js';
import { showLoading, showError } from './ui/products.js';
import { renderPage, registerPagerEvents } from './ui/pager.js';
import { registerFilters, registerCategoryFilters } from './ui/filters.js';
import { registerEventsToast } from './ui/toast.js';
import { registerEventsDetails } from './ui/details.js';
import { registerSearchEvents } from './ui/search.js';

const $products = document.getElementById('products');
const $prev = document.querySelector('.pass .back');
const $next = document.querySelector('.pass .Next');
const $info = document.getElementById('pager-info');
const $sort = document.getElementById('sort');
const $filter = document.getElementById('filter');

async function init() {
  // Mensaje de carga
  showLoading($products);
  console.log('Iniciando la aplicación...');

  try {
    const data = await fetchProducts();
    // Guardar en el estado.
    setProducts(data);

    // Registra eventos de paginación
    registerCategoryFilters({ $filter, $products, $info, $prev,$next });
    registerFilters({ $sort, $products, $info, $prev,$next });
    registerPagerEvents($products, $info, $prev, $next);


    // Pintar la primera página
    renderPage($products, $info, $prev, $next);
  } catch (err) {
    console.error(err);
    showError($products);
  }
}

// document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
  init()
  registerEventsToast();
  registerEventsDetails();
  registerSearchEvents();

});
