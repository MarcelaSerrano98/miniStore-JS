import { pageSlice, state } from '../core/state.js';

export function showDetail(id, list = []) {
  const root = document.getElementById('modal');
  if (!root) return;

  // 🔧 evita acumulación: si ya hay uno, elimínalo
  const existing = root.querySelector('.modal-detail');
  if (existing) existing.remove();

  const p = list.find(item => Number(item.id) === Number(id));
  if (!p) return; // si no lo encuentra, no hace nada

  const el = document.createElement('div');
  el.className = `modal-detail`;
  el.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true">
      

      <div class="modal-body">
        <div class="detail-left">
          <img src="${p.image}" alt="${p.title}" loading="lazy" />
        </div>

        <div class="detail-right">
          <h3 class="detail-title">${p.title}</h3>
          <p class="detail-category"><strong>Categoria: ${p.category}</strong></p>
          <p class="detail-price"><strong>Precio: $ ${p.price} USD</strong></p>
          <p class="detail-desc">${p.description}</p>

          <div class="detail-actions">
            <button class="modal-close">✖️</button>
          </div>
        </div>
      </div>
    </div>
  `;

  root.appendChild(el);

  const btnClose = el.querySelector('.modal-close');
  btnClose.addEventListener('click', close)
  function close() {
    el.remove()
  }
}

export function registerEventsDetails() {
  const productsEl = document.getElementById('products');

    productsEl.addEventListener('click', (e) => {
      const btnDetail = e.target.closest('.see-details');
      if (!btnDetail) return;
//Es una propiedad de cualquier elemento del DOM que contiene todos los atributos personalizados que comienzan con data-
//Los nombres de atributos con guion (data-product-id) se transforman a camelCase (dataset.productId).
      const id = Number(btnDetail.dataset.id);
      // const source = Array.isArray(list) && list.length ? list : state.products;
      showDetail(id, pageSlice());


    });
}

