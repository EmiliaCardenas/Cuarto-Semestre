function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

const fs = require('fs');
function escribirArchivo(nombreArchivo, contenido) {
    fs.writeFileSync(nombreArchivo, contenido, 'utf-8');
    console.log(`Archivo '${nombreArchivo}' creado con éxito.`);
}

escribirArchivo('mensaje.txt', 'Hola, este es un mensaje escrito desde Node.js');



function promedio(arr) {
    if (arr.length === 0) return 0;
    const suma = arr.reduce((acc, num) => acc + num, 0); 
    return suma / arr.length; 
}


module.exports = {
    bubbleSort,
    promedio,
    escribirArchivo
};