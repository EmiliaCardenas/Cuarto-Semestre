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

router.use('/SKZ',(request, response, next) => {
    console.log(request.body);
    response.send("Holiwis desde una ruta /SKZ")
});

module.exports = router;