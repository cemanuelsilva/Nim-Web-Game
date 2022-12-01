let userData = [
	{ utilizador: "Jogador", Wins: 0, Loses: 0 },
	{ utilizador: "Computador", Wins: 0, Loses: 0 }
]

let host = "twserver.alunos.dcc.fc.up.pt";
let port = "8008";
let group = 18;

class nimComp {

  constructor(dif, col, first) {
		this.dif = dif;
		this.col = col;
		this.first = first;
		this.initGame = false;

		let selId = document.getElementById("size");
		selId.onchange = () => {
			this.col = parseInt(selId.options[selId.selectedIndex].value);
		}

		let difId = document.getElementById("difficulty");
		difId.onchange = () => {
			this.dif = parseInt(difId.options[difId.selectedIndex].value);
		}

		let humanId = document.getElementById("r1");
		humanId.onchange = () => {
			this.first = document.querySelector('input[name=radio1]:checked').value;
		}


		let compId = document.getElementById("r2");
		compId.onchange = () => {
			this.first = document.querySelector('input[name=radio1]:checked').value;
		}

		let init = document.getElementById("init");
		init.onclick = () => this.appearBoard();

		let quit = document.getElementById("quit");
		quit.onclick = () => this.quitGame();
	 }

  appearBoard() {
		let b = document.getElementById("board");
		this. piecesColumn = []
		console.log("JOGO : " + this.first + " " + this.dif + " " + this.col)

		if (b.style.display === "none") {
				let c = this.col;
				this.totalPieces = 0;

				for (let i = 0; i < this.col; i++, c--) {
					this.piecesColumn[i] = c;
					this.totalPieces += c;
				}

				b.style.display = "flex";

				this.nCompMove = 0;
				this.initGame = true;

				if(this.first == "r1") {
					this.setGame();
				} else {
					this.setGame();
					this.computerAction();
				}
			}
			return;
		}

	setGame() {
		const board = document.getElementById("board");
		this.didMove = false;

		for (let i = 0; i < this.col; i++) {
			const column = document.createElement("div");
			column.className = "column";
			board.appendChild(column);
			for (let j = 0; j < this.piecesColumn[i]; j++) {
				const piece = document.createElement("div");
				piece.onclick = () => this.pieceOut(piece,i);
				piece.className = "piece";
				column.appendChild(piece);
			}
		}
	}

  pieceOut(elem, index) {
		if(!this.didMove) {
			if (!elem.previousElementSibling) {
				this.piecesColumn[index]--;
				this.totalPieces--;
				event.target.remove();
			} else {
				this.removeAllBefore(elem, index);
				event.target.remove();
				this.piecesColumn[index]--;
				this.totalPieces--;
			}
			this.didMove=true;
			this.computerAction();
		} else {
				alert("Jogada Inválida");
		}
	}

	removeAllBefore(elem, index) {
		let prevEl = elem.previousElementSibling;
		while (prevEl) {
			this.piecesColumn[index]--;
			this.totalPieces--;
			prevEl.parentNode.removeChild(prevEl);
			prevEl = elem.previousElementSibling;
		}
	}

	async computerAction() {
		const userDataStats = userData[0];
		const computerDataStats = userData[1];

		await new Promise(r => setTimeout(r, 250));

		if(this.totalPieces == 0) {
			this.initGame = false;
			alert("Parabéns! Ganhou");
			this.updateUserWins(userDataStats,computerDataStats);
			disappearBoard();
			loadTableData([userDataStats, computerDataStats])
		} else if (this.totalPieces>0) {

				let b = document.getElementById("board");
				while (b.firstChild) {
					b.removeChild(b.firstChild);
				}

				if (this.dif == 1) {
					this.moveComputer1();
			 } else if (this.dif == 2) {
					this.moveComputer2();
				} else
					this.moveComputer3();

				this.nCompMove++;

				if (this.totalPieces == 0) {
					this.initGame = false;
					alert("Perdeu ... Tente novamente!")
					this.updateComputerWins(userDataStats,computerDataStats)
					disappearBoard();
					loadTableData([userDataStats, computerDataStats])

				} else
					this.setGame();
			}
		}

	moveComputer1() {
		let index = Math.floor(Math.random() * this.col);

		while (this.piecesColumn[index] == 0) {
			index = Math.floor(Math.random() * this.col);
		}

		let pieces = Math.floor(Math.random() * this.piecesColumn[index]);

		this.totalPieces -= this.piecesColumn[index] - pieces;
		this.piecesColumn[index] = pieces;
	}

