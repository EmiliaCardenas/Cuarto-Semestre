
const http = require('http');
const fs = require('fs');
const funciones = require('./funciones');


const servidor = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(__dirname + '/pagina.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.url === '/bubbleSort') {
        const arrayDesordenado = [5, 3, 8, 7, 1, 4];
        const arrayOrdenado = funciones.bubbleSort(arrayDesordenado);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Array ordenado: ${arrayOrdenado.join(', ')}`);
    } else if (req.url === '/promedio') {
        const arrayNumeros = [10, 20, 30, 40, 50];
        const promedioValor = funciones.promedio(arrayNumeros);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Promedio: ${promedioValor}`);
    } else if (req.url === '/escribir-archivo') {
        const contenido = 'Este es un mensaje desde la función escribirArchivo';
        funciones.escribirArchivo('mensaje.txt', contenido);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Archivo escrito con éxito.');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});


servidor.listen(4000, () => {
    console.log('Servidor ejecutándose en http://localhost:4000');
});
