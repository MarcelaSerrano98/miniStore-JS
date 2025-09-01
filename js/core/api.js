// js/core/api.js
// PARA QUÉ: traer datos de la API (una tarea: fetch).

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error en la API');
  return res.json();
}
