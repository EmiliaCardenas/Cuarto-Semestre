const fs = require('fs');
const path = require('path');

module.exports = class Kpop {
    constructor(nombre) {
        this.attribute_1 = nombre;
    }

    save() {
        const filePath = path.resolve(__dirname, 'datos.json');
        let data = [];

        if (fs.existsSync(filePath)) {
            try {
                const fileData = fs.readFileSync(filePath, 'utf8');
                data = fileData ? JSON.parse(fileData) : [];
            } catch (error) {
                console.error('Error al leer el archivo:', error);
                data = []; 
            }
        }

        data.push({ nombre: this.attribute_1 });

        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    static fetchAll() {
        const filePath = path.resolve(__dirname, 'datos.json');
        if (!fs.existsSync(filePath)) {
            return [];
        }

        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            return fileData ? JSON.parse(fileData) : [];
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            return [];
        }
    }
};
