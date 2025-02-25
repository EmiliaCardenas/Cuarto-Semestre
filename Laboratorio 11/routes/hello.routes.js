const express = require('express');

const router = express.Router();

//Solo en la ruta SKZ
router.use('/SKZ',(request, response, next) => {
    console.log(request.body);
    response.send("Holiwis desde una ruta /SKZ")
});

module.exports = router;