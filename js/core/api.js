

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error en la API');
  return res.json();
}


// === AÑADE ESTA NUEVA FUNCIÓN ===
/**
 * Obtiene todos los productos y los filtra para devolver solo los que
 * tienen una calificación mayor a 4.0.
 */
export async function fetchFavoriteProducts() {
  // 1. Obtenemos todos los productos
  const allProducts = await fetchProducts();

  // 2. Filtramos por la calificación (rating.rate)
  const favoriteProducts = allProducts.filter(p => p.rating && p.rating.rate > 4 );
  return favoriteProducts;
}

