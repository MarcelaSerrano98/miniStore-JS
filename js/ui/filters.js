import { state } from '../core/state.js';
import { renderPage } from './pager.js';

export function registerFilters({ $sort,  $products, $info, $prev, $next }) {
  $sort?.addEventListener('change', () => {
    applySort($sort.value);

    // Siempre reinicio a la página 1 después de ordenar
    state.page = 1;

    // Repinto con el nuevo orden
    renderPage($products, $info, $prev, $next);
  });
}
export function registerCategoryFilters({ $filter,  $products, $info, $prev, $next }) {
  $filter?.addEventListener('change', () => {
    applyFilter($filter.value);

    // Siempre reinicio a la página 1 después de ordenar
    state.page = 1;

    // Repinto con el nuevo orden
    renderPage($products, $info, $prev, $next);
  });
}

function applySort(option) {
      if (option === 'price-asc') {
    // menor a mayor
    state.view.sort((a, b) => a.price - b.price);
  }
  if (option === 'price-desc') {
    // mayor a menor
    state.view.sort((a, b) => b.price - a.price);
  }
  if (option === 'title-asc') {
    //  A → Z
    state.view.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (option === 'title-desc') {
    // Z → A
    state.view.sort((a, b) => b.title.localeCompare(a.title));
  }
}

function applyFilter(option) {
      const wanted = String(option).trim().toLowerCase();

  if (wanted === 'all') {
    state.view = state.products.slice();
    return;
  }

  state.view = state.products.filter(p =>
    String(p.category).trim().toLowerCase() === wanted
  );
}