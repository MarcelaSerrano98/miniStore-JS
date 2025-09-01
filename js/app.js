// js/app.js
// PARA QUÉ: conectar todo. Aquí “empieza” tu app.

import { fetchProducts, fetchProductsByCategory } from './core/api.js';
import { state, setProducts } from './core/state.js';
import { showLoading, showError } from './ui/products.js';
import { renderPage, registerPagerEvents } from './ui/pager.js';

const $products = document.getElementById('products');
const $prev     = document.querySelector('.pass .back');
const $next     = document.querySelector('.pass .Next');
const $info     = document.getElementById('pager-info');

async function init() {
  // 1) Mensaje de carga
  showLoading($products);
  console.log('Iniciando la aplicación...');

  try {
    // 2) Traer datos de la API
    // const data = await fetchProducts();
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');

        let data; // Usamos la variable 'data' que ya existía

        if (category) {
            // Si la URL tiene una categoría, filtramos los productos
            data = await fetchProductsByCategory(category);
            console.log('>>> Datos RECIBIDOS de la API (filtrados):', data); // ¡ESTA LÍNEA ES LA MÁS IMPORTANTE!
        } else {
            // Si no, traemos todos los productos como siempre
            data = await fetchProducts();
            console.log('>>> Datos RECIBIDOS de la API (todos):', data);
        }

    // 3) Guardar en el estado (deja page = 1 y view = products)
         setProducts(data);

         // 4) Registrar eventos de paginación
         registerPagerEvents($products, $info, $prev, $next);

         // 5) Pintar la primera página
         renderPage($products, $info, $prev, $next);
  } catch (err) {
    console.error(err);
    showError($products);
  }
}

document.addEventListener('DOMContentLoaded', init);
