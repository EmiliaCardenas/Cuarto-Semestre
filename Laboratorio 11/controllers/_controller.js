const path = require('path');
const fs = require('fs');

exports.get_dreamcatcher = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'uwu.html'));
};

exports.formulario = (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'formulario.html'));
};

exports.get_lab13 = (request, response) => {
    response.sendFile(path.join(__dirname, '..', 'laboratorio13.html'));
};

exports.post = (request, response) => {
    const { nombre, mensaje } = request.body;

    if (!nombre || !mensaje) {
        return response.status(400).send("Faltan datos");
    }

    const data = `Nombre: ${nombre}\nMensaje: ${mensaje}\n---\n`;

    fs.appendFile('datos.txt', data, (err) => {
        if (err) {
            return response.status(500).send("Error al guardar los datos");
        }
        response.send("Datos guardados correctamente");
    });
};
