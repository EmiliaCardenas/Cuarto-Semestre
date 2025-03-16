const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'kpop_db',
    password: 'el_password_de_tu_usuario_de_la_bd'
});

const db = require('./kpop_db.sql');

db.execute('SELECT * FROM idols')
    .then(([rows, fieldData]) => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
    });

exports.getIdols = (request, response, next) => {
    Idol.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('vista', {
                idols: rows
            });
        })
        .catch(err => console.log(err));
};

exports.insertarIdol = (request, response, next) => {
    const idol = new Idol(request.body.nombre, request.body.grupo);
    idol.save().then(() => {
        response.redirect('/');
    }).catch(err => console.log(err));
};

module.exports = class Idol {
    constructor(nombre, grupo) {
        this.nombre = nombre;
        this.grupo = grupo;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM idols');
    }

    save() {
        return db.execute('INSERT INTO idols (nombre, grupo) VALUES (?, ?)', 
            [this.nombre, this.grupo]
        );
    }
};

module.exports = pool.promise();
