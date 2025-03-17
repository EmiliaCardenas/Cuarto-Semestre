const express = require('express');

const router = express.Router();


//Solo en la ruta SKZ


router.get('/kpopie',(request, response, next) => {
    console.log("kpopie");
    response.render('kpop');
});

const path = require('path');


const todos_controller = require('../controllers/_controller.js');

router.get('/Dreamcatcher', todos_controller.get_dreamcatcher);

router.get('/Lab13', todos_controller.get_lab13);


router.get('/PreguntaTarea',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio11.html'));
});

router.get('/Lab17',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio17.html'));
});

router.get('/Lab18',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio18.html'));
});

router.get('/Lab19',(request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio19.html'));
});

router.use('/SKZ',(request, response, next) => {
    console.log(request.body);
    response.send("Holiwis desde una ruta /SKZ")
});

router.use('/Ateez',(request, response, next) => {
    console.log(request.body);
    response.send("Halazia Hala Hala Halazia /ateez")
});

router.get('/formulario', todos_controller.formulario);

router.post('/guardar-datos', todos_controller.post);

module.exports = router;