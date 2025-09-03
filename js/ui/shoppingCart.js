
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-body');
    const tsummary = document.getElementById('cart-summary')




    if (!cart.length) {
        tbody.innerHTML = `<tr><td colspan="5">Carrito vacío 🛒</td></tr>`;
        return;
    }

    cart.forEach(item => {
        console.log(item)
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.title}</td>
      <td>
      <button class="btn-number minus">+</button>
      <span>${item.qty}</span>
      <button class="btn-number plus">-</button>
      </td>
      <td>$${item.price}</td>
      <td>$${item.price * item.qty}</td>
      <td><button class="btn-remove">❌Eliminar </button></td>
    `;
        tbody.appendChild(row);
    });
    // Evento para botones de agregar al carrito
    cart.tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-remove');
    if (!btn) return;

    const row = btn.closest('tr');
    row.remove(); // quita la fila del DOM
    console.log('Fila eliminada');
  });


});





