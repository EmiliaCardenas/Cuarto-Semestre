const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./database');
const Idol = require('./idol');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: false }));

const isAuth = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }
    next();
};

const hasPermission = (permiso) => {
    return async (request, response, next) => {
        if (!request.session.user) return response.redirect('/login');
        
        const [result] = await db.execute(
            `SELECT p.nombre FROM permisos p 
            JOIN rol_permisos rp ON p.id = rp.permiso_id 
            JOIN usuario_roles ur ON rp.rol_id = ur.rol_id 
            WHERE ur.usuario_id = ? AND p.nombre = ?`,
            [request.session.user.id, permiso]
        );
        
        if (result.length > 0) return next();
        return response.status(403).send('Acceso denegado');
    };
};

app.post('/register', async (request, response) => {
    const { username, password, roleId } = request.body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const [result] = await db.execute('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword]);
    const userId = result.insertId;
    
    await db.execute('INSERT INTO usuario_roles (usuario_id, rol_id) VALUES (?, ?)', [userId, roleId]);
    response.redirect('/login');
});

app.post('/login', async (request, response) => {
    const { username, password } = request.body;
    const [users] = await db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
    if (users.length === 0) return response.redirect('/login');
    
    const user = users[0];
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) return response.redirect('/login');
    
    request.session.isLoggedIn = true;
    request.session.user = { id: user.id, username: user.username };
    response.redirect('/dashboard');
});

app.get('/dashboard', isAuth, (request, response) => {
    response.send('Bienvenido al panel de usuario');
});

app.get('/editar-idols', isAuth, hasPermission('editar_idols'), (request, response) => {
    response.send('Página para editar idols');
});

app.get('/idols', (request, response) => {
    Idol.fetchAll()
        .then(([rows]) => {
            response.json(rows);
        })
        .catch(error => console.log(error));
});

app.post('/idols', (request, response) => {
    const idol = new Idol(request.body.nombre, request.body.grupo);
    idol.save()
        .then(() => {
            response.redirect('/idols');
        })
        .catch(error => console.log(error));
});

app.post('/logout', (request, response) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
});

app.listen(3000, () => console.log('Servidor en ejecución'));
