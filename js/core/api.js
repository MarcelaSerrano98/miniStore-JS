

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error en la API');
  return res.json();
}

export async function fetchProductsByCategory(category) {
    const res = await fetch(`${API_URL}/category/${category}`);
    if (!res.ok) throw new Error('Error al cargar la categoría');
    return res.json();
}
export async function fetchCategories() {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
        throw new Error('No se pudieron cargar las categorías desde la API.');
    }
    return response.json();
}