	moveComputer2() {
		if (this.nCompMove % 2 == 0) {
			this.moveComputer1()
	 } else
			this.moveComputer3()
	}

	moveComputer3() {
		let totalNimSum = 0;
		let i;

		for (i = 0; i < this.col; i++) {
			totalNimSum = totalNimSum ^ this.piecesColumn[i];
		}

		let result = 0;
		for (i = 0; i < this.col; i++) {
			result = this.piecesColumn[i] ^ totalNimSum;
			if (result < this.piecesColumn[i]) {
				this.totalPieces -= this.piecesColumn[i] - result;
				this.piecesColumn[i] = result;
				break;
			}
		}

		if(i==this.col)
			this.moveComputer1()
	}

	quitGame() {
		const userDataStats = userData[0]
		const computerDataStats = userData[1]
		if(this.initGame) {
			alert("Desistiu do jogo... Perdeu")
			this.updateComputerWins(userDataStats,computerDataStats)
			loadTableData([userDataStats, computerDataStats])
			disappearBoard()
			this.initGame = false
		}
	}

	updateUserWins(userDataStats, computerDataStats) {
		if(localStorage.UserWins) {
			localStorage.UserWins=
				Number(localStorage.UserWins)+1
			computerDataStats.Loses=localStorage.UserWins
			userDataStats.Wins=localStorage.UserWins
		}
	}

	updateComputerWins(userDataStats, computerDataStats) {
		if(localStorage.ComputerWins) {
			localStorage.ComputerWins=
				Number(localStorage.ComputerWins)+1
			computerDataStats.Wins=localStorage.ComputerWins
			userDataStats.Loses=localStorage.ComputerWins
		}
	}
}

class nimPlay {
	constructor(col) {
		this.col = col;
		this.user = null;
		this.password = null;

		let selId = document.getElementById("size");
		selId.onchange = () => {
			this.col = parseInt(selId.options[selId.selectedIndex].value);
		}

		let init = document.getElementById("init");
		init.onclick = () => this.join();

		let quit = document.getElementById("quit");
		quit.onclick = () => this.leave();

		let login = document.getElementById("login");
		login.onclick = () => this.register();
	}

	register() {
		this.user = document.getElementById("id").value
		this.password = document.getElementById("pass").value
		const url = "http://" + host + ":" + port + "/register";

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				nick: this.user,
				password: this.password,
			}),
		})
		.then(response => {
			if(this.user==""|| this.password=="")
				throw new Error("Nome de utilizador ou password em falta");
			else {
				response.text().then(console.log);
			}
		})
		 .catch(console.log)
	};

	join() {
		const url = "http://"+ host + ":" + port + "/join";
		fetch(url, {
			method: "POST",
	    headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
	      group: group,
				nick: this.user,
				password: this.password,
				size: this.col
			})
		})
		 .then(response => response.json())
		 .then((data) => {
			console.log(data);
			if(data.error) {
				throw new Error("Não foi possível começar o jogo")
			} else {
				this.gameId = data["game"];
				this.update();
			}
		 })
		 .catch(console.log)
	}

	update() {
		const url = "http://" + host + ":" + port + "/update?nick=" + this.user + "&game=" + this.gameId;
		const eventSource = new EventSource(url);
		eventSource.onmessage = event => {
			const data = JSON.parse(event.data);
			console.log(event.data);
			if('winner' in data) {
				if(data["winner"] == this.user) {
						alert("Parabéns! Ganhou");
				} else if(data["winner"] !== null) {
	        	alert("Perdeu... Tente novamente!");
			  } else {
						alert("Desistiu da espera")
				}
				disappearBoard();
				eventSource.close();
			} else {
					this.turn = data["turn"];
					this.piecesColumn = data["rack"];
					const board = document.getElementById("board")
					board.style.display = "flex"
					this.setGame();
			}
		}
	}

	leave() {
		const url = "http://" + host + ":" + port + "/leave";
		fetch(url, {
			method: "POST",
			headers: {
	            "Content-Type": "application/json"
			},
			body: JSON.stringify({
				nick: this.user,
				password: this.password,
				game: this.gameId,
			})
		})

		.then(response => response.json())
		.then((data) => {
			console.log(data);
		 })
		 .catch(console.log)
	}

	notify(pieces, stack) {
		const url = "http://" + host + ":" + port + "/notify"

		fetch(url, {
			method: "POST",
	    headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
	      nick: this.user,
				password: this.password,
				game: this.gameId,
				stack: stack,
				pieces: pieces
			})
		})
		.then(response => response.json())
		.then((data) => {
			console.log(data);
		 })
		 .catch(console.log)
	}

	setGame() {
	  const board = document.getElementById("board")
		this.didMove = false

		while (board.firstChild) {
			board.removeChild(board.firstChild)
		}


		for (let i = this.col-1; i >= 0; i--) {
			const column = document.createElement("div")
			column.className = "column"
			board.appendChild(column)
			for (let j = 0; j < this.piecesColumn[i]; j++) {
				const piece = document.createElement("div")
				piece.onclick = () => this.pieceOut(piece,i)
				piece.className = "piece"
				column.appendChild(piece)
			}
		}
	}

	pieceOut(elem, index) {
		if(!this.didMove && this.user==this.turn) {
			if (!elem.previousElementSibling) {
					event.target.remove()
					this.piecesColumn[index]--
			} else {
					this.removeAllBefore(elem, index)
					event.target.remove()
					this.piecesColumn[index]--
			}
				this.didMove=true
				this.notify(this.piecesColumn[index], index)
		} else {
			this.notify(this.piecesColumn[index], index)
			alert("Não é a sua vez")
		}
	}

	removeAllBefore(elem, index) {
		let prevEl = elem.previousElementSibling;
		while (prevEl) {
			this.piecesColumn[index]--;
			this.totalPieces--;
			prevEl.parentNode.removeChild(prevEl);
			prevEl = elem.previousElementSibling;
		}
	}
}

window.onload = () => {
  initialUpdate();
	loadTableData(userData);
  let radioPush = document.querySelector('input[name=radio2]:checked').value;
  let playOptions = document.getElementById('pOptions');
  let compOptions = document.getElementById('cOptions');

	if(radioPush=="pessoa") {
		let selId = document.getElementById("size");
		col = parseInt(selId.options[selId.selectedIndex].value);

		game = new nimPlay(col);
	}

	 playOptions.onclick = function() {
		  const firstPlay = document.getElementById("firstPlay");
		  firstPlay.style.display = "none";
		  diffChoice.style.display = "none";

			let selId = document.getElementById("size");
			col = parseInt(selId.options[selId.selectedIndex].value);

			game = new nimPlay(col)
	  }

	  compOptions.onclick = function() {
		  const firstPlay = document.getElementById("firstPlay");
		  const diffChoice = document.getElementById("diffChoice");
		  firstPlay.style.display = "inline-flex";
		  diffChoice.style.display = "inline-flex";

			let selId = document.getElementById("size");
			col = parseInt(selId.options[selId.selectedIndex].value);

			let difId = document.getElementById("difficulty")
			difVal = parseInt(difId.options[difId.selectedIndex].value)

			let first = document.querySelector('input[name=radio1]:checked').value;

		  game = new nimComp(difVal, col, first);
		}

		let rank = document.getElementById("ranking");
		rank.onclick = () => ranking();
}

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

function loadTableData(userData) {
	const tableBody = document.getElementById("tableData")
	let dataHtml = ""

	for (let person of userData) {
		dataHtml += `<tr><td>${person.utilizador}</td><td>${person.Wins}</td><td>${person.Loses}</td></tr>`
	}

	tableBody.innerHTML = dataHtml
}

function ranking() {
	const url = "http://"+host+":" + port + "/ranking";
	let selId = document.getElementById("size");
	col = parseInt(selId.options[selId.selectedIndex].value);

	fetch(url, {
			method: "POST",
	        headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
	         group: group,
				  	size: col
			})
		})

	.then(response => response.json())
	.then((data) => {
		console.log(data);

		if(data.error) {
			return;
		} else {

			const tableBody = document.getElementById("rankingTable");
			let playersScores = data["ranking"];
			let dataHtml = ""

			for (let values of playersScores) {
				dataHtml += `<tr><td>${values.nick}</td><td>${values.victories}</td><td>${values.games}</td></tr>`
			}

			tableBody.innerHTML = dataHtml
		}
	})
	.catch(console.log)
}

function disappearBoard() {
	let b = document.getElementById("board")
	while (b.firstChild) {
		b.removeChild(b.firstChild)
	}
	board.style.display = "none"
}
