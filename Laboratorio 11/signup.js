const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));
const csrfProtection = csrf();
app.use(csrfProtection);

app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

const users = [];

const isAuth = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }
    next();
};

app.post('/register', async (request, response) => {
    const { username, password } = request.body;
    
    if (users.some(user => user.username === username)) {
        return response.send('Usuario ya registrado');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        users.push({ username, password: hashedPassword });
        response.redirect('/login');
    } catch (error) {
        response.status(500).send('Error en el registro');
    }
});

app.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return response.redirect('/login');
    }
    
    try {
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            request.session.isLoggedIn = true;
            request.session.user = user;
            return request.session.save(() => {
                response.redirect('/dashboard');
            });
        }
        response.redirect('/login');
    } catch (error) {
        response.status(500).send('Error en la autenticación');
    }
});

app.get('/dashboard', isAuth, (request, response) => {
    response.send('Bienvenido al panel de usuario');
});

app.post('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
});

app.get('/login', (request, response) => {
    response.send(`
        <form action="/login" method="POST">
            <input type="hidden" name="_csrf" value="${response.locals.csrfToken}">
            <input type="text" name="username" placeholder="Usuario" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button type="submit">Iniciar sesión</button>
        </form>
    `);
});

app.listen(3000, () => console.log('Servidor en ejecución'));
