const ORDERS_KEY = 'orders';
const getOrders = () => { try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch { return []; } };
const setOrders = (orders) => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders || []));
const money = n => `$${(Number(n) || 0).toFixed(2)}`;

function showToast(message, { type='success', timeout=2000 } = {}) {
  const root = document.getElementById('toast-root'); if (!root) return;
  const el = document.createElement('div');
  el.className = `toast toast--${type}`; el.role = 'status'; el.textContent = message;
  root.appendChild(el);
  const t = setTimeout(close, timeout);
  el.addEventListener('click', close);
  function close(){ clearTimeout(t); el.style.transition='opacity .15s'; el.style.opacity='0'; setTimeout(()=>el.remove(), 160); }
}

function renderOrdersTable() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;
  const orders = getOrders();

  if (!orders.length) {
    tbody.innerHTML = `
      <tr><td colspan="5">
        <div class="empty">No tienes compras registradas. <a class="btn" href="../shopingCart.html" style="margin-left:.5rem;">Ir al carrito</a></div>
      </td></tr>`;
    return;
  }

  const rows = orders
    .slice()               // copia
    .sort((a,b) => b.id - a.id)  // más recientes primero
    .map(order => {
      const date = new Date(order.createdAt).toLocaleString();
      const headRow = `
        <tr class="order-row" data-order-id="${order.id}">
          <td><strong>#${order.id}</strong></td>
          <td>${date}</td>
          <td class="col-items">${order.totalItems}</td>
          <td class="col-total">${money(order.totalPrice)}</td>
          <td class="col-actions">
            <button class="btn btn-toggle">Ver productos</button>
          </td>
        </tr>
      `;

      const products = (order.items || []).map(it => `
        <div class="product-item">
          <div class="product-title">${it.title}</div>
          <div class="product-qty">x${it.qty || 1}</div>
          <div class="product-price">${money((it.price || 0) * (it.qty || 1))}</div>
        </div>
      `).join('');

      const detailRow = `
        <tr class="order-detail-row" data-detail-for="${order.id}" style="display:none;">
          <td colspan="5">
            <div class="order-detail">
              <div class="products-box">
                ${products || '<div class="product-item"><div class="product-title">Sin ítems</div><div></div><div class="product-price">$0.00</div></div>'}
              </div>
            </div>
          </td>
        </tr>
      `;

      return headRow + detailRow;
    })
    .join('');

  tbody.innerHTML = rows;
}

function registerOrdersTableEvents() {
  const tbody = document.getElementById('orders-tbody');
  if (!tbody) return;

  // Toggle de detalle
  tbody.addEventListener('click', (e) => {
    const row = e.target.closest('.order-row');
    if (!row) return;

    if (e.target.closest('.btn-toggle')) {
      const id = row.dataset.orderId;
      const detail = tbody.querySelector(`.order-detail-row[data-detail-for="${id}"]`);
      if (!detail) return;
      const visible = detail.style.display !== 'none';
      detail.style.display = visible ? 'none' : '';
      e.target.textContent = visible ? 'Ver productos' : 'Ocultar productos';
    }
  });

  // Botón borrar historial (si lo tienes en la página)
  const clearBtn = document.getElementById('clear-orders');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const ok = confirm('¿Borrar todo el historial?');
      if (!ok) return;
      setOrders([]);
      showToast('Historial borrado', { type: 'success' });
      renderOrdersTable();
    });
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderOrdersTable();
  registerOrdersTableEvents();
});
