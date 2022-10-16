
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
        startHuman(piece);
      }
      else{
        startComputer(piece);
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
  const c = document.getElementById('center');
  c.style.display="none"
}

function disappearBoard() {
  var b = document.getElementById('board');
  while(b.firstChild) {
    b.removeChild(b.firstChild);
  }
  board.style.display="none";
  const c = document.getElementById('center');
  c.style.display="block"
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
  pieceOut(elem);
  computer();
}
  else{
    console.log(currentPlayer);
    pieceOut(elem);
    human(elem);
  }
}

function pieceOut(elem){

  elem.addEventListener('click', function handleClick(event) {
    if(!(elem.previousElementSibling)){
      event.target.remove();
    }
    else{
    removeAllBefore(elem);
    event.target.remove();
    }
  });

}

removeAllBefore(document.getElementById('removeAbove'));
function removeAllBefore(el)
{
  var prevEl;
  while (prevEl = el.previousElementSibling)
    prevEl.parentNode.removeChild(prevEl);
}

function startHuman(elem) {

  human();
  playerAction(elem);

}

function startComputer(elem){

  computer();
  //playerAction(elem);

}



function computerAction()  {
  const dif_id = document.getElementById('difficulty');
  let dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value);

  console.log(dif_value);

/*
  if(dif_value == 1)
    moveComputer1();
  else if(dif_value == 2)
    moveComputer2();
  else
    moveComputer3();

*/
}

function computer() {

	currentPlayer = 2;

}

function human() {

  currentPlayer = 1;
}

window.onload = function() {

}
