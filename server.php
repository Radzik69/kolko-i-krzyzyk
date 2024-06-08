<?php
$db = "localhost";
$dbUser = "root";
$dbPass = "";
$dbName = "tic-tac-toe";

$conn = mysqli_connect($db, $dbUser, $dbPass, $dbName);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Handling the game data submission
  $movesJson = $_POST["movesInput"];
  $whoWon = $_POST["whoWon"];

  $sql = "INSERT INTO `games`(`WhoWon`, `Moves`) VALUES ('$whoWon','$movesJson')";
  $query = mysqli_query($conn, $sql);

  if ($query) {
    echo "<script>window.location.replace('friendlyGame.html')</script>";
  }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  // Handling the game data retrieval
  $sql = "SELECT * FROM `games`";
  $query = mysqli_query($conn, $sql);

  $games = array();
  if (mysqli_num_rows($query) > 0) {
    while ($row = mysqli_fetch_assoc($query)) {
      $games[] = $row;
    }
  }
  header('Content-Type: application/json');
  echo json_encode($games);
}

mysqli_close($conn);
?>