import { state, totalPages, pageSlice } from '../core/state.js';
import { renderProducts } from './products.js';

export function renderPage($products, $info, $prev, $next) {
  // 1) limita page al rango
  const total = totalPages();
  if (state.page < 1) state.page = 1;
  if (state.page > total) state.page = total;

  // 2) pinta solo los items de esta página
  renderProducts($products, pageSlice());

  // 3) actualiza indicador y botones
  if ($info) $info.textContent = `Página ${state.page} / ${total}`;
  if ($prev) $prev.disabled = state.page <= 1;
  if ($next) $next.disabled = state.page >= total;
}

export function registerPagerEvents($products, $info, $prev, $next) {
  $prev?.addEventListener('click', () => {
    if (state.page > 1) {
      state.page--;
      renderPage($products, $info, $prev, $next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  $next?.addEventListener('click', () => {
    const total = totalPages();
    if (state.page < total) {
      state.page++;
      renderPage($products, $info, $prev, $next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}
