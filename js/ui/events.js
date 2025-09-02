import { showToast } from './toast.js';

export function registerEvents() {
  const productsEl = document.getElementById('products');

  // Evento para botones de agregar al carrito
  productsEl.addEventListener('click', (e) => {
    const btnAdd = e.target.closest('.add-to-cart');
    if (btnAdd) {
      showToast('Producto agregado al 🛒 con exito ✔️');
    }
  });

}
