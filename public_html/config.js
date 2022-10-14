class Nim {
    constructor(id) {
        this.content = new Array(col);
        this.column = new Array(col);
        // ++++++
    }
}

constructor(id){

    const parent = document.getElemenyById(id)
    const column = document.createElement('div')

    board.Nim = 'board';
    parent.appendChild(column); 
}

constructor(id) {
    for(let i=0; i < col; i++){
        let piece = document.createElement("div");
        piece.Nim = "cell";
        column.appendChild(piece);

        piece.onclick = () => this.play(i);

        this.column[i] = piece;
    }
}

// play(pos){
//     this.content[pos] = this.current

// }

window.onload = function() {
    const counter = new Nim("Base");
}

