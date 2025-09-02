import { showDetail } from './details.js';
import { showToast } from './toast.js';
import {  pageSlice, state } from '../core/state.js';


export function registerEvents() {
  const productsEl = document.getElementById('products');

  // Evento para botones de agregar al carrito
  productsEl.addEventListener('click', (e) => {
    const btnAdd = e.target.closest('.add-to-cart');
    if (btnAdd) {
      showToast('Producto agregado al 🛒 con exito ✔️');
    }

  productsEl.addEventListener('click', (e) => {
    const btnDetail = e.target.closest('.see-details');
    if (!btnDetail) return;

    const id = Number(btnDetail.dataset.id);
      showDetail(id,state.products);
    
  });

  })}