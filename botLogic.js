document.addEventListener("DOMContentLoaded", () => {
	initFields();
	setInitClickHandlersX();
	fetchGameHistory();
});

function TpFriendlyGame() {
	window.location.replace("friendlyGame.html");
}

var A1 = document.getElementById("A1");
var A2 = document.getElementById("A2");
var A3 = document.getElementById("A3");
var B1 = document.getElementById("B1");
var B2 = document.getElementById("B2");
var B3 = document.getElementById("B3");
var C1 = document.getElementById("C1");
var C2 = document.getElementById("C2");
var C3 = document.getElementById("C3");

function initFields() {
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
			const botMove = bestMove();
			Movement(bot, botMove);
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
		top.appendChild(h1Win);

		const playersDivWin =
			winner === "X"
				? document.getElementById("playerX")
				: document.getElementById("playerO");
		var restarWin = document.createElement("button");
		restarWin.setAttribute("onclick", `NewGame('${winner}')`);
		restarWin.innerHTML = "RESTART";
		playersDivWin.appendChild(restarWin);
	} else if (board.every((cell) => cell !== null)) {
		console.log("draw");
		var top = document.getElementById("top");
		top.style.backgroundColor = "gray";

		var h1Draw = document.createElement("h1");
		h1Draw.innerHTML = "GAME ENDED IN A DRAW";
		top.appendChild(h1Draw);

		var restartDraw = document.createElement("button");
		restartDraw.setAttribute("onclick", "NewGame('D')");
		restartDraw.innerHTML = "RESTART";
		top.appendChild(restartDraw);
	}
}

function NewGame(whoWon) {
	jsonMoves = JSON.stringify(moves);

	var top = document.getElementById("top");
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "server.php");
	var input1 = document.createElement("input");
	input1.value = jsonMoves;
	input1.setAttribute("visibility", "hidden");
	input1.setAttribute("name", "movesInput");

	var input2 = document.createElement("input");
	input2.value = whoWon;
	input2.setAttribute("visibility", "hidden");
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
	historyDiv.innerHTML = ""; // Clear any existing content
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

		// Create 3x3 table structure
		for (let i = 0; i < 3; i++) {
			const row = document.createElement("tr");
			for (let j = 0; j < 3; j++) {
				const cell = document.createElement("td");
				const moveIndex = i * 3 + j;
				cell.textContent = moves[moveIndex] || "";
				row.appendChild(cell);
			}
			tableHistory.appendChild(row);
		}

		gameDiv.appendChild(tableHistory);
		historyDiv.appendChild(gameDiv);
	});
}

function TpHistoryDetails(id, whoWon, moves) {
	window.location.replace(
		`historyDetails.php?id=${id}&whoWon=${whoWon}&moves=${moves}`
	);
}

// Helper functions for the minimax implementation
function getCellIndex(coordinate) {
	const row = coordinate[0].toLowerCase();
	const col = parseInt(coordinate[1]);
	const rowIndex = row.charCodeAt(0) - "a".charCodeAt(0);
	return rowIndex * 3 + (col - 1);
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
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}
	return null;
}

function bestMove() {
	// Probability to make a random move
	const randomnessFactor = 0.3; // 30% chance to make a random move

	// Randomly decide whether to make a random move or the best move
	if (Math.random() < randomnessFactor) {
		let availableMoves = [];
		for (let i = 0; i < board.length; i++) {
			if (board[i] === null) {
				availableMoves.push(i);
			}
		}
		const randomIndex = Math.floor(Math.random() * availableMoves.length);
		return getCoordinatesFromIndex(availableMoves[randomIndex]);
	}

	// Otherwise, make the best move as per minimax algorithm
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
	return getCoordinatesFromIndex(move);
}

function minimax(board, depth, isMaximizing) {
	const scores = {
		O: 1,
		X: -1,
		tie: 0,
	};
	const result = calculateWinner(board);
	if (result !== null) {
		return scores[result];
	}
	if (!board.includes(null)) {
		return scores["tie"];
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

function getCoordinatesFromIndex(index) {
	const rows = ["A", "B", "C"];
	const row = rows[Math.floor(index / 3)];
	const col = (index % 3) + 1;
	return row + col;
}
