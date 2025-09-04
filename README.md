# 🛒 MiniStore – Carrito e Historial de Compras

Este proyecto es una aplicación web simple que simula el flujo de **carrito de compras** e incluye un **historial de órdenes** persistente en `localStorage`.

---

## 🚀 Funcionalidades

- **Catálogo de productos**
  - Vista de productos con botón “Agregar al carrito y Ver detalles”.
  - Almacenamiento del carrito en `localStorage`.

- **Productos favoritos**
  - Vista de productos con botón “Agregar al carrito y ver detalles”.
  - Productos mejor calificados con raiting mayor a 4

- **Ver detalles**
   - Muestra un `toast` con la ifnormacion completa del producto seleccionado

- **Carrito de compras (`shopingCart.html`)**
  - Ver los productos agregados.
  - Aumentar o disminuir cantidades (+ / -).
  - Eliminar productos individuales.
  - Resumen con:
    - Total de productos.
    - Total a pagar.
  - Finalizar compra:
    - Muestra un `toast` de confirmación.
    - Guarda la orden en `localStorage.orders`.
    - Limpia el carrito.

- **Historial de compras (`orders.html`)**
  - Lista de todas las compras realizadas.
  - Tabla con columnas: **Orden**, **Fecha**, **Items**, **Total**, **Acciones**.
  - Botón “Ver productos” que despliega detalle de la orden.
  - Botón “Borrar historial”.

---

## 🛠️ Tecnologías usadas

- **HTML5** – estructura de las páginas.
- **CSS** – estilos personalizados (paleta beige/café).
- **JavaScript** – lógica de carrito e historial.
- **localStorage** – persistencia de datos en el navegador.

---

## 📌 Flujo de datos
1. Usuario visualiza productos
2. El usuario agrega productos al carrito → se guardan en `localStorage.cart`.
3. En `shopingCart.html` se leen los datos de `localStorage.cart` y se muestran en tabla.
4. Al finalizar la compra:
   - Se calcula resumen.
   - Se guarda la orden en `localStorage.orders`.
   - Se limpia el carrito.
5. En `orders.html`, se leen las órdenes de `localStorage.orders` y se muestran en una tabla con detalle.

---

## 🎨 Paleta de colores

```css
:root {
  --color-bg: #f6f1e7;         /* Fondo beige */
  --color-card: #fdfaf5;       /* Fondo de tarjetas */
  --color-primary: #8c6b4f;    /* Café medio */
  --color-dark: #3e2d23;       /* Café oscuro */
  --color-border: #d6c5b4;     /* Bordes suaves */
  --color-hover: #b08968;      /* Hover botones */
  --radius: 12px;
  --shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  --font-body: "Segoe UI", Roboto, sans-serif;
}

