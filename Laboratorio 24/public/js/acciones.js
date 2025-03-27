const accionAsincrona = () => {
    const mensaje = document.getElementById('mensaje').value;

    fetch('/ruta/asincrona', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensaje: mensaje }) 
    })
    .then(result => result.json())
    .then(data => {
        document.getElementById('respuesta').innerText = data.message + ": " + data.datos.mensaje;
    })
    .catch(err => {
        console.log(err);
    });
};

document.getElementById('mi_boton').addEventListener('click', accionAsincrona);
