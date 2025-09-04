/**
 * Función que revisa si hay un usuario en localStorage y actualiza la UI de la navegación.
 */
function gestionarSesion() {
    // Busca el elemento de la navegación que vamos a modificar.
    const navAuthLink = document.getElementById('nav-auth-link');
    
    // Si el elemento no existe en la página actual por si acaso, no hacemos nada.
    if (!navAuthLink) return;

    // Obtener el usuario guardado en localStorage.
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Validar si existe un usuario.
    if (currentUser) {
        navAuthLink.innerHTML = `
            <a href="#" id="logout-button" class="logout-button">Cerrar Sesión</a>
        `;
        
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            // Redirigir a la página de login.
            window.location.href = 'auth.html';
        });

    } else {
        // Si no hay usuario, muestra el enlace para acceder.
        navAuthLink.innerHTML = '<a href="./auth.html">Acceder</a>';
    }
}
document.addEventListener('DOMContentLoaded', gestionarSesion);