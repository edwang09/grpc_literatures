-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: mysql_db
-- Generation Time: May 01, 2021 at 08:54 PM
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
  `author_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`author_id`, `author_name`) VALUES
(5, 'Louise Glück'),
(6, 'Peter Handke'),
(7, 'Olga Tokarczuk'),
(8, 'Kazuo Ishiguro');

-- --------------------------------------------------------

--
-- Table structure for table `author_grant`
--

CREATE TABLE `author_grant` (
  `author_grant_id` int NOT NULL,
  `author_id` int NOT NULL,
  `award_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(12, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `award`
--

CREATE TABLE `award` (
  `award_id` int NOT NULL,
  `award_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `award`
--

INSERT INTO `award` (`award_id`, `award_name`) VALUES
(1, 'Nobel Prize in Literature');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int NOT NULL,
  `book_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `book_name`, `author_id`) VALUES
(1, 'Averno', 5),
(2, 'Faithful and Virtuous Night', 5),
(3, 'Immer noch Sturm', 6);

-- --------------------------------------------------------

--
-- Table structure for table `book_format`
--

CREATE TABLE `book_format` (
  `book_format_id` int NOT NULL,
  `isbn` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `format` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `book_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `book_format`
--

INSERT INTO `book_format` (`book_format_id`, `isbn`, `format`, `book_id`) VALUES
(1, '978-0-374-15201-7', 'paperback', 2),
(2, '978-0-374-10742-0', 'paperback', 1),
(3, 'paperback', '978-3-518-42131-4', 3);

-- --------------------------------------------------------

--
-- Table structure for table `book_grant`
--

CREATE TABLE `book_grant` (
  `book_grant_id` int NOT NULL,
  `book_id` int NOT NULL,
  `award_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  MODIFY `author_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `author_grant`
--
ALTER TABLE `author_grant`
  MODIFY `author_grant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `award`
--
ALTER TABLE `award`
  MODIFY `award_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `book_format`
--
ALTER TABLE `book_format`
  MODIFY `book_format_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `book_grant`
--
ALTER TABLE `book_grant`
  MODIFY `book_grant_id` int NOT NULL AUTO_INCREMENT;

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
