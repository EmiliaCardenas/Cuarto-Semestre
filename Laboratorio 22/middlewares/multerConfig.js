const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de archivos
const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        callback(null, timestamp + '-' + file.originalname);
    },
});

// Filtrar tipos de archivos permitidos
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

// Configuración de Multer
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = upload.single('archivo');
