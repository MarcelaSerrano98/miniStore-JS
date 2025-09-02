// js/favorites.js

import { fetchFavoriteProducts } from '../core/api.js';
// Ya no importamos renderProducts, solo las funciones de carga y error
import { showLoading, showError } from './products.js';
import { registerEvents } from './events.js';

const $products = document.getElementById('products');


function renderFavoriteProducts($container, list) {
  if (!$container) return;

  if (!list || !list.length) {
    $container.innerHTML = `<p style="padding:1rem;">No hay productos favoritos para mostrar.</p>`;
    return;
  }

  const html = list.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h3 title="${p.title}">${p.title}</h3>
      <p>$ ${p.price} USD</p>
      
      <p class="product-card__rating">⭐ ${p.rating.rate} (${p.rating.count} opiniones)</p>
      
      <div class="actions">
        <button class="secondary see-details" data-id="${p.id}">Ver detalles</button>
        <button class="add-to-cart" data-id="${p.id}">Agregar al carrito</button>
      </div>
    </article>
  `).join('');

  $container.innerHTML = html;
}
// =============================================================

async function initFavorites() {
  // 1. Mensaje de carga inicial
  showLoading($products);
  console.log('Iniciando la página de favoritos...');

  try {
    // 2. Llamamos a la función de la API
    const favoriteProducts = await fetchFavoriteProducts();

    // 3. Usamos la nueva función local para pintar los favoritos
    renderFavoriteProducts($products, favoriteProducts);

  } catch (err) {
    console.error(err);
    showError($products, 'Ocurrió un error al cargar los productos favoritos.');
  }
}

// Inicia la carga de la página y registra los eventos
document.addEventListener('DOMContentLoaded', () => {
  initFavorites();
  registerEvents();
});