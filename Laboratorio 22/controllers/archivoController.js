const path = require('path');

exports.getFormulario = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.postArchivo = (req, res) => {
    if (!req.file) {
        return res.status(400).send('Error: No se ha subido ningún archivo o el formato no es válido.');
    }

    const ruta_archivo = req.file.path;
    res.send(`Archivo subido con éxito. Ruta: ${ruta_archivo}`);
};
