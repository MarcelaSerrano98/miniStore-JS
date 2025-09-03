
export const state = {
  products: [],  // todos los productos de la API
  view: [],      // lo que se muestra (puede estar filtrado/ordenado)
  page: 1,       // página actual
  pageSize: 8,   // productos por página
};

// Cambiar/llenar los datos:
export function setProducts(list) {
  state.products = Array.isArray(list) ? list : [];
  state.view = state.products.slice(); // al inicio mostramos todo
  state.page = 1;
}

// Helpers de paginación (cálculo, sin tocar HTML):
export function totalPages() {
  return Math.max(1, Math.ceil((state.view.length || 0) / state.pageSize));
}

export function pageSlice() {
  const start = (state.page - 1) * state.pageSize;
  return state.view.slice(start, start + state.pageSize);
}
