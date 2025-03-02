const express = require('express');

const router = express.Router();

const html_header=``;

//Solo en la ruta SKZ


router.get('/kpopie',(request, response, next) => {
    console.log("kpopie");
    response.render('kpop');
});

const path = require('path');

router.get('/Dreamcatcher',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'uwu.html'));
});

router.get('/PreguntaTarea',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio11.html'));
});

router.use('/SKZ',(request, response, next) => {
    console.log(request.body);
    response.send("Holiwis desde una ruta /SKZ")
});

router.use('/Ateez',(request, response, next) => {
    console.log(request.body);
    response.send("Halazia Hala Hala Halazia /ateez")
});

router.get('/formulario', (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'formulario.html'));
});

router.post('/guardar-datos', (request, response) => {
    const { nombre, mensaje } = req.body;

    if (!nombre || !mensaje) {
        return response.status(400).send("Faltan datos");
    }

    const data = `Nombre: ${nombre}\nMensaje: ${mensaje}\n---\n`;
    
    fs.appendFile('datos.txt', data, (err) => {
        if (err) {
            return res.status(500).send("Error al guardar los datos");
        }
        res.send("Datos guardados correctamente");
    });
});

module.exports = router;