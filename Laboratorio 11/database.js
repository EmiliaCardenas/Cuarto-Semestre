const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'database_name',
    password: 'el_password_de_tu_usuario_de_la_bd'
});

const db = require('./util/database');

db.execute('Consulta SQL por ejemplo: SELECT * FROM mi_tabla');

db.execute('SELECT * FROM videojuegos')
.then(([rows, fieldData]) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
});

exports.getVideojuegos = (request, response, next) => {
    Videojuegos.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('vista', {
                videojuegos: rows
            })
        })
        .catch(err => console.log(err));
}

exports.insertarVideojuego = (request, response, next) => {
    const videojuego = new Videojuego(request.body.nombre, request.body.plataforma);
    videojuego.save().then(() => {
        response.redirect('/');
    }).catch(err => console.log(err));
};
    

module.exports = class Videojuego{
    static fetchAll() {
        return db.execute('SELECT * FROM videojuegos');
    }

    save() {
        return db.execute('INSERT INTO videojuegos (nombre_columna_1, nombre_columna_2) VALUES (?, ?)',
            [this.variable_valor_1, this.variable_valor_2]
        );
    
    }
}


module.exports = pool.promise();