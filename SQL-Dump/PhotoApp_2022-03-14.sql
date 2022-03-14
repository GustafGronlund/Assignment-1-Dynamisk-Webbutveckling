# ************************************************************
# Sequel Ace SQL dump
# Version 20031
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: localhost (MySQL 5.7.32)
# Database: PhotoApp
# Generation Time: 2022-03-14 14:24:16 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table Albums
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Albums`;

CREATE TABLE `Albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Albums` WRITE;
/*!40000 ALTER TABLE `Albums` DISABLE KEYS */;

INSERT INTO `Albums` (`id`, `title`, `user_id`)
VALUES
	(2,'Samlade bilder.',3),
	(3,'mitt fina andra album',3),
	(4,'den är uppdaterad',3),
	(5,'BÄSTA ALBUMET I DATABASEN',4),
	(6,'kan jag byta här',5),
	(7,'Ett litet fotoalbum vare här',7);

/*!40000 ALTER TABLE `Albums` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Albums_Photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Albums_Photos`;

CREATE TABLE `Albums_Photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `photo_id` (`photo_id`),
  KEY `album_id` (`album_id`),
  CONSTRAINT `albums_photos_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `Photos` (`id`),
  CONSTRAINT `albums_photos_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `Albums` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Albums_Photos` WRITE;
/*!40000 ALTER TABLE `Albums_Photos` DISABLE KEYS */;

INSERT INTO `Albums_Photos` (`id`, `photo_id`, `album_id`)
VALUES
	(8,2,14),
	(9,2,15),
	(10,4,18),
	(11,4,8),
	(12,4,17),
	(16,3,14),
	(17,4,15),
	(18,4,15),
	(19,4,15),
	(20,4,15),
	(21,6,19),
	(22,6,19),
	(24,7,20);

/*!40000 ALTER TABLE `Albums_Photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Photos
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE `Photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `url` varchar(250) NOT NULL,
  `comment` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Photos` WRITE;
/*!40000 ALTER TABLE `Photos` DISABLE KEYS */;

INSERT INTO `Photos` (`id`, `title`, `url`, `comment`, `user_id`)
VALUES
	(8,'spoket laban','http://www.leet.se','tju leen',1),
	(9,'Handbok för admin','http://adminhacker.se','jag er en c00l admin',2),
	(13,'okej nu tror jag att det funkar här va','https://www.amazon.se/Bitcoin-Standard-Decentralized-Alternative-Central/dp/1119473861/ref=asc_df_1119473861/?tag=shpngadsglede-21&linkCode=df0&hvadid=476518399397&hvpos=&hvnetw=g&hvrand=12273484489475216442&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&h','fan nu funkar det nog!',3),
	(14,'en grogg yeees','https://www.tovejansson.se','bild på en drink hehe',3),
	(15,'Fotografi på någonting.','https://virus.io','Klicka på bilden :D :PpPP',3),
	(16,'Samlade bilder.','http://www.hej.se','riktigt bra',3),
	(17,'Oj här var ett fotografi igen','http://www.1337.se','nytt foto :)))',3),
	(18,'foto på 1337','http://www.leetboken.se','satan vad 1337',3),
	(19,'kan jag byta','http://www.ensidamedvirus.se','ja men det funkar',5),
	(20,'Pippi Långstrump här','www.minhemsida.io','php är king',7);

/*!40000 ALTER TABLE `Photos` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `email`, `password`, `first_name`, `last_name`)
VALUES
	(1,'okej@okej.se','$2b$10$cvEgyjuhd9aCi1OZwl6HYu7WuvLuD/YfIpye5bDvWzxgqk1JGgTEW','lmao','lmao'),
	(2,'admin@admin.io','$2b$10$k/80avSe0g/QfcQYYFsk0OcTIjwPveVpxrhFT9znlsOwgDkhCltMW','admin','admin'),
	(3,'gustaf@gustaf.io','$2b$10$oH5iVUHAjuBFuiJyCGjWNu5rbpJK8/d5kTcCRURkQlpXIGWvKdsLe','Gustaf','Grönlund'),
	(4,'password@password.io','$2b$10$NhvmcAQUGQKb3pxeg2ZQ8.mtS.herafjiBQCN9WFrlkiaAtPjUk6W','Lösenord','Är gött'),
	(5,'testuser@testuser.io','$2b$10$o8hGoLt9/9Op5PidWhIVuu6ksONWTxI9O8kIvzt8qPMmbZaralA2C','tester','tester'),
	(6,'testuser@testuser33.io','$2b$10$BMitnBX5vsVzmyHZ6waM8uejIKmf6PizS9e5sWfd4I4zxBUjA6bN6','t33ster','te33ster'),
	(7,'petter@petter.io','$2b$10$xiB0Y/4qdwoCtcqOLK6hKuhh7caXsLI42BxcA3mHcFKm.TiHutrdS','Petter','Last_name');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
