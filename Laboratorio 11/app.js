const express = require('express');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');

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

app.use((request, response) => {
    res.status(404).send("404 - Página no encontrada");
});

app.listen(3000);