document.addEventListener("DOMContentLoaded", () => {
	initFields();
	setInitClickHandlersX();
	fetchGameHistory();
});

function TpFriendlyGame() {
	window.location.replace("friendlyGame.html");
}

var A1, A2, A3, B1, B2, B3, C1, C2, C3;

function initFields() {
	A1 = document.getElementById("A1");
	A2 = document.getElementById("A2");
	A3 = document.getElementById("A3");
	B1 = document.getElementById("B1");
	B2 = document.getElementById("B2");
	B3 = document.getElementById("B3");
	C1 = document.getElementById("C1");
	C2 = document.getElementById("C2");
	C3 = document.getElementById("C3");

	A1.setAttribute("canUse", true);
	A2.setAttribute("canUse", true);
	A3.setAttribute("canUse", true);
	B1.setAttribute("canUse", true);
	B2.setAttribute("canUse", true);
	B3.setAttribute("canUse", true);
	C1.setAttribute("canUse", true);
	C2.setAttribute("canUse", true);
	C3.setAttribute("canUse", true);
}

function setInitClickHandlersX() {
	A1.setAttribute("onclick", 'Movement("X", "A1")');
	A2.setAttribute("onclick", 'Movement("X", "A2")');
	A3.setAttribute("onclick", 'Movement("X", "A3")');
	B1.setAttribute("onclick", 'Movement("X", "B1")');
	B2.setAttribute("onclick", 'Movement("X", "B2")');
	B3.setAttribute("onclick", 'Movement("X", "B3")');
	C1.setAttribute("onclick", 'Movement("X", "C1")');
	C2.setAttribute("onclick", 'Movement("X", "C2")');
	C3.setAttribute("onclick", 'Movement("X", "C3")');
}

function setClickHandlers(player = "X") {
	A1.getAttribute("canUse") &&
		A1.setAttribute("onclick", `Movement("${player}", "A1")`);
	A2.getAttribute("canUse") &&
		A2.setAttribute("onclick", `Movement("${player}", "A2")`);
	A3.getAttribute("canUse") &&
		A3.setAttribute("onclick", `Movement("${player}", "A3")`);
	B1.getAttribute("canUse") &&
		B1.setAttribute("onclick", `Movement("${player}", "B1")`);
	B2.getAttribute("canUse") &&
		B2.setAttribute("onclick", `Movement("${player}", "B2")`);
	B3.getAttribute("canUse") &&
		B3.setAttribute("onclick", `Movement("${player}", "B3")`);
	C1.getAttribute("canUse") &&
		C1.setAttribute("onclick", `Movement("${player}", "C1")`);
	C2.getAttribute("canUse") &&
		C2.setAttribute("onclick", `Movement("${player}", "C2")`);
	C3.getAttribute("canUse") &&
		C3.setAttribute("onclick", `Movement("${player}", "C3")`);
}

function FriendlyGameMoveX() {
	setClickHandlers();
	var divX = document.getElementById("playerX");
	divX.style.backgroundColor = "green";

	var h1X = document.getElementById("h1X");
	h1X.style.visibility = "visible";

	var divO = document.getElementById("playerO");
	divO.style.backgroundColor = "dimgray";

	var h1O = document.getElementById("h1O");
	h1O.style.visibility = "hidden";

	divX.appendChild(h1X);
}

function FriendlyGameMoveO() {
	setClickHandlers("O");
	var divO = document.getElementById("playerO");
	divO.style.backgroundColor = "green";

	var h1O = document.getElementById("h1O");
	h1O.style.visibility = "visible";

	var divX = document.getElementById("playerX");
	divX.style.backgroundColor = "dimgray";

	var h1X = document.getElementById("h1X");
	h1X.style.visibility = "hidden";

	divO.appendChild(h1O);
}

var moves = [];
var numberOfMoves = 0;
var board = Array(9).fill(null);
const human = "X";
const bot = "O";

