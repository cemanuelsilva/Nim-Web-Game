
function  setGame(){
  var selId = document.getElementById('size');
  let col = parseInt(selId.options[selId.selectedIndex].value);
  var radioPush = document.querySelector('input[name=radio1]:checked').value;
  const board = document.getElementById('board');

  for(let i=0, c=col; i<col;i++,c--) {
    const column = document.createElement('div');
    column.className = 'column';
    board.appendChild(column);
    for(let j=0; j<c; j++) {
      const piece = document.createElement('div');
      if(radioPush == "r1"){
        startHuman();
        playerAction(piece);
      }
      else{
        startComputer();
        playerAction(piece);
      }
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


// NOVO

var currentPlayer;

function playerAction(elem){

  if(currentPlayer == 1){ 
  console.log(currentPlayer);
  elem.addEventListener('click', function handleClick(event) {
    event.target.remove();
  });
  currentPlayer = 2;
}
  else{
    console.log(currentPlayer);
  elem.addEventListener('click', function handleClick(event) {
    event.target.remove();
  });
  currentPlayer = 1;
  }
}


function startHuman() {
	
  currentPlayer = 1;
  appearBoard();
	human();
}

function startComputer(){
  
  currentPlayer = 2;
  appearBoard();
  computer();
}


function computer() {
	
	currentPlayer = 2;
	
}

function human() {


	
	currentPlayer = 1;
}

window.onload = function() {

}
