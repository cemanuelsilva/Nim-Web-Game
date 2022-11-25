let currentPlayer                // Jogador atual
let totalPieces                  // Numero atual de pecas no tabuleiro
let piecesColumn = []            // Array que guarda o numero de pecas por coluna/pilha
let nCompMove = 0                // Numero de jogadas realizadas pelo computador
let nHumanMove = 0               // Numero de jogadas realizadas pelo jogador
let col                          // Tamanho do tabuleiro selecionado
let dif_value                    // Nivel de dificuldade selecionado
let countWinPC = 0               // Valores para a tabela de Classificacoes
let countWinP1 = 0

let initGame = false             // True se o botao "Iniciar Jogo" foi pressionado


let userData = [
	{ utilizador: "Jogador", Wins: countWinP1, Loses: countWinPC },
	{ utilizador: "Computador", Wins: countWinPC, Loses: countWinP1 }
]


let host = "twserver.alunos.dcc.fc.up.pt";
let port = "8008";
let group = 18;
let user;
let pass;


function register() {
	user = document.getElementById('id').value
	password = document.getElementById('pass').value
	const login = "http://"+host+":" + port + "/register";

	fetch(login, {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			nick: user,
			password: password,
		}),
	})
	.then(function(response) {
		if(user=="" || password=="") 
			console.log("Missing username or password");
		else {
			response.text().then(console.log);
		}
	})
	 .catch(error.Log)
};

function join() {
	const url = "http://"+host+":" + port + "/join";
	fetch(url, {
		method: "POST",
        headers: { 
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
            group: group,
			nick: user,
			password: password,
			size: col
		})
	})
	.then(function(response) {
		response.text().then(console.log);
		// Obter o valor de game
		// pedido sse update com nick=user e game=game 
	})
	 .catch(console.log)
};

// Funcao que permite a visualizacao do estado corrente do jogo
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

// Funcao para inicializar o jogo
function appearBoard() {

	let b = document.getElementById("board")
	var radioPush2 = document.querySelector('input[name=radio2]:checked').value;

	let selId = document.getElementById("size")
	col = parseInt(selId.options[selId.selectedIndex].value)
	if(radioPush2 == "computador") {

		if (b.style.display === "none") {

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
				human()
				setGame()
		} else {
				setGame();
				computerAction();
			}
		}
	} else {
		join();
	}
}

function disappearBoard() {
	let b = document.getElementById("board")
	while (b.firstChild) {
		b.removeChild(b.firstChild)
	}
	board.style.display = "none"
}

function pieceOut(elem, index) {
	elem.addEventListener("click", function handleClick(event) {
		if(!didMove) {                                  // Feita uma jogada, nao permitir jogar logo de seguida
			if (!elem.previousElementSibling) {
				piecesColumn[index]--
				totalPieces--
				event.target.remove()
				nHumanMove++
			} else {
				removeAllBefore(elem, index)
				event.target.remove()
				nHumanMove++
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
		updateUserWins(userDataStats,computerDataStats);
		disappearBoard()
		loadTableData([userDataStats, computerDataStats])
	} else if (totalPieces>0) {

			let b = document.getElementById("board")
			while (b.firstChild) {
				b.removeChild(b.firstChild)
			}

			if (dif_value == 1) {
				moveComputer1()
			} else if (dif_value == 2) {
				moveComputer2()
			} else
				moveComputer3()

			nCompMove++

			if (totalPieces == 0) {
				console.log("Computador ganhou")
				alert("Perdeu... Tente novamente")
				initGame = false
				updateComputerWins(userDataStats,computerDataStats)
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
		moveComputer1()
	} else
		moveComputer3()
}

function moveComputer3() {
	let totalNimSum = 0
	let i

	for (i = 0; i < col; i++) {
		totalNimSum = totalNimSum ^ piecesColumn[i]
	}

	let result = 0
	for (i = 0; i < col; i++) {
		result = piecesColumn[i] ^ totalNimSum
		if (result < piecesColumn[i]) {
			totalPieces -= piecesColumn[i] - result
			piecesColumn[i] = result
			break
		}
	}
	if(i==col)
		moveComputer1()
}

function human() {
	currentPlayer = 1
}

function computer() {
	currentPlayer = 2
}

window.onload = () => {
	initialUpdate();
	loadTableData(userData)
}

//Atualizar tabela de classificacoes ao recarregar a página
function initialUpdate() {
	const userDataStats = userData[0]
	const computerDataStats = userData[1]

	if(typeof(Storage) !== "undefined") {
		if(localStorage.UserWins && localStorage.ComputerWins) {
			computerDataStats.Loses=localStorage.UserWins
			userDataStats.Wins=localStorage.UserWins
			computerDataStats.Wins=localStorage.ComputerWins
			userDataStats.Loses=localStorage.ComputerWins
  	} else {
			localStorage.UserWins=0
			localStorage.ComputerWins=0
	}
		loadTableData([userDataStats, computerDataStats])
  } else
	    console.log("nao suportado")
}

function quitGame() {
	const userDataStats = userData[0]
	const computerDataStats = userData[1]
	if(initGame) {
		alert("Desistiu do jogo... Perdeu")
		updateComputerWins(userDataStats,computerDataStats)
		loadTableData([userDataStats, computerDataStats])
		disappearBoard()
		initGame = false
	}
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

//Atualizar tabela de classificacoes quando o jogador ganha
function updateUserWins(userDataStats, computerDataStats) {

	if(localStorage.UserWins) {
		localStorage.UserWins=
			Number(localStorage.UserWins)+1
		computerDataStats.Loses=localStorage.UserWins
		userDataStats.Wins=localStorage.UserWins
	}
}

//Atualizar a tabela de classificacoes quando o computador ganha
function updateComputerWins(userDataStats, computerDataStats) {

	if(localStorage.ComputerWins) {
		localStorage.ComputerWins=
			Number(localStorage.ComputerWins)+1
		computerDataStats.Wins=localStorage.ComputerWins
		userDataStats.Loses=localStorage.ComputerWins
		}
}
// Get the modal
const modal = document.getElementById("modal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


function appearCompOptions() {
	const firstPlay = document.getElementById("firstPlay");
	const diffChoice = document.getElementById("diffChoice");
	firstPlay.style.display = "inline-flex";
	diffChoice.style.display = "inline-flex";

}

function appearPlayersOptions() {
	const firstPlay = document.getElementById("firstPlay");
	firstPlay.style.display = "none";
	diffChoice.style.display = "none";

}


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
