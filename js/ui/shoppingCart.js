
document.addEventListener('DOMContentLoaded', () => {

    const KEY = 'cart';
    const tbody = document.getElementById('cart-body');
    const tsummary = document.getElementById('cart-summary')


    // Helpers para leer/guardar
    const getCart = () => JSON.parse(localStorage.getItem(KEY) || '[]');
    const setCart = (items) => localStorage.setItem(KEY, JSON.stringify(items));

    function summary() {
        const cart=getCart()
        const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        document.getElementById('total-items').textContent = totalItems
    }

    function total(){
        const cart = getCart();

        const totalPirce= cart.reduce((acc, item) => acc + (item.price * (item.qty || 1) || 1), 0);
        document.getElementById('total-price').textContent =totalPirce



        l
    }

    function render() {
        const cart = getCart();

        if (!cart.length) {
            tbody.innerHTML = `<tr><td colspan="5" style="padding:1rem;">Carrito vacío 🛒</td></tr>`;
            return;
        }

        tbody.innerHTML = cart.map(item => `
      <tr data-id="${item.id}">
        <td>${item.title}</td>
        <td>
          <button class="btn-number minus">-</button>
          <span class="qty-number">${item.qty || 1}</span>
          <button class="btn-number plus">+</button>
        </td>
        <td>$${item.price}</td>
        <td>$${item.price * (item.qty || 1)}</td>
        <td><button class="btn-remove">❌ Eliminar</button></td>
      </tr>
    `).join('');

   summary()
   total()

    }

    function removeFromCart(productId) {
        const cart = getCart();
        const updated = cart.filter(item => Number(item.id) !== Number(productId));
        setCart(updated);        // ← guarda el carrito actualizado
    }
    function updateQty(productId, delta) {
        const cart = getCart();
        const item = cart.find(it => Number(it.id) === Number(productId));
        if (!item) return;
        item.qty = Math.max(1, (item.qty || 1) + delta);
        setCart(cart);
    }



    tbody.addEventListener('click', (e) => {
        const row = e.target.closest('tr[data-id]');
        if (!row) return; // click fuera de una fila

        const id = Number(row.dataset.id);


        if (e.target.closest('.btn-remove')) {
            removeFromCart(id); // ← quita del localStorage
            render();           // ← vuelve a pintar la tabla
            return;
        }

        if (e.target.closest('.plus')) {
            updateQty(id, +1);
            render();
            return;
        }

        if (e.target.closest('.minus')) {
            updateQty(id, -1);
            render();
            return;
        }
    });
    // setCart(ca   rt);   // guarda en localStorage
    render();        // repinta la tabla

});






