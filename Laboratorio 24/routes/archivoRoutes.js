const express = require('express');
const archivoController = require('../controllers/archivoController');

const router = express.Router();

router.post('/archivo', archivoController.postArchivo);
router.get('/', archivoController.getFormulario);
router.post('/ruta/asincrona', archivoController.accionAsincrona);

module.exports = router;
