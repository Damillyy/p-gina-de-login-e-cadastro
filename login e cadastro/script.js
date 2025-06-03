// Funções utilitárias para lidar com LocalStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email, password) {
    const users = getUsers();
    return users.find(
        user => user.email === email && user.password === password
    );
}

function userExists(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

// Cadastro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;

        const message = document.getElementById('registerMessage');
        message.style.color = "red";

        if (!name || !email || !password) {
            message.textContent = "Preencha todos os campos!";
            return;
        }
        if (userExists(email)) {
            message.textContent = "Este email já está cadastrado!";
            return;
        }
        saveUser({ name, email, password });
        message.style.color = "green";
        message.textContent = "Cadastro realizado com sucesso! Redirecionando para login...";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        const message = document.getElementById('loginMessage');
        message.style.color = "red";

        if (!email || !password) {
            message.textContent = "Preencha todos os campos!";
            return;
        }
        const user = findUser(email, password);
        if (!user) {
            message.textContent = "Email ou senha inválidos!";
            return;
        }
        message.style.color = "green";
        message.textContent = "Login bem-sucedido!";

        // Simular página logada
        setTimeout(() => {
            alert(`Bem-vindo(a), ${user.name}!`);
            // Aqui você pode redirecionar para uma página protegida se desejar
            // window.location.href = "home.html";
        }, 1000);
    });
}