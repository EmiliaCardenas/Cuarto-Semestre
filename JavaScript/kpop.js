class Choreography {
    constructor(song, group) {
        this.song = song;
        this.group = group;
    }

    getDetails() {
        return `${this.song} - ${this.group}`;
    }

    static displayChoreographies(coreos) {
        let output = "<h2>Lista de Coreografías</h2><ul>";
        coreos.forEach(entrada => {
            output += `<li>${entrada.getDetails()}</li>`;
        });
        output += "</ul>";
        document.getElementById("result").innerHTML = output;
    }
}

const coreos = [
    new Choreography("Love Dive", "IVE"),
    new Choreography("God's Menu", "Stray Kids"),
    new Choreography("Dynamite", "BTS")
];

function addChoreography() {
    const song = prompt("Pon el nombre de la canción:");
    const group = prompt("Pon el nombre del grupo:");

    if (song && group) {
        const newChoreo = new Choreography(song, group);
        coreos.push(newChoreo);
        Choreography.displayChoreographies(coreos);
    } else {
        alert("Completa todo");
    }
}

window.onload = () => {
    Choreography.displayChoreographies(coreos);
};
