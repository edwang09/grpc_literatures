-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db1
-- Generation Time: May 02, 2021 at 11:05 PM
-- Server version: 5.7.30
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
  `author_id` int(11) NOT NULL,
  `author_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(14, 'Dubravka Ugreši?'),
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
  `author_grant_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `award_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `award_id` int(11) NOT NULL,
  `award_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `book_id` int(11) NOT NULL,
  `book_name` varchar(500) NOT NULL,
  `format` varchar(100) NOT NULL,
  `isbn` varchar(100) NOT NULL,
  `page` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `format`, `isbn`, `page`) VALUES
(1, 'Averno', 'paperback', '9780374107420', 216),
(2, 'Faithful and Virtuous Night', 'paperback', '9780374152017', 453),
(3, 'Immer noch Sturm', 'paperback', '9783518421314', 752),
(5, 'Sincerity', 'hardcover', '9781509893423', 483),
(6, 'Asymetria', 'paperback', '9788361298762', 753),
(7, 'Confession of the Lioness: A Novel', 'hardcover', '9780374129231', 1586),
(8, 'In the Jaws of Life', 'hardcover', '9781853812521', 753),
(9, 'Breath, Eyes, Memory', 'paperback', '9780375705045', 459),
(10, 'A Girl in Exile: Requiem for Linda B.', 'hardcover', '9781619029163', 678),
(11, 'A Memory Called Empire', 'hardcover', '9781250186430', 985),
(12, 'The Calculating Stars', 'paperback', '9780765378385', 238),
(13, 'The Fifth Season', 'paperback', '9780316229296', 277),
(14, 'The Stone Sky', 'paperback', '9780316229241', 868),
(15, 'The Obelisk Gate', 'paperback', '9780316229265', 858);

-- --------------------------------------------------------

--
-- Table structure for table `book_author`
--

CREATE TABLE `book_author` (
  `book_author_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book_author`
--

INSERT INTO `book_author` (`book_author_id`, `book_id`, `author_id`) VALUES
(16, 1, 5),
(17, 2, 5),
(18, 3, 6),
(19, 5, 9),
(20, 6, 12),
(21, 7, 13),
(22, 8, 14),
(23, 9, 15),
(24, 10, 16),
(25, 11, 17),
(26, 12, 18),
(27, 13, 19),
(28, 14, 19),
(29, 15, 19);

-- --------------------------------------------------------

--
-- Table structure for table `book_grant`
--

CREATE TABLE `book_grant` (
  `book_grant_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `award_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  ADD PRIMARY KEY (`book_id`) USING BTREE;

--
-- Indexes for table `book_author`
--
ALTER TABLE `book_author`
  ADD PRIMARY KEY (`book_author_id`),
  ADD KEY `author_id` (`author_id`),
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
  MODIFY `author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `author_grant`
--
ALTER TABLE `author_grant`
  MODIFY `author_grant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `award`
--
ALTER TABLE `award`
  MODIFY `award_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `book_author`
--
ALTER TABLE `book_author`
  MODIFY `book_author_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `book_grant`
--
ALTER TABLE `book_grant`
  MODIFY `book_grant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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
-- Constraints for table `book_author`
--
ALTER TABLE `book_author`
  ADD CONSTRAINT `book_author_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `author` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_author_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `book_grant`
--
ALTER TABLE `book_grant`
  ADD CONSTRAINT `book_grant_ibfk_1` FOREIGN KEY (`award_id`) REFERENCES `award` (`award_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_grant_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
