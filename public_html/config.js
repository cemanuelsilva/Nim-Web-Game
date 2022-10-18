var currentPlayer;
var totalPieces;
var piecesColumn = [];
var nCompMove;
var col;


function  setGame(){

  console.log(currentPlayer);


  const board = document.getElementById('board');

  for(let i=0; i<col;i++) {
    const column = document.createElement('div');
    column.className = 'column';
    board.appendChild(column);
    for(let j=0; j<piecesColumn[i]; j++) {
      const piece = document.createElement('div');
      if(currentPlayer == 1) {
        pieceOut(piece,i);
      }
      piece.className = 'piece';
      column.appendChild(piece);
    }
  }

  if(currentPlayer == 2) {
    humanAction();
  }
}


function appearBoard() {
  var b = document.getElementById('board');

  if (b.style.display === "none") {
      var selId = document.getElementById('size');
      col = parseInt(selId.options[selId.selectedIndex].value);

      const dif_id = document.getElementById('difficulty');
      let dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value);

      let c = col;
      for(let i=0; i<col; i++, c--) {piecesColumn[i] = c; totalPieces+=c;}
      board.style.display = "flex";

      var radioPush = document.querySelector('input[name=radio1]:checked').value;

      if(radioPush == "r1") {
          human();
          setGame();
      }
      else {
          computerAction();
        }
  }
  const c = document.getElementById('center');
  c.style.display="none";
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

function pieceOut(elem, index){


  elem.addEventListener('click', function handleClick(event) {
    if(!(elem.previousElementSibling)){
      piecesColumn[index]--;
      //console.log("REMOVEU-SE UMA PEÇA DA COLUNA" + index + " ---- FICA:" + piecesColumn[index]);
      event.target.remove();

    }
    else{
    removeAllBefore(elem, index);
    event.target.remove();
    piecesColumn[index]--;
    }
  });
}

//removeAllBefore(document.getElementById('removeAbove'));

function removeAllBefore(el,index)
{
  var prevEl;
  prevEl = el.previousElementSibling;
  while (prevEl) {
    piecesColumn[index]--;
    prevEl.parentNode.removeChild(prevEl);
    prevEl = el.previousElementSibling
 }
}


function humanAction() {
  human();
  let b = document.getElementById('board');
  while(b.firstChild) {
    b.removeChild(b.firstChild);
  }
  setGame();
}


function computerAction()  {

  computer();
  nCompMove++;
  //TIRAR ESTADO DE TABULERIO CORRENTE
  let b = document.getElementById('board');
  while(b.firstChild) {
    b.removeChild(b.firstChild);
  }

  const dif_id = document.getElementById('difficulty');
  let dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value);

  totalPieces = 0;
  for(let i=0; i<col; i++)
    totalPieces += piecesColumn[i];


  if(dif_value==1) {
    moveComputer1();
  }
  else if(dif_value==2) {
    moveComputer2();
  }
  else {
    moveComputer3();
  }
  setGame();
}


function moveComputer1() {


}

function moveComputer2() {


}

function moveComputer3() {


}

function human() {
  currentPlayer = 1;
}

function computer() {
  currentPlayer = 2;
}


window.onload = function() {

}
