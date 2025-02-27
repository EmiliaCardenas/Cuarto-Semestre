const express = require('express');
const app = express();

const path = requite('path');

path.use(express.static(path.join(__dirname,'Public')));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

const rutasIdols = require('./routes/hello.routes');

app.use('/idols', rutasIdols);

app.use((request, response, next) => {
    console.log('Otro middleware!');
    response.send('¡Hola mundo!'); //Manda la respuesta
});

app.listen(3000);