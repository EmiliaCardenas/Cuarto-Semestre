const express = require('express');
const session = require('express-session');
const router = express.Router();

router.use(session({
    secret: 'un_string_secreto_super_seguro', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// Ruta para establecer una cookie
router.get('/set-cookie', (request, response) => {
    response.setHeader('Set-Cookie', 'usuario=EmiliaCardenas; HttpOnly; Max-Age=3600'); 
    response.send('Cookie establecida');
});

// Ruta para leer las cookies enviadas por el cliente
router.get('/get-cookie', (request, response) => {
    const cookies = request.get('Cookie');
    response.send(`Cookies recibidas: ${cookies}`);
});

// Ruta para eliminar una cookie
router.get('/delete-cookie', (request, response) => {
    response.setHeader('Set-Cookie', 'usuario=; Max-Age=0');
    response.send('Cookie eliminada');
});

router.get('/session-info', (request, response) => {
    if (request.session.usuario) {
        response.send(`Usuario en sesión: ${request.session.usuario}`);
    } else {
        response.send('No hay sesión activa.');
    }
});

router.get('/logout', (request, response) => {
    request.session.destroy(() => {
        response.send('Sesión cerrada correctamente');
    });
});

module.exports = router;
