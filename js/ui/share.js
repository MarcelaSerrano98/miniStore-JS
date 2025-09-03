/**
 * Función que revisa si hay un usuario en localStorage y actualiza la UI de la navegación.
 * Este código se ejecutará en TODAS las páginas.
 */
function gestionarSesion() {
    // 1. Buscamos el elemento de la navegación que vamos a modificar
    const navAuthLink = document.getElementById('nav-auth-link');
    
    // Si el elemento no existe en la página actual (por si acaso), no hacemos nada.
    if (!navAuthLink) return;

    // 2. Obtenemos el usuario guardado en localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // 3. Validamos si existe un usuario
    if (currentUser) {
        // Si existe, cambiamos el HTML del <li>
        navAuthLink.innerHTML = `
            <a href="#" id="logout-button" class="logout-button">Cerrar Sesión</a>
        `;
        
        // 4. Añadimos la funcionalidad al botón "Cerrar Sesión"
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            // Redirigimos a la página de login para una mejor experiencia
            window.location.href = 'auth.html';
        });

    } else {
        // Si no hay usuario, mostramos el enlace para acceder.
        navAuthLink.innerHTML = '<a href="./auth.html">Acceder</a>';
    }
}

// --- EJECUTAR LA LÓGICA CUANDO CUALQUIER PÁGINA CARGUE ---
document.addEventListener('DOMContentLoaded', gestionarSesion);