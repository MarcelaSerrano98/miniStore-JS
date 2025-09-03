// js/app.js
// PARA QUÉ: conectar todo. Aquí “empieza” tu app.

import { fetchProducts } from './core/api.js';
import { state, setProducts } from './core/state.js';
import { showLoading, showError } from './ui/products.js';
import { renderPage, registerPagerEvents } from './ui/pager.js';
// import { registerEvents } from './ui/events.js';
import { registerFilters, registerCategoryFilters } from './ui/filters.js';
import { registerEventsToast } from './ui/toast.js';
import { registerEventsDetails } from './ui/details.js';

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
  registerEventsToast();
  registerEventsDetails()

});


function gestionarSesion() {
    // 1. Buscamos el elemento que vamos a modificar
    const navAuthLink = document.getElementById('nav-auth-link');
    
    // 2. Obtenemos el usuario guardado en localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 3. Validamos si existe un usuario
    if (currentUser) {
        // Si existe, cambiamos el HTML del <li>
        navAuthLink.innerHTML = `
            <a href="#" id="logout-button" class="logout-button">Cerrar sesión</a>
        `;
        
        // 4. Añadimos la funcionalidad al botón "Cerrar Sesión"
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace recargue la página de forma extraña
            
            // Eliminamos al usuario del localStorage
            localStorage.removeItem('currentUser');
            
            // Recargamos la página para que se actualice la UI
            window.location.reload();
        });

    } else {
        // Si no hay usuario, nos aseguramos de que se muestre el enlace para acceder.
        // Esto es útil por si el usuario cierra sesión.
        navAuthLink.innerHTML = '<a href="./auth.html">Acceder</a>';
    }
}

// --- EJECUTAR LA LÓGICA CUANDO LA PÁGINA CARGUE ---
document.addEventListener('DOMContentLoaded', () => {
    // Llamamos a nuestra nueva función para que se ejecute al cargar la página
    gestionarSesion();
    
    // Aquí va el resto del código que inicializa tu tienda
    // (cargar productos, registrar filtros, etc.)
});