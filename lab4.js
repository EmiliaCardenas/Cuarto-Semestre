console.log("Stray kids everywhere all around the world");

//Problema 1
let num = parseInt(prompt("Pon un número:"));
let tabla = '<table border="1"><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>';
for (let i = 1; i <= num; i++) {
    tabla += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
}
tabla += '</table>';
document.write(tabla);

//Problema 2
let a = Math.floor(Math.random() * 100);
let b = Math.floor(Math.random() * 100);
let inicio = Date.now();
let respuesta = parseInt(prompt(`Cuánto es ${a} + ${b}?`));
let fin = Date.now();
let tiempo = (fin - inicio) / 1000;
document.write(`<p>Respuesta ${respuesta === (a + b) ? 'Correcta :)' : 'Incorrecta :('}. Tiempo: ${tiempo} segundos.</p>`);

// Problema 3: 
function contador(arr) {
    let negativos = arr.filter(x => x < 0).length;
    let ceros = arr.filter(x => x === 0).length;
    let positivos = arr.filter(x => x > 0).length;
    return { negativos, ceros, positivos };
}
console.assert(JSON.stringify(contador([-2, -1, 0, 1, 2])) === JSON.stringify({negativos: 2, ceros: 1, positivos: 2}), "Error");

// Problema 4: 
function promedios(matriz) {
    return matriz.map(fila => fila.reduce((a, b) => a + b, 0) / fila.length);
}
console.assert(JSON.stringify(promedios([[1, 2, 3], [4, 5, 6]])) === JSON.stringify([2, 5]), "Error");

//Problema 5
function inverso(numero) {
    return parseInt(numero.toString().split('').reverse().join(''));
}
console.assert(inverso(1234) === 4321, "Error");


