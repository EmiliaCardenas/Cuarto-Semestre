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

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

const users = [];

const isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.send('Usuario ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    users.push({ username, password: hashedPassword });
    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    
    if (!user) {
        return res.redirect('/login');
    }
    
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(() => {
            res.redirect('/dashboard');
        });
    }
    res.redirect('/login');
});

app.get('/dashboard', isAuth, (req, res) => {
    res.send('Bienvenido al panel de usuario');
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.get('/login', (req, res) => {
    res.send(`<form action="/login" method="POST">
                <input type="hidden" name="_csrf" value="${res.locals.csrfToken}">
                <input type="text" name="username" placeholder="Usuario">
                <input type="password" name="password" placeholder="Contraseña">
                <button type="submit">Iniciar sesión</button>
              </form>`);
});

app.listen(3000, () => console.log('Servidor en ejecución en el puerto 3000'));
