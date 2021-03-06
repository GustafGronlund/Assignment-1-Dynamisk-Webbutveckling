/*
-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:13306
-- Generation Time: Mar 10, 2022 at 02:57 PM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";

--
-- Database: `PhotoApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `Albums`
--

CREATE TABLE `Albums`
(
  `id` int
(11) NOT NULL,
  `title` varchar
(250) NOT NULL,
  `user_id` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Albums`
--

INSERT INTO `Albums` (`
id`,
`title
`, `user_id`) VALUES
(2, 'Samlade bilder.', 3),
(3, 'mitt fina andra album', 3),
(4, 'den är uppdaterad', 3),
(5, 'BÄSTA ALBUMET I DATABASEN', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Albums_Photos`
--

CREATE TABLE `Albums_Photos`
(
  `id` int
(11) NOT NULL,
  `photo_id` int
(11) NOT NULL,
  `album_id` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Albums_Photos`
--

INSERT INTO `Albums_Photos` (`
id`,
`photo_id
`, `album_id`) VALUES
(8, 2, 14),
(9, 2, 15),
(10, 4, 18),
(11, 4, 8),
(12, 4, 17),
(16, 3, 14),
(17, 4, 15),
(18, 4, 15),
(19, 4, 15),
(20, 4, 15);

-- --------------------------------------------------------

--
-- Table structure for table `Photos`
--

CREATE TABLE `Photos`
(
  `id` int
(11) NOT NULL,
  `title` varchar
(250) NOT NULL,
  `url` varchar
(250) NOT NULL,
  `comment` varchar
(50) NOT NULL,
  `user_id` int
(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Photos`
--

INSERT INTO `Photos` (`
id`,
`title
`, `url`, `comment`, `user_id`) VALUES
(8, 'spoket laban', 'http://www.leet.se', 'tju leen', 1),
(9, 'Handbok för admin', 'http://adminhacker.se', 'jag er en c00l admin', 2),
(13, 'okej nu tror jag att det funkar här va', 'https://www.amazon.se/Bitcoin-Standard-Decentralized-Alternative-Central/dp/1119473861/ref=asc_df_1119473861/?tag=shpngadsglede-21&linkCode=df0&hvadid=476518399397&hvpos=&hvnetw=g&hvrand=12273484489475216442&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&h', 'fan nu funkar det nog!', 3),
(14, 'en grogg yeees', 'https://www.tovejansson.se', 'bild på en drink hehe', 3),
(15, 'Fotografi på någonting.', 'https://virus.io', 'Klicka på bilden :D :PpPP', 3),
(16, 'Samlade bilder.', 'http://www.hej.se', 'riktigt bra', 3),
(17, 'Oj här var ett fotografi igen', 'http://www.1337.se', 'nytt foto :)))', 3),
(18, 'foto på 1337', 'http://www.leetboken.se', 'satan vad 1337', 3);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users`
(
  `id` int
(11) NOT NULL,
  `email` varchar
(100) DEFAULT NULL,
  `password` varchar
(200) DEFAULT NULL,
  `first_name` varchar
(20) DEFAULT NULL,
  `last_name` varchar
(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`
id`,
`email
`, `password`, `first_name`, `last_name`) VALUES
(1, 'okej@okej.se', '$2b$10$cvEgyjuhd9aCi1OZwl6HYu7WuvLuD/YfIpye5bDvWzxgqk1JGgTEW', 'lmao', 'lmao'),
(2, 'admin@admin.io', '$2b$10$k/80avSe0g/QfcQYYFsk0OcTIjwPveVpxrhFT9znlsOwgDkhCltMW', 'admin', 'admin'),
(3, 'gustaf@gustaf.io', '$2b$10$oH5iVUHAjuBFuiJyCGjWNu5rbpJK8/d5kTcCRURkQlpXIGWvKdsLe', 'Gustaf', 'Grönlund'),
(4, 'password@password.io', '$2b$10$NhvmcAQUGQKb3pxeg2ZQ8.mtS.herafjiBQCN9WFrlkiaAtPjUk6W', 'Lösenord', 'Är gött');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Albums`
--
ALTER TABLE `Albums`
ADD PRIMARY KEY
(`id`);

--
-- Indexes for table `Albums_Photos`
--
ALTER TABLE `Albums_Photos`
ADD PRIMARY KEY
(`id`),
ADD KEY `photo_id`
(`photo_id`),
ADD KEY `album_id`
(`album_id`);

--
-- Indexes for table `Photos`
--
ALTER TABLE `Photos`
ADD PRIMARY KEY
(`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Albums`
--
ALTER TABLE `Albums`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Albums_Photos`
--
ALTER TABLE `Albums_Photos`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `Photos`
--
ALTER TABLE `Photos`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Albums_Photos`
--
ALTER TABLE `Albums_Photos`
ADD CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY
(`photo_id`) REFERENCES `Photos`
(`id`),
ADD CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY
(`album_id`) REFERENCES `Albums`
(`id`);
*/