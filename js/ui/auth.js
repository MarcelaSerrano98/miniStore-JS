// Selectores para la animación.
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Selectores de formularios e inputs.
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');


// Evento para procesar el REGISTRO
registerForm.addEventListener('submit', (e) => {
    // Evita que el formulario se recargue.
    e.preventDefault();

    // Obtener valores de los inputs.
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;

    // Obtener los usuarios que ya existen en localStorage.
    // Si no hay ninguno, creamos un array.
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Busca si el email que intentan registrar ya existe.
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return alert('El correo ya está registrado. Intenta con otro.');
    }

    // Crea un objeto para el nuevo usuario.
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    // Agrega el nuevo usuario al array de usuarios.
    users.push(newUser);

    // Guarda el array actualizado en localStorage.
    // Usa JSON.stringify para convertir el array en un string.
    localStorage.setItem('users', JSON.stringify(users));

    // Mostramos un mensaje de éxito y limpiamos los campos del formulario
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    registerForm.reset();
});

// Procesar LOGIN.
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // Guarda el usuario actual en localStorage para mantener la sesión activa.
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        alert(`¡Bienvenido de nuevo, ${validUser.name}!`);
        //Redirige al usuario a la página principal.
        window.location.href = 'index.html';
    } else {
        alert('Correo o contraseña incorrectos. Por favor, verifica tus datos.');
    }

    loginForm.reset();
});