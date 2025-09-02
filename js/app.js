// js/app.js
// PARA QUÉ: conectar todo. Aquí “empieza” tu app.

import { fetchProducts } from './core/api.js';
import { state, setProducts } from './core/state.js';
import { showLoading, showError } from './ui/products.js';
import { renderPage, registerPagerEvents } from './ui/pager.js';
import { registerEvents } from './ui/events.js';
import { registerFilters, registerCategoryFilters } from './ui/filters.js';

const $products = document.getElementById('products');
const $prev = document.querySelector('.pass .back');
const $next = document.querySelector('.pass .Next');
const $info = document.getElementById('pager-info');
const $sort = document.getElementById('sort');
const $filter = document.getElementById('filter');

async function init() {


  // 1) Mensaje de carga
  showLoading($products);
  console.log('Iniciando la aplicación...');

  try {

    const data = await fetchProducts();

    // 3) Guardar en el estado (deja page = 1 y view = products)
    setProducts(data);

    // 4) Registrar eventos de paginación
    registerCategoryFilters({ $filter, $products, $info, $prev,$next });
    registerFilters({ $sort, $products, $info, $prev,$next });
    registerPagerEvents($products, $info, $prev, $next);

    // 5) Pintar la primera página
    renderPage($products, $info, $prev, $next);
  } catch (err) {
    console.error(err);
    showError($products);
  }
}

// document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', () => {
  init()
  registerEvents();
});