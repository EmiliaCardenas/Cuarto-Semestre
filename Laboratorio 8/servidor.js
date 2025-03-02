
const http = require('http');
const fs = require('fs');
const funciones = require('./funciones');


const servidor = http.createServer((req, res) => {
    if (req.method === 'GET') {
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
        } else if (req.url === '/formulario') {
            // Muestra un formulario para enviar datos por POST
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <body>
                        <h1>Enviar datos al servidor</h1>
                        <form action="/guardar-datos" method="post">
                            <label for="nombre">Nombre:</label>
                            <input type="text" id="nombre" name="nombre" required><br><br>
                            <label for="mensaje">Mensaje:</label>
                            <textarea id="mensaje" name="mensaje" required></textarea><br><br>
                            <button type="submit">Enviar</button>
                        </form>
                    </body>
                </html>
            `);
        } else if (req.url === '/escribir-archivo') {
            const contenido = 'Este es un mensaje desde la función escribirArchivo';
            funciones.escribirArchivo('mensaje.txt', contenido);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Archivo escrito con éxito.');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Página no encontrada');
        }
    } else if (req.method === 'POST' && req.url === '/guardar-datos') {
        // Recibe los datos enviados por POST y los guarda en un archivo
        let cuerpo = '';
        req.on('data', (chunk) => {
            cuerpo += chunk;
        });

        req.on('end', () => {
            const datos = new URLSearchParams(cuerpo);
            const nombre = datos.get('nombre');
            const mensaje = datos.get('mensaje');

            if (nombre && mensaje) {
                const contenido = `Nombre: ${nombre}\nMensaje: ${mensaje}\n\n`;
                fs.appendFile(__dirname + '/datos.txt', contenido, (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error al guardar los datos');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Datos guardados con éxito');
                    }
                });
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Faltan datos en el formulario');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});


servidor.listen(4000, () => {
    console.log('Servidor ejecutándose en http://localhost:4000');
});
