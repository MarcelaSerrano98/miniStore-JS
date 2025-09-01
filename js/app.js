
const API_URL = 'https://fakestoreapi.com/products';
// console.log('uBICADA EN CONSOLA<')

const state = {
    products: [],
    view: [],
};


const $products = document.getElementById('products');
const $search = document.getElementById('search');
const $sort = document.getElementById('sort');
const $filter = document.getElementById('filter');


function showLoading() {
    $products.innerHTML = `<p style="padding:1rem;">Cargando productos…</p>`;
}

function showError(msg = 'Ocurrió un error al cargar los productos.') {
    $products.innerHTML = `<p style="padding:1rem;color:#a33;">${msg}</p>`;
}



function renderProducts(list) {
  if (!list.length) {
    $products.innerHTML = `<p style="padding:1rem;">No hay productos para mostrar.</p>`;
    return;
  }


  const html = list.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h3 title="${p.title}">${p.title}</h3>
      <p>$ ${(p.price)} USD</p>
      <div class="actions">
        <button class="secondary" ><a  href="./product.html?id=${p.id}">Ver detalles</a></button>
        <button data-id="${p.id}" class="add-to-cart">Agregar al carrito</button>
      </div>
    </article>
  `).join('');

  $products.innerHTML = html;
}

async function fetchProducts() {
  try {
    showLoading();
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Respuesta no válida de la API');
    const data = await res.json();

    state.products = data;
    state.view = data.slice();

    // buildCategoryOptions(state.products);
    renderProducts(state.view);
  } catch (err) {
    console.error(err);
    showError('No fue posible cargar los productos. Intenta de nuevo.');
  }
}
 
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});
