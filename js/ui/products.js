

export function showLoading($container) {
  if ($container) $container.innerHTML = `<p style="padding:1rem;">Cargando productos…</p>`;
}

export function showError($container, msg = 'Ocurrió un error al cargar los productos.') {
  if ($container) $container.innerHTML = `<p style="padding:1rem;color:#a33;">${msg}</p>`;
}

export function renderProducts($container, list) {
  if (!$container) return;

  if (!list || !list.length) {
    $container.innerHTML = `<p style="padding:1rem;">No hay productos para mostrar.</p>`;
    return;
  }

  const html = list.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h3 title="${p.title}">${p.title}</h3>
      <p>$ ${p.price} USD</p>
      <div class="actions">
        <button class="secondary see-details" data-id="${p.id}">Ver detalles</button>
        <button class="add-to-cart" data-id="${p.id}">Agregar al carrito</button>
      </div>
    </article>
  `).join('');

  $container.innerHTML = html;
}
    