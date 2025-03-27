const path = require('path');

exports.getFormulario = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

exports.postArchivo = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ningún archivo o el formato no es válido.' });
    }

    const ruta_archivo = req.file.path;
    res.json({ message: 'Archivo subido con éxito', ruta: ruta_archivo });
};


exports.accionAsincrona = (req, res) => {
    console.log("Datos recibidos:", req.body);
    
    res.status(200).json({ message: "Respuesta asíncrona recibida", datos: req.body });
};
