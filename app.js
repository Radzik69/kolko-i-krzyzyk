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

initFields();
setInitClickHandlersX();

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

		// var formX = document.createElement("form");
		// formX.setAttribute("method", "POST");
		// formX.setAttribute("action", "server.php");
		// gridElement.appendChild(formX);

		// var inputFormXPlayer = document.createElement("input");
		// inputFormXPlayer.value = player;
		// inputFormXPlayer.setAttribute("name", "player");
		// inputFormXPlayer.style.display = "none";
		// formX.appendChild(inputFormXPlayer);

		// var inputFormXCoordinates = document.createElement("input");
		// inputFormXCoordinates.value = Coordinates;
		// inputFormXCoordinates.setAttribute("name", "coordinates");
		// inputFormXCoordinates.style.display = "none";
		// formX.appendChild(inputFormXCoordinates);

		// formX.submit();
	} else {
		FriendlyGameMoveX();
		console.log("O movement");

		// var FormO = document.createElement("form");
		// FormO.setAttribute("method", "POST");
		// FormO.setAttribute("action", "server.php");
		// gridElement.appendChild(FormO);

		// var inputFormOPlayer = document.createElement("input");
		// inputFormOPlayer.value = player;
		// inputFormOPlayer.setAttribute("name", "player");
		// inputFormOPlayer.style.display = "none";
		// FormO.appendChild(inputFormOPlayer);

		// var inputFormOCoordinates = document.createElement("input");
		// inputFormOCoordinates.value = Coordinates;
		// inputFormOCoordinates.setAttribute("name", "coordinates");
		// inputFormOCoordinates.style.display = "none";
		// FormO.appendChild(inputFormOCoordinates);

		// FormO.submit();
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
		restarWinX.setAttribute("onclick", "TpFriendlyGame()");
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
		restarWinO.setAttribute("onclick", "TpFriendlyGame()");
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
		restartDraw.setAttribute("onclick", "TpFriendlyGame()");
		restartDraw.innerHTML = "RESTART";
		top.appendChild(restartDraw);
	}
}

FriendlyGameMoveX();
