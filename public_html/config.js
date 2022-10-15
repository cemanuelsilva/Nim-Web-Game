
function  setGame(){
  var selId = document.getElementById('size');

  let col = parseInt(selId.options[selId.selectedIndex].value);

  const board = document.getElementById('board');

  for(let i=0, c=col; i<col;i++,c--) {
    const column = document.createElement('div');
    column.className = 'column';
    board.appendChild(column);
    for(let j=0; j<c; j++) {
      const piece = document.createElement('div');
      piece.className = 'piece';
      column.appendChild(piece);
    }
  }
}

function appearBoard() {
  var b = document.getElementById('board');
  if (b.style.display === "none") {
      board.style.display = "flex";
      setGame();
  }
}

function disappearBoard() {
  var b = document.getElementById('board');
  while(b.firstChild) {
    b.removeChild(b.firstChild);
  }
  board.style.display="none";
}

function toggleText() {
  var text = document.getElementById("rules");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
  text.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function () {
 var input = document.getElementById('size');
 if (localStorage['size']) { // if size is set
     input.value = localStorage['size']; // set the value
 }
 input.onchange = function () {
      localStorage['size'] = this.value; // change localStorage on change
  }
})


window.onload = function() {

}
