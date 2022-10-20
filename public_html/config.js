let currentPlayer
let totalPieces
let piecesColumn = []
let nimSum = []
let nCompMove
let col
let countWinPC = 0
let countWinP1 = 0
let countLosePC = 0
let countLoseP1 = 0

let userData = [
	{ utilizador: "Player1", Wins: countWinP1, Loses: countLoseP1 },
	{ utilizador: "Computador", Wins: countWinP1, Loses: countLoseP1 }
]

function setGame() {
	const board = document.getElementById("board")

	for (let i = 0; i < col; i++) {
		const column = document.createElement("div")
		column.className = "column"
		board.appendChild(column)
		for (let j = 0; j < piecesColumn[i]; j++) {
			const piece = document.createElement("div")
			if (currentPlayer == 1) {
				pieceOut(piece, i)
			}
			piece.className = "piece"
			column.appendChild(piece)
      
		}
	}
}

function appearBoard() {
	let b = document.getElementById("board")

	if (b.style.display === "none") {
		let selId = document.getElementById("size")
		col = parseInt(selId.options[selId.selectedIndex].value)

		const dif_id = document.getElementById("difficulty")
		let dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value)

		let c = col
		totalPieces = 0
		for (let i = 0; i < col; i++, c--) {
			piecesColumn[i] = c
			totalPieces += c
		}
		board.style.display = "flex"

		nCompMove = 0

		let radioPush = document.querySelector("input[name=radio1]:checked").value

		if (radioPush == "r1") {
			human()
			setGame()
		} else {
			computerAction()
		}
	}
	const c = document.getElementById("center")
	c.style.display = "none"
}

function disappearBoard() {
	let b = document.getElementById("board")
	while (b.firstChild) {
		b.removeChild(b.firstChild)
	}
	board.style.display = "none"

	const c = document.getElementById("center")
	c.style.display = "block"
}

function toggleText() {
	let text = document.getElementById("rules")
	if (text.style.display === "none") {
		text.style.display = "block"
	} else {
		text.style.display = "none"
	}
}

document.addEventListener("DOMContentLoaded", function () {
	let input = document.getElementById("size")
	if (localStorage["size"]) {
		// if size is set
		input.value = localStorage["size"] // set the value
	}
	input.onchange = function () {
		localStorage["size"] = this.value // change localStorage on change
	}
})

// NOVO

function pieceOut(elem, index) {
	elem.addEventListener("click", function handleClick(event) {
		if (!elem.previousElementSibling) {
			piecesColumn[index]--
			totalPieces--
			//console.log("REMOVEU-SE UMA PEÇA DA COLUNA" + index + " ---- FICA:" + piecesColumn[index]);
			event.target.remove()
		} else {
			removeAllBefore(elem, index)
			event.target.remove()
			piecesColumn[index]--
			totalPieces--
		}
	})
}

//removeAllBefore(document.getElementById('removeAbove'));

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
function computerAction() {
	const userDataStats = userData[0]
	const computerDataStats = userData[1]

	computer()
	if (totalPieces == 0) {
		console.log("Jogador ganhou")
		alert("Parabéns! Ganhou")
		computerDataStats.Loses++
		userDataStats.Wins++
		disappearBoard()
	} else {
		nCompMove++
		//TIRAR ESTADO DE TABULERIO CORRENTE
		let b = document.getElementById("board")
		while (b.firstChild) {
			b.removeChild(b.firstChild)
		}

		const dif_id = document.getElementById("difficulty")
		let dif_value = parseInt(dif_id.options[dif_id.selectedIndex].value)

		//console.log("TOTAL DE PEÇAS" + totalPieces);

		if (dif_value == 1) {
			moveComputer1()
		} else if (dif_value == 2) {
			moveComputer2()
		} else {
			moveComputer3()
		}

		if (totalPieces == 0) {
			console.log("Computador ganhou")
			alert("Perdeu... Tente novamente")
			computerDataStats.Wins++
			userDataStats.Loses++
			disappearBoard()
		} else {
			humanAction()
		}
	}
	loadTableData([userDataStats, computerDataStats])
}
function moveComputer1() {
	let index = Math.floor(Math.random() * col)
	while (piecesColumn[index] == 0) {
		index = Math.floor(Math.random() * col)
	}

	let pieces = Math.floor(Math.random() * piecesColumn[index])

	//console.log("ESCOLHEU COLUNA " + index + " FICA COM " + pieces + "PEÇAS");

	totalPieces -= piecesColumn[index] - pieces
	piecesColumn[index] = pieces
}

function moveComputer2() {
	//console.log("JOGADA NUMERO: " + nCompMove);
	if (nCompMove % 2 == 0) moveComputer3()
	else moveComputer1()
}

function moveComputer3() {
	let totalNimSum = 0

	for (let i = 0; i < col; i++) {
		totalNimSum = totalNimSum ^ piecesColumn[i]
	}

	//console.log(totalNimSum);

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

  document.getElementById("tabelaClass").classList.toggle("hidden");

}