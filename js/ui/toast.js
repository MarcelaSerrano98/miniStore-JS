// js/ui/toast.js
// Muestra una ventanita flotante (toast) y la cierra sola.

export function showToast(message, { type = 'success', timeout = 2000 } = {}) {
  const root = document.getElementById('toast-root');
  if (!root) return;

  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.role = 'status';
  el.textContent = message;

  root.appendChild(el);

  // Cierra solo luego de "timeout" ms
  const t = setTimeout(() => close(), timeout);

  // Cierre manual al hacer clic
  el.addEventListener('click', close);

  function close() {
    clearTimeout(t);
    // animación de salida opcional:
    el.style.transition = 'opacity .15s ease';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 160);
  }
}
    
