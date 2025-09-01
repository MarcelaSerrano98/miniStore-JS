
// --- Selectores para la animación de paneles ---
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// --- LÓGICA DE REGISTRO Y LOGIN CON LOCALSTORAGE ---

// Selectores de los formularios y campos de texto
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');


// --- Evento para procesar el REGISTRO ---
registerForm.addEventListener('submit', (e) => {
    // 1. Evitamos que el formulario se recargue por defecto
    e.preventDefault();

    // 2. Obtenemos los valores de los inputs
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    // 3. Obtenemos los usuarios que ya existen en localStorage.
    // Si no hay ninguno, creamos un array vacío [].
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. Buscamos si el email que intentan registrar ya existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return alert('El correo ya está registrado. Intenta con otro.');
    }

    // 5. Creamos un objeto para el nuevo usuario
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    // 6. Agregamos el nuevo usuario al array de usuarios
    users.push(newUser);

    // 7. Guardamos el array actualizado en localStorage.
    // Usamos JSON.stringify para convertir el array en un string.
    localStorage.setItem('users', JSON.stringify(users));

    // 8. Mostramos un mensaje de éxito y limpiamos los campos del formulario
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    registerForm.reset();
});


// --- Evento para procesar el LOGIN ---
loginForm.addEventListener('submit', (e) => {
    // 1. Evitamos que el formulario se recargue
    e.preventDefault();

    // 2. Obtenemos los valores de los inputs de login
    const email = loginEmail.value;
    const password = loginPassword.value;

    // 3. Obtenemos la lista de usuarios guardados
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 4. Buscamos un usuario cuyo email Y contraseña coincidan
    const validUser = users.find(user => user.email === email && user.password === password);

    // 5. Verificamos si encontramos un usuario válido
    if (validUser) {
        alert(`¡Bienvenido de nuevo, ${validUser.name}!`);
        // En una aplicación real, aquí redirigirías al usuario.
        // Ejemplo: window.location.href = 'tienda.html';
    } else {
        alert('Correo o contraseña incorrectos. Por favor, verifica tus datos.');
    }

    // 6. Limpiamos los campos del formulario de login
    loginForm.reset();
});