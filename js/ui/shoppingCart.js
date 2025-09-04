document.addEventListener('DOMContentLoaded', () => {

    const KEY = 'cart';
    const ORDERS_KEY = 'orders';
    const tbody = document.getElementById('cart-body');


    // Helpers para leer/guardar
    const getOrders = () => JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const setOrders = (orders) => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders || []));
    const getCart = () => JSON.parse(localStorage.getItem(KEY) || '[]');
    const setCart = (items) => localStorage.setItem(KEY, JSON.stringify(items));

    function summary() {
        const cart = getCart()
        const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
        console.log(typeof totalItems)
        document.getElementById('total-items').textContent = totalItems
    }

    function total() {
        const cart = getCart();

        const totalPirce = cart.reduce((acc, item) => acc + (item.price * (item.qty || 1) || 1), 0);
        document.getElementById('total-price').textContent = `$ ${totalPirce} (USD)`
    }

    function calcTotals(cart) {
        return {
            totalItems: cart.reduce((acc, it) => acc + (Number(it.qty) || 1), 0),
            totalPrice: cart.reduce((acc, it) => acc + ((Number(it.price) || 0) * (Number(it.qty) || 1)), 0),
        };
    }
    function showToast(message, { type = 'success', timeout = 2000 } = {}) {
        // contenedor principal
        const root = document.getElementById('toast-root');
        if (!root) {
            console.warn('No existe #toast-root en el HTML');
            return;
        }

        // crear el toast
        const el = document.createElement('div');
        el.className = `toast toast--${type}`;
        el.role = 'status';
        el.textContent = message;

        root.appendChild(el);

        // cierre automático después de timeout
        const t = setTimeout(close, timeout);

        // cierre manual al hacer clic
        el.addEventListener('click', close);

        function close() {
            clearTimeout(t);
            el.style.transition = 'opacity .15s ease';
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 160);
        }
    }

    function render() {
        const totalItemsEl = document.getElementById('total-items');
        const totalPriceEl = document.getElementById('total-price');
        const cart = getCart();

        if (!cart.length) {
            tbody.innerHTML = `<tr><td colspan="5" style="padding:1rem;">Carrito vacío 🛒</td></tr>`;
            if (totalItemsEl) totalItemsEl.textContent = '0';
            if (totalPriceEl) totalPriceEl.textContent = '0';

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
        // buy()
    }

    function removeFromCart(productId) {
        const cart = getCart();
        const updated = cart.filter(item => Number(item.id) !== Number(productId));
        setCart(updated);
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
        // console.log('click')
        if (!row) return; // click fuera de una fila

        const id = Number(row.dataset.id);


        if (e.target.closest('.btn-remove')) {
            removeFromCart(id);
            render();
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

    function showPurchaseToast() {
  if (typeof showToast === 'function') {
    showToast('Compra 🛒 registrada ✔️', { type: 'success', timeout: 2000 });
  } else {
    alert('Compra 🛒 registrada ✔️');
  }
}

// Acción principal: finalizar compra
function finishPurchase() {
  const cart = getCart();
  if (!cart.length) return; // nada que comprar

  // Crear la orden y guardarla en el historial
  const { totalItems, totalPrice } = calcTotals(cart);
  const orders = getOrders();

  const order = {
    id: Date.now(),                 // id simple
    items: cart,                    // snapshot de lo comprado
    totalItems,
    totalPrice,
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  setOrders(orders);

  // Vaciar carrito
  setCart([]);

  // Feedback + refrescar UI
  showPurchaseToast();
  render();
}

  const summarySection = document.getElementById('cart-summary') || document.querySelector('.cart-summary');
  if (!summarySection) return;

  summarySection.addEventListener('click', (e) => {
    const btnFinish = e.target.closest('.btn'); // tu botón
    if (!btnFinish) return;
    finishPurchase();
  });

    summarySection.addEventListener('click', (e) => {
    const btnHistorial = e.target.closest('.btn-historial'); // tu botón
    if (!btnHistorial) return;
    window.location.href = './historial.html';
  });
  render();
}); 







