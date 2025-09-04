
export function registerEventsToast() {
  
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

    // Guardar en localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.findIndex(item => Number(item.id) === product.id);

    if (index >= 0) {
      cart[index].qty = (cart[index].qty || 1) + 1;
      alert('Este producto ya estaba en el carrito, se aumentó la cantidad.');
    } else {
      cart.push(product);
      alert("Producto agregado al carrito 🛒");
    }
    localStorage.setItem('cart', JSON.stringify(cart));


  });
}