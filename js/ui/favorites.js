// js/favorites.js

import { fetchFavoriteProducts } from '../core/api.js';
import { showLoading, showError } from './products.js';
import { registerEventsDetails } from './details.js';
import { setProducts } from '../core/state.js';
import { registerEventsToast } from './toast.js';

const $products = document.getElementById('products');

let currentFavoriteProducts = [];

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
      <p class="price" data-price="${p.price}">$ ${p.price} USD</p>

      
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

    const favoriteProducts = await fetchFavoriteProducts();
     currentFavoriteProducts = favoriteProducts;
    setProducts(favoriteProducts);
    renderFavoriteProducts($products, favoriteProducts);

  } catch (err) {
    console.error(err);
    showError($products, 'Ocurrió un error al cargar los productos favoritos.');
  }
}

//busqueda en favorites,
function applyFavoritesSearch() {
    const $searchInput = document.getElementById('search');
    const searchTerm = $searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        // CORRECCIÓN: Llamar a la función y variable correctas
        renderFavoriteProducts($products, currentFavoriteProducts);
        return;
    }

    const filteredFavorites = currentFavoriteProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );

    if (filteredFavorites.length > 0) {
        // CORRECCIÓN: Llamar a la función y variable correctas
        renderFavoriteProducts($products, filteredFavorites);
    } else {
        // CORRECCIÓN: Usar la variable correcta
        showError($products, 'No se encontraron favoritos con ese nombre.');
    }
}

// Inicia la carga de la página y registra los eventos
document.addEventListener('DOMContentLoaded', () => {
  initFavorites();
  registerEventsDetails();
  registerEventsToast()

  const $searchInput = document.getElementById('search');
    if ($searchInput) {
        $searchInput.addEventListener('input', applyFavoritesSearch);
    }
});