function Movement(player, Coordinates) {
	var gridElement = document.getElementById(Coordinates);
	var Xh1 = document.createElement("h1");
	Xh1.innerHTML = player;
	Xh1.setAttribute("class", "MovementStamped");
	gridElement.appendChild(Xh1);

	gridElement.removeAttribute("onclick");
	gridElement.removeAttribute("canUse");

	const index = getCellIndex(Coordinates);
	board[index] = player;

	moves[numberOfMoves] = Coordinates;
	numberOfMoves++;

	if (player == human) {
		FriendlyGameMoveO();
		if (!calculateWinner(board) && board.some((cell) => cell === null)) {
			setTimeout(() => {
				const botMove = bestMove();
				Movement(bot, botMove);
			}, 500);
		}
	} else {
		FriendlyGameMoveX();
	}

	winningConditions();
}

function winningConditions() {
	const winner = calculateWinner(board);
	if (winner) {
		console.log(`${winner} wins`);
		var allDivs = document.querySelectorAll(".gameGridElement");
		allDivs.forEach(function (singleDiv) {
			singleDiv.removeAttribute("onclick");
		});

		const winningCombination = getWinningCombination(board);
		winningCombination.forEach((index) => {
			const cell = getCellFromIndex(index);
			document.getElementById(cell).classList.add("winning-cell");
		});

		const playersDiv =
			winner === "X"
				? document.getElementById("playerO")
				: document.getElementById("playerX");
		playersDiv.style.backgroundColor = "dimgray";
		playersDiv.querySelector("h1").innerHTML = "";

		var top = document.getElementById("top");
		top.style.backgroundColor = "green";

		var h1Win = document.createElement("h1");
		h1Win.innerHTML = `PLAYER ${winner} HAS WON 🥳🥳🥳`;
		if (!top.querySelector("h1")) {
			top.appendChild(h1Win);
			var restartDraw = document.createElement("button");
			restartDraw.setAttribute("onclick", "NewGame('D')");
			restartDraw.innerHTML = "RESTART";
			top.appendChild(restartDraw);
			document.getElementById("buttonTp").style.display = "none";
			var plejerO = document.getElementById("playerO");
			plejerO.style.backgroundColor = "dimgray";
			plejerO.querySelectorAll("h1").style.visibility = "hidden";
		}

		const playersDivWin =
			winner === "X"
				? document.getElementById("playerX")
				: document.getElementById("playerO");
		playersDivWin.appendChild(restartWin);
		document.getElementById("buttonTp").style.display = "none";
	} else if (board.every((cell) => cell !== null)) {
		console.log("draw");
		var top = document.getElementById("top");
		top.style.backgroundColor = "gray";

		var h1Draw = document.createElement("h1");
		h1Draw.innerHTML = "GAME ENDED IN A DRAW";
		if (!top.querySelector("h1")) {
			top.appendChild(h1Draw);
			var restartDraw = document.createElement("button");
			restartDraw.setAttribute("onclick", "NewGame('D')");
			restartDraw.innerHTML = "RESTART";
			var plejerO = document.getElementById("playerO");
			plejerO.style.backgroundColor = "dimgray";
			plejerO.querySelectorAll("h1").style.visibility = "hidden";
			top.appendChild(restartDraw);
			document.getElementById("buttonTp").style.display = "none";
		}
	}
}

function getWinningCombination(board) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const line of lines) {
		const [a, b, c] = line;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return line;
		}
	}

	return [];
}

function NewGame(whoWon) {
	jsonMoves = JSON.stringify(moves);

	var top = document.getElementById("top");
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "serverBot.php");
	var input1 = document.createElement("input");
	input1.value = jsonMoves;
	input1.style.display = "none";
	input1.setAttribute("name", "movesInput");

	var input2 = document.createElement("input");
	input2.value = whoWon;
	input2.style.display = "none";
	input2.setAttribute("name", "whoWon");

	top.appendChild(form);
	form.appendChild(input1);
	form.appendChild(input2);
	form.submit();
}

