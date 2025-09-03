// export function updateNavUI() {
//     // 1. Obtenemos el usuario actual desde localStorage
//     const currentUserJSON = localStorage.getItem('currentUser');
    
//     // 2. Buscamos el elemento de navegación que vamos a modificar
//     // Le añadiremos un ID para encontrarlo fácilmente
//     const navLink = document.getElementById('nav-auth-link');
//     if (!navLink) return;

//     if (currentUserJSON) {
//         // Si hay un usuario, parseamos sus datos
//         const currentUser = JSON.parse(currentUserJSON);

//         // 3. Reemplazamos "Acceder" con el nombre y un botón de "Cerrar Sesión"
//         navLink.innerHTML = `
//             <span class="nav-username">Hola, ${currentUser.name}</span>
//             <a href="#" id="logout-button" class="logout-button">Cerrar Sesión</a>
//         `;
        
//         // 4. Añadimos el evento para el botón de cerrar sesión
//         const logoutButton = document.getElementById('logout-button');
//         logoutButton.addEventListener('click', (e) => {
//             e.preventDefault();
//             // Borramos al usuario del localStorage
//             localStorage.removeItem('currentUser');
//             // Recargamos la página para reflejar el cambio
//             window.location.reload();
//         });

//     } else {
//         // 5. Si no hay usuario, nos aseguramos de que el enlace sea "Acceder"
//         navLink.innerHTML = '<a href="./auth.html">Acceder</a>';
//     }
// }