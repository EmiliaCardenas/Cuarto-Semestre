const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multerConfig = require('./middlewares/multerConfig');
const archivoRoutes = require('./routes/archivoRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multerConfig);

// Hacer la carpeta "uploads" accesible públicamente
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(archivoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
