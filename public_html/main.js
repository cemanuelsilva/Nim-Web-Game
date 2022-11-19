let currentPlayer                // Jogador atual
let totalPieces                  // Número atual de peças no tabuleiro
let piecesColumn = []            // Array que guarda o número de peças por coluna/pilha
let nCompMove = 0                // Número de jogadas realizadas pelo computador
let nHumanMove = 0               // Número de jogadas realizadas pelo jogador
let col                          // Tamanho do tabuleiro selecionado
let dif_value                    // Nível de dificuldade selecionado
let countWinPC = 0               // Valores para a tabela de Classificações
let countWinP1 = 0
let countLosePC = 0
let countLoseP1 = 0
let initGame = false             // True se o botão "Iniciar Jogo" foi pressionado


let userData = [
	{ utilizador: "Jogador", Wins: countWinP1, Loses: countLoseP1 },
	{ utilizador: "Computador", Wins: countWinP1, Loses: countLoseP1 }
]

// Função que permite a visualização do estado corrente do jogo
function setGame() {
	const board = document.getElementById("board")
	didMove = false

	for (let i = 0; i < col; i++) {
		const column = document.createElement("div")
		column.className = "column"
		board.appendChild(column)
		for (let j = 0; j < piecesColumn[i]; j++) {
			const piece = document.createElement("div")
			pieceOut(piece, i)
			piece.className = "piece"
			column.appendChild(piece)
		}
	}
}


// Função para inicializar o jogo
function appearBoard() {

	let b = document.getElementById("board")

	if (b.style.display === "none") {
		let selId = document.getElementById("size")
		col = parseInt(selId.options[selId.selectedIndex].value)

		const dif_id = document.getElementById("difficulty")
	  dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value)

		let c = col
		totalPieces = 0
		for (let i = 0; i < col; i++, c--) {
			piecesColumn[i] = c
			totalPieces += c
		}

		board.style.display = "flex"
		var radioPush = document.querySelector('input[name=radio1]:checked').value;

		nCompMove = 0
		nHumanMove = 0
		initGame = true
		if(radioPush == "r1") {
          human();
          setGame();
      }
      else {
				  setGame();
          computerAction();
        }
	}
}


function quitGame() {
	const userDataStats = userData[0]
	const computerDataStats = userData[1]
	if(initGame) {
		alert("Desistiu do jogo... Perdeu")
		computerDataStats.Wins++
		userDataStats.Loses++
		loadTableData([userDataStats, computerDataStats])
		disappearBoard()
		initGame = false
	}
}



function disappearBoard() {
	let b = document.getElementById("board")
	while (b.firstChild) {
		b.removeChild(b.firstChild)
	}
	board.style.display = "none"
}

function toggleText() {
	let text = document.getElementById("rules")
	if (text.style.display === "none") {
		text.style.display = "block"
	} else {
		text.style.display = "none"
	}
}


function pieceOut(elem, index) {
	elem.addEventListener("click", function handleClick(event) {
		if(!didMove) {                                  // Feita uma jogada, não permitir jogar logo de seguida
			if (!elem.previousElementSibling) {
				piecesColumn[index]--
				totalPieces--
				event.target.remove()
				justClicked=false
				nHumanMove++
			} else {
				removeAllBefore(elem, index)
				event.target.remove()
				nHumanMove++
				justClicked=false
				piecesColumn[index]--
				totalPieces--

				}
				didMove=true
				computerAction()
			} else {
				alert("Jogada Inválida")
			}
	})
}


function removeAllBefore(el, index) {
	let prevEl
	prevEl = el.previousElementSibling
	while (prevEl) {
		piecesColumn[index]--
		totalPieces--
		prevEl.parentNode.removeChild(prevEl)
		prevEl = el.previousElementSibling
	}
}

function humanAction() {
	human()
	setGame()
}

async function computerAction() {
	const userDataStats = userData[0]
	const computerDataStats = userData[1]

  await new Promise(r => setTimeout(r, 250))


		if (totalPieces == 0) {
			initGame = false
			console.log("Jogador ganhou")
			alert("Parabéns! Ganhou")
			computerDataStats.Loses++
			userDataStats.Wins++
			disappearBoard()
			loadTableData([userDataStats, computerDataStats])

		} else if (totalPieces>0){

				let b = document.getElementById("board")
				while (b.firstChild) {
					b.removeChild(b.firstChild)
				}

				if (dif_value == 1) {
					moveComputer1()
				} else if (dif_value == 2) {
					moveComputer2()
				} else {
					moveComputer3()
				}

				nCompMove++

				if (totalPieces == 0) {
					console.log("Computador ganhou")
					alert("Perdeu... Tente novamente")
					initGame = false
					computerDataStats.Wins++
					userDataStats.Loses++
					disappearBoard()
					loadTableData([userDataStats, computerDataStats])

				} else
						humanAction()
		}
}

function moveComputer1() {
	let index = Math.floor(Math.random() * col)

	while (piecesColumn[index] == 0) {
		index = Math.floor(Math.random() * col)
	}

	let pieces = Math.floor(Math.random() * piecesColumn[index])

	totalPieces -= piecesColumn[index] - pieces
	piecesColumn[index] = pieces
}


function moveComputer2() {

	if (nCompMove % 2 == 0) {
		moveComputer3()
	} else
		moveComputer1()
}

function moveComputer3() {
	let totalNimSum = 0

	for (let i = 0; i < col; i++) {
		totalNimSum = totalNimSum ^ piecesColumn[i]
	}

	let result = 0
	for (let i = 0; i < col; i++) {
		result = piecesColumn[i] ^ totalNimSum
		if (result < piecesColumn[i]) {
			totalPieces -= piecesColumn[i] - result
			piecesColumn[i] = result
			break
		}
	}
}

function human() {
	currentPlayer = 1
}

function computer() {
	currentPlayer = 2
}

window.onload = () => {
	loadTableData(userData)
}

function loadTableData(userData) {
	const tableBody = document.getElementById("tableData")
	let dataHtml = ""

	for (let person of userData) {
		dataHtml += `<tr><td>${person.utilizador}</td><td>${person.Wins}</td><td>${person.Loses}</td></tr>`
	}
	console.log(dataHtml)

	tableBody.innerHTML = dataHtml
}

function toggleTable() {

  document.getElementById("tableClass").classList.toggle("hidden")
}

// Get the modal
var modal = document.getElementById("modal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}