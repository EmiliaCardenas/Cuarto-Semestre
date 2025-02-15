class Choreography {
    constructor(song, group, difficulty) {
        this.song = song;
        this.group = group;
        this.difficulty = difficulty;
    }

    getDetails() {
        return `Coreografía: ${this.song} - Grupo: ${this.group} - Dificultad: ${this.difficulty}`;
    }

    static displayChoreographies(choreographies) {
        let output = "<h2>Lista de Coreografías</h2><ul>";
        choreographies.forEach(choreo => {
            output += `<li>${choreo.getDetails()}</li>`;
        });
        output += "</ul>";
        document.getElementById("result").innerHTML = output;
    }
}

const choreographies = [
    new Choreography("Love Dive", "IVE", "Intermedio"),
    new Choreography("God's Menu", "Stray Kids", "Avanzado"),
    new Choreography("Dynamite", "BTS", "Principiante")
];

function addChoreography() {
    const song = prompt("Ingrese el nombre de la canción:");
    const group = prompt("Ingrese el nombre del grupo:");
    const difficulty = prompt("Ingrese el nivel de dificultad (Principiante, Intermedio, Avanzado):");

    if (song && group && difficulty) {
        const newChoreo = new Choreography(song, group, difficulty);
        choreographies.push(newChoreo);
        Choreography.displayChoreographies(choreographies);
    } else {
        alert("Debe completar todos los campos");
    }
}

window.onload = () => {
    Choreography.displayChoreographies(choreographies);
};
