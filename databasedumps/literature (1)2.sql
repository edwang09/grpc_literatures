-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db
-- Generation Time: May 01, 2021 at 10:38 PM
-- Server version: 8.0.24
-- PHP Version: 7.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `literature`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

CREATE TABLE `author` (
  `author_id` int NOT NULL,
  `author_name` varchar(500)  NOT NULL
) ENGINE=InnoDB DEFAULT ;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`author_id`, `author_name`) VALUES
(5, 'Louise Glück'),
(6, 'Peter Handke'),
(7, 'Olga Tokarczuk'),
(8, 'Kazuo Ishiguro'),
(9, 'Carol Ann Duffy'),
(10, 'Amir Or'),
(11, 'Ana Blandiana'),
(12, 'Adam Zagajewski'),
(13, 'Mia Couto'),
(14, 'Dubravka Ugrešić'),
(15, 'Edwidge Danticat'),
(16, 'Ismail Kadare'),
(17, 'Arkady Martine'),
(18, 'Mary Robinette Kowal'),
(19, 'N. K. Jemisin');

-- --------------------------------------------------------

--
-- Table structure for table `author_grant`
--

CREATE TABLE `author_grant` (
  `author_grant_id` int NOT NULL,
  `author_id` int NOT NULL,
  `award_id` int NOT NULL
) ENGINE=InnoDB DEFAULT ;

--
-- Dumping data for table `author_grant`
--

INSERT INTO `author_grant` (`author_grant_id`, `author_id`, `award_id`) VALUES
(5, 8, 1),
(6, 5, 1),
(7, 7, 1),
(8, 6, 1),
(9, 8, 1),
(10, 5, 1),
(11, 7, 1),
(12, 6, 1),
(13, 16, 3),
(14, 15, 3),
(15, 14, 3),
(16, 13, 3);

-- --------------------------------------------------------

--
-- Table structure for table `award`
--

CREATE TABLE `award` (
  `award_id` int NOT NULL,
  `award_name` varchar(500)  NOT NULL
) ENGINE=InnoDB DEFAULT ;

--
-- Dumping data for table `award`
--

INSERT INTO `award` (`award_id`, `award_name`) VALUES
(1, 'Nobel Prize in Literature'),
(2, 'Struga Poetry Evenings'),
(3, 'Neustadt International Prize for Literature'),
(4, 'Hugo Award for Best Novel'),
(5, 'America Award in Literature'),
(6, 'Costa Book Awards'),
(7, 'Booker Prize');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int NOT NULL,
  `book_name` varchar(500)  NOT NULL,
  `author_id` int NOT NULL
) ENGINE=InnoDB DEFAULT;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `author_id`) VALUES
(1, 'Averno', 5),
(2, 'Faithful and Virtuous Night', 5),
(3, 'Immer noch Sturm', 6),
(5, 'Sincerity', 9),
(6, 'Asymetria', 12),
(7, 'Confession of the Lioness: A Novel', 13),
(8, 'In the Jaws of Life', 14),
(9, 'Breath, Eyes, Memory', 15),
(10, 'A Girl in Exile: Requiem for Linda B.', 16),
(11, 'A Memory Called Empire', 17),
(12, 'The Calculating Stars', 18),
(13, 'The Fifth Season', 19),
(14, 'The Stone Sky', 19),
(15, 'The Obelisk Gate', 19);

-- --------------------------------------------------------

--
-- Table structure for table `book_format`
--

CREATE TABLE `book_format` (
  `book_format_id` int NOT NULL,
  `isbn` varchar(500)  NOT NULL,
  `format` varchar(500)  NOT NULL,
  `book_id` int NOT NULL
) ENGINE=InnoDB DEFAULT ;

--
-- Dumping data for table `book_format`
--

INSERT INTO `book_format` (`book_format_id`, `isbn`, `format`, `book_id`) VALUES
(1, '9780374152017', 'paperback\r\n', 2),
(2, '9780374107420', 'paperback', 1),
(3, '9783518421314', 'paperback', 3),
(4, '9781509893423', 'hardcover', 5),
(5, '9788361298762', 'paperback', 6),
(6, '9781619029163', 'hardcover', 10),
(7, '9780375705045', 'paperback', 9),
(8, '9781853812521', 'hardcover', 8),
(9, '9780374129231', 'hardcover', 7),
(10, '9780765378385', 'paperback', 12),
(11, '9780316229241', 'paperback', 14),
(12, '9780316229265', 'paperback', 15),
(13, '9781250186430', 'hardcover', 11),
(14, '9780316229296', 'paperback', 13);

-- --------------------------------------------------------

--
-- Table structure for table `book_grant`
--

CREATE TABLE `book_grant` (
  `book_grant_id` int NOT NULL,
  `book_id` int NOT NULL,
  `award_id` int NOT NULL
) ENGINE=InnoDB DEFAULT ;

--
-- Dumping data for table `book_grant`
--

INSERT INTO `book_grant` (`book_grant_id`, `book_id`, `award_id`) VALUES
(1, 11, 4),
(2, 12, 4),
(3, 14, 4),
(4, 15, 4),
(5, 13, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`author_id`);

--
-- Indexes for table `author_grant`
--
ALTER TABLE `author_grant`
  ADD PRIMARY KEY (`author_grant_id`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `award_id` (`award_id`);

--
-- Indexes for table `award`
--
ALTER TABLE `award`
  ADD PRIMARY KEY (`award_id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`) USING BTREE,
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `book_format`
--
ALTER TABLE `book_format`
  ADD PRIMARY KEY (`book_format_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `book_grant`
--
ALTER TABLE `book_grant`
  ADD PRIMARY KEY (`book_grant_id`),
  ADD KEY `award_id` (`award_id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `author`
--
ALTER TABLE `author`
  MODIFY `author_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `author_grant`
--
ALTER TABLE `author_grant`
  MODIFY `author_grant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `award`
--
ALTER TABLE `award`
  MODIFY `award_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `book_format`
--
ALTER TABLE `book_format`
  MODIFY `book_format_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `book_grant`
--
ALTER TABLE `book_grant`
  MODIFY `book_grant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_grant`
--
ALTER TABLE `author_grant`
  ADD CONSTRAINT `author_grant_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `author_grant_ibfk_2` FOREIGN KEY (`award_id`) REFERENCES `award` (`award_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `book_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_format`
--
ALTER TABLE `book_format`
  ADD CONSTRAINT `book_format_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `book_grant`
--
ALTER TABLE `book_grant`
  ADD CONSTRAINT `book_grant_ibfk_1` FOREIGN KEY (`award_id`) REFERENCES `award` (`award_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_grant_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
