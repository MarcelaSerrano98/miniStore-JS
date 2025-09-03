// import { pageSlice } from "../core/state";

export function showToast(message, { type = 'success', timeout = 2000 } = {}) {
  const root = document.getElementById('toast-root');
  if (!root) return;

  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.role = 'status';
  el.textContent = message;

  root.appendChild(el);

  // Cierra solo luego de "timeout" ms
  const t = setTimeout(() => close(), timeout);

  // Cierre manual al hacer clic
  el.addEventListener('click', close);

  function close() {
    clearTimeout(t);
    // animación de salida opcional:
    el.style.transition = 'opacity .15s ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 160);
  }
}
export function registerEventsToast() {
  const productsEl = document.getElementById('products');

  // Evento para botones de agregar al carrito
  productsEl.addEventListener('click', (e) => {
    const btnAdd = e.target.closest('.add-to-cart');
    if (btnAdd) {
      showToast('Producto agregado al 🛒 con exito ✔️');
    }
  })

  document.getElementById('products').addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart');
  if (!btn) return;

  const card = btn.closest('.product-card');
  const product = {
    id: Number(btn.dataset.id),
    title: card.querySelector('h3').textContent,
    price: Number(card.querySelector('.price').dataset.price),
    image: card.querySelector('img').src,
    qty: 1
  };
  console.log(product)

  // Guardar en localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));

  alert("Producto agregado al carrito 🛒");
});
}