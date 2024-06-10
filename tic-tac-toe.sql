-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 10 Cze 2024, 21:06
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `tic-tac-toe`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `games`
--

CREATE TABLE `games` (
  `ID` int(11) NOT NULL,
  `WhoWon` text NOT NULL,
  `Moves` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Moves`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `games`
--

INSERT INTO `games` (`ID`, `WhoWon`, `Moves`) VALUES
(1, 'X', '[\"A1\",\"A2\",\"C2\",\"A3\",\"C1\",\"B1\",\"C3\"]'),
(2, 'X', '[\"A1\",\"A2\",\"C1\",\"B1\",\"C3\",\"A3\",\"B2\"]'),
(3, 'X', '[\"A1\",\"C1\",\"B2\",\"A2\",\"A3\",\"B3\",\"C3\"]'),
(4, 'X', '[\"A1\",\"A2\",\"C1\",\"B1\",\"C3\",\"A3\",\"C2\"]'),
(5, 'O', '[\"A1\",\"A2\",\"C3\",\"B2\",\"C1\",\"C2\"]'),
(6, 'X', '[\"A1\",\"B1\",\"C1\",\"C2\",\"B2\",\"A2\",\"A3\"]'),
(7, 'X', '[\"A1\",\"B1\",\"C1\",\"C2\",\"B2\",\"A2\",\"A3\"]'),
(8, 'X', '[\"A1\",\"A2\",\"C1\",\"B1\",\"C2\",\"A3\",\"C3\"]'),
(9, 'X', '[\"A1\",\"B1\",\"C1\",\"C2\",\"B2\",\"A2\",\"A3\"]'),
(10, 'D', '[\"A1\",\"B2\",\"C3\",\"A2\",\"C2\",\"C1\",\"A3\",\"B3\",\"B1\"]'),
(11, 'O', '[\"A1\",\"A3\",\"A2\",\"C2\",\"B2\",\"C3\",\"B3\",\"C1\"]'),
(12, 'X', '[\"A1\",\"B1\",\"C1\",\"C2\",\"B2\",\"A2\",\"A3\"]'),
(13, 'draw', '[\"A1\",\"B1\",\"C1\",\"A3\",\"B3\",\"B2\",\"C2\",\"C3\",\"A2\"]'),
(14, 'O', '[\"A1\",\"B1\",\"A2\",\"B2\",\"C2\",\"B3\"]'),
(15, 'draw', '[\"A1\",\"B1\",\"B3\",\"C3\",\"C2\",\"B2\",\"C1\",\"A2\",\"A3\"]'),
(16, 'draw', '[\"A1\",\"A2\",\"B2\",\"C3\",\"C2\",\"C1\",\"B1\",\"B3\",\"A3\"]'),
(17, 'D', '[\"A3\",\"B2\",\"C2\",\"B1\",\"C3\",\"B3\"]'),
(18, 'X', '[\"A1\",\"C1\",\"B2\",\"C2\",\"B1\",\"A2\",\"A3\",\"B3\",\"C3\"]'),
(19, 'O', '[\"A1\",\"B1\",\"C1\",\"B2\",\"C2\",\"A2\",\"A3\",\"B3\",\"C3\"]');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `games`
--
ALTER TABLE `games`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