function fetchGameHistory() {
	fetch("server.php")
		.then((response) => response.json())
		.then((data) => {
			console.log("Game history data:", data);
			displayGameHistory(data);
		})
		.catch((error) => console.error("Error fetching game history:", error));
}

function displayGameHistory(games) {
	const historyDiv = document.getElementById("history");
	historyDiv.innerHTML = "";
	games.forEach((game) => {
		const gameDiv = document.createElement("div");
		gameDiv.className = "gameHistoryDiv";

		const winner = document.createElement("p");
		winner.innerHTML = `Winner: ${game.WhoWon}`;
		gameDiv.appendChild(winner);

		const moves = JSON.parse(game.Moves);

		const tableHistory = document.createElement("table");
		tableHistory.setAttribute(
			"onclick",
			`TpHistoryDetails("${game.ID}","${game.WhoWon}",${game.Moves})`
		);

		for (let i = 0; i < 3; i++) {
			const tr = document.createElement("tr");
			for (let j = 0; j < 3; j++) {
				const td = document.createElement("td");
				tr.appendChild(td);
			}
			tableHistory.appendChild(tr);
		}

		const cells = tableHistory.getElementsByTagName("td");

		moves.forEach((move, index) => {
			const player = index % 2 === 0 ? "X" : "O";
			const cellIndex = getCellIndex(move);
			if (cellIndex !== -1) {
				cells[cellIndex].innerHTML = player;
			}
		});

		gameDiv.appendChild(tableHistory);
		historyDiv.appendChild(gameDiv);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	fetchGameHistory();
});

function TpHistoryDetails(id, gameWinner, gameMoves) {
	console.log(gameWinner);
	window.location.href = `history.html?id=${id}&gameWinner=${
		gameWinner || null
	}&gameMoves=${gameMoves || null}`;
}

function getCellIndex(cell) {
	const mapping = {
		A1: 0,
		A2: 1,
		A3: 2,
		B1: 3,
		B2: 4,
		B3: 5,
		C1: 6,
		C2: 7,
		C3: 8,
	};
	return mapping[cell];
}

function getCellFromIndex(index) {
	const mapping = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
	return mapping[index];
}

function calculateWinner(board) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (const [a, b, c] of lines) {
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	return null;
}

function bestMove() {
	let bestScore = -Infinity;
	let move;
	for (let i = 0; i < board.length; i++) {
		if (board[i] === null) {
			board[i] = bot;
			let score = minimax(board, 0, false);
			board[i] = null;
			if (score > bestScore) {
				bestScore = score;
				move = i;
			}
		}
	}
	return getCellFromIndex(move);
}

function minimax(board, depth, isMaximizing) {
	let result = calculateWinner(board);
	if (result !== null) {
		return result === bot ? 10 - depth : result === human ? depth - 10 : 0;
	}
	if (board.every((cell) => cell !== null)) {
		return 0;
	}

	if (isMaximizing) {
		let bestScore = -Infinity;
		for (let i = 0; i < board.length; i++) {
			if (board[i] === null) {
				board[i] = bot;
				let score = minimax(board, depth + 1, false);
				board[i] = null;
				bestScore = Math.max(score, bestScore);
			}
		}
		return bestScore;
	} else {
		let bestScore = Infinity;
		for (let i = 0; i < board.length; i++) {
			if (board[i] === null) {
				board[i] = human;
				let score = minimax(board, depth + 1, true);
				board[i] = null;
				bestScore = Math.min(score, bestScore);
			}
		}
		return bestScore;
	}
}

function spawnTp() {
	window.location.replace("index.html");
}

function buttonMenu1() {
	var top = document.getElementById("top");

	var button = document.createElement("button");
	button.setAttribute("id", "buttonTp");
	button.setAttribute("onclick", "spawnTp()");
	button.innerHTML = "Go to starting page";

	top.appendChild(button);
}
