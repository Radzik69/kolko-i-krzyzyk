document.addEventListener("DOMContentLoaded", () => {
	initFields();
	setInitClickHandlersX();
	FriendlyGameMoveX();
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

function Movement(player, Coordinates) {
	var gridElement = document.getElementById(Coordinates);
	var Xh1 = document.createElement("h1");
	Xh1.innerHTML = player;
	Xh1.setAttribute("class", "MovementStamped");
	gridElement.appendChild(Xh1);

	gridElement.removeAttribute("onclick");
	gridElement.removeAttribute("canUse");

	if (player == "X") {
		FriendlyGameMoveO();
		console.log("X movement");
		moves[numberOfMoves] = Coordinates;
		console.log(moves[numberOfMoves]);
		numberOfMoves++;
	} else {
		FriendlyGameMoveX();
		console.log("O movement");
		moves[numberOfMoves] = Coordinates;
		console.log(moves[numberOfMoves]);
		numberOfMoves++;
	}

	winningConditions();
}

function winningConditions() {
	var h1A1 = document.getElementById("A1").querySelector("h1")
		? document.getElementById("A1").querySelector("h1").innerHTML
		: null;
	var h1A2 = document.getElementById("A2").querySelector("h1")
		? document.getElementById("A2").querySelector("h1").innerHTML
		: null;
	var h1A3 = document.getElementById("A3").querySelector("h1")
		? document.getElementById("A3").querySelector("h1").innerHTML
		: null;
	var h1B1 = document.getElementById("B1").querySelector("h1")
		? document.getElementById("B1").querySelector("h1").innerHTML
		: null;
	var h1B2 = document.getElementById("B2").querySelector("h1")
		? document.getElementById("B2").querySelector("h1").innerHTML
		: null;
	var h1B3 = document.getElementById("B3").querySelector("h1")
		? document.getElementById("B3").querySelector("h1").innerHTML
		: null;
	var h1C1 = document.getElementById("C1").querySelector("h1")
		? document.getElementById("C1").querySelector("h1").innerHTML
		: null;
	var h1C2 = document.getElementById("C2").querySelector("h1")
		? document.getElementById("C2").querySelector("h1").innerHTML
		: null;
	var h1C3 = document.getElementById("C3").querySelector("h1")
		? document.getElementById("C3").querySelector("h1").innerHTML
		: null;

	if (
		(h1A1 === "X" && h1A2 === "X" && h1A3 === "X") ||
		(h1B1 === "X" && h1B2 === "X" && h1B3 === "X") ||
		(h1C1 === "X" && h1C2 === "X" && h1C3 === "X") ||
		(h1A1 === "X" && h1B1 === "X" && h1C1 === "X") ||
		(h1A2 === "X" && h1B2 === "X" && h1C2 === "X") ||
		(h1A3 === "X" && h1B3 === "X" && h1C3 === "X") ||
		(h1A1 === "X" && h1B2 === "X" && h1C3 === "X") ||
		(h1A3 === "X" && h1B2 === "X" && h1C1 === "X")
	) {
		console.log("X wins");
		var allDivs = document.querySelectorAll(".gameGridElement");
		allDivs.forEach(function (singleDiv) {
			singleDiv.removeAttribute("onclick");
		});
		playersDivO = document.getElementById("playerO");
		playersDivO.style.backgroundColor = "dimgray";
		playersDivO.querySelector("h1").innerHTML = "";
		var top = document.getElementById("top");
		top.style.backgroundColor = "green";

		var h1WinX = document.createElement("h1");
		h1WinX.innerHTML = "PLAYER X HAS WON 🥳🥳🥳";
		top.appendChild(h1WinX);

		playersDivX = document.getElementById("playerX");
		var restarWinX = document.createElement("button");
		restarWinX.setAttribute("onclick", "NewGame('X')");
		restarWinX.innerHTML = "RESTART";
		playersDivX.appendChild(restarWinX);
	} else if (
		(h1A1 === "O" && h1A2 === "O" && h1A3 === "O") ||
		(h1B1 === "O" && h1B2 === "O" && h1B3 === "O") ||
		(h1C1 === "O" && h1C2 === "O" && h1C3 === "O") ||
		(h1A1 === "O" && h1B1 === "O" && h1C1 === "O") ||
		(h1A2 === "O" && h1B2 === "O" && h1C2 === "O") ||
		(h1A3 === "O" && h1B3 === "O" && h1C3 === "O") ||
		(h1A1 === "O" && h1B2 === "O" && h1C3 === "O") ||
		(h1A3 === "O" && h1B2 === "O" && h1C1 === "O")
	) {
		console.log("O wins");
		var allDivs = document.querySelectorAll(".gameGridElement");
		allDivs.forEach(function (singleDiv) {
			singleDiv.removeAttribute("onclick");
		});
		playersDivX = document.getElementById("playerX");
		playersDivX.style.backgroundColor = "dimgray";
		playersDivX.querySelector("h1").innerHTML = "";
		var top = document.getElementById("top");
		top.style.backgroundColor = "green";

		var h1WinO = document.createElement("h1");
		h1WinO.innerHTML = "PLAYER O HAS WON 🥳🥳🥳";
		top.appendChild(h1WinO);

		playersDivO = document.getElementById("playerO");
		var restarWinO = document.createElement("button");
		restarWinO.setAttribute("onclick", "NewGame('O')");
		restarWinO.innerHTML = "RESTART";
		playersDivO.appendChild(restarWinO);
	} else if (
		h1A1 != null &&
		h1A2 != null &&
		h1A3 != null &&
		h1B1 != null &&
		h1B2 != null &&
		h1B3 != null &&
		h1C1 != null &&
		h1C2 != null &&
		h1C3 != null
	) {
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
			const tr = document.createElement("tr");
			for (let j = 0; j < 3; j++) {
				const td = document.createElement("td");
				tr.appendChild(td);
			}
			tableHistory.appendChild(tr);
		}

		const cells = tableHistory.getElementsByTagName("td");

		// Populate the table with moves
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

function getCellIndex(coordinates) {
	switch (coordinates) {
		case "A1":
			return 0;
		case "A2":
			return 1;
		case "A3":
			return 2;
		case "B1":
			return 3;
		case "B2":
			return 4;
		case "B3":
			return 5;
		case "C1":
			return 6;
		case "C2":
			return 7;
		case "C3":
			return 8;
		default:
			return -1;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	fetchGameHistory();
});

function TpHistoryDetails(id, gameWinner, gameMoves) {
	console.log(gameWinner);
	window.location.href = `history.html?id=${id}&gameWinner=${
		gameWinner || null
	}&gameMoves=${gameMoves || null}`;

	// var menuHistory = document.getElementById("menuHistory");
	// if (!menuHistory) {
	// 	console.error("menuHistory element not found");
	// 	return;
	// }

	// var input1 = document.createElement("input");
	// input1.type = "hidden";
	// input1.value = id;
	// input1.name = "id";
	// menuHistory.appendChild(input1);

	// var input2 = document.createElement("input");
	// input2.type = "hidden";
	// input2.value = gameWinner;
	// input2.name = "gameWinner";
	// menuHistory.appendChild(input2);

	// var input3 = document.createElement("input");
	// input3.type = "hidden";
	// input3.value = gameMoves;
	// input3.name = "gameMoves";
	// menuHistory.appendChild(input3);

	// window.location.href = "history.html";
}

var HistoryArrayNumber = 0;
function historyOnLoad() {
	const queryParams = new URLSearchParams(window.location.search);
	const id = queryParams.get("id");
	const gameWinner = queryParams.get("gameWinner");
	const gameMoves = queryParams.get("gameMoves");

	document.getElementById("HistoryLeft").onclick = function () {
		HistoryLeftGo(gameMoves);
	};

	document.getElementById("HistoryRight").onclick = function () {
		HistoryRightGo(gameMoves);
	};
}

function HistoryLeftGo(gameMoves) {
	HistoryArrayNumber--;
	if (gameMoves !== null) {
		var gameMovesArray = gameMoves.split(",");
		var HistorygridElement = document.getElementById(
			"History" + gameMovesArray[HistoryArrayNumber]
		);

		HistorygridElement.innerHTML = "";

		var Tura = (document.getElementById(
			"Tura"
		).innerHTML = `Round nr: ${HistoryArrayNumber}`);
	} else {
		console.error("gameMoves is null");
	}
}

function HistoryRightGo(gameMoves) {
	if (gameMoves !== null) {
		var gameMovesArray = gameMoves.split(",");
		var HistorygridElement = document.getElementById(
			"History" + gameMovesArray[HistoryArrayNumber]
		);

		if (HistoryArrayNumber % 2 == 0) {
			HistorygridElement.innerHTML = "X";
		} else {
			HistorygridElement.innerHTML = "O";
		}

		HistoryArrayNumber++;
		var Tura = (document.getElementById(
			"Tura"
		).innerHTML = `Round nr: ${HistoryArrayNumber}`);
	} else {
		console.error("gameMoves is null");
	}
}

function TpFriendlyGame() {
	window.location.replace("friendlyGame.html");
}
