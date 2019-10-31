-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 24, 2019 at 07:36 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `offered_things`
--

DROP TABLE IF EXISTS `offered_things`;
CREATE TABLE IF NOT EXISTS `offered_things` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thing_name` varchar(64) COLLATE utf8_hungarian_ci NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `details` varchar(1024) COLLATE utf8_hungarian_ci NOT NULL,
  `start_x` int(11) NOT NULL,
  `start_y` int(11) NOT NULL,
  `offer_date` timestamp NOT NULL,
  `start_dir` enum('horizontal','vertical') COLLATE utf8_hungarian_ci NOT NULL,
  `status` enum('WAREHOUSE','SUPPLIER','DELIVERED','DELIVERING','FRONT_OF_WAREHOUSE_1','FRONT_OF_WAREHOUSE_2','FRONT_OF_WAREHOUSE_TAKE') COLLATE utf8_hungarian_ci NOT NULL,
  `recipient_id` int(11) NOT NULL DEFAULT '-1',
  `dest_x` int(11) NOT NULL DEFAULT '-1',
  `dest_y` int(11) NOT NULL DEFAULT '-1',
  `order_date` timestamp NOT NULL,
  `delivery_date` timestamp NOT NULL,
  `warehouse_x` int(11) NOT NULL DEFAULT '-1',
  `warehouse_y` int(11) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `offered_things`
--

INSERT INTO `offered_things` (`id`, `thing_name`, `supplier_id`, `details`, `start_x`, `start_y`, `offer_date`, `start_dir`, `status`, `recipient_id`, `dest_x`, `dest_y`, `order_date`, `delivery_date`, `warehouse_x`, `warehouse_y`) VALUES
(1, 'Kenyér', 0, 'Hello', -1, -1, '2019-06-12 04:44:48', 'horizontal', 'FRONT_OF_WAREHOUSE_TAKE', 32, 0, 0, '2019-06-10 22:00:00', '2019-06-10 22:00:00', -1, -1),
(6, 'Kaposvár', 1, 'Nagy robotot hozzatok mer nem biztos, hogy elfér egy kocsiban, bár ezt elintézhetjük...', 5, 3, '2019-06-19 15:03:02', 'vertical', 'WAREHOUSE', -1, -1, -1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', -1, -1),
(3, 'Béla füle', 1, 'Nem.', 4, 5, '2019-06-05 18:00:00', 'horizontal', 'SUPPLIER', 0, 0, 0, '2019-06-10 22:00:00', '2019-06-10 22:00:00', -1, -1),
(5, 'Kecskelekvár', 1, 'Ez a leírása a kecskelekvárnak ni', 5, 3, '2019-06-19 11:42:53', 'vertical', 'DELIVERED', -1, -1, -1, '0000-00-00 00:00:00', '2019-06-20 22:19:00', -1, -1),
(7, 'Úszó kávésdoboz', 1, 'Nincsenek dítélek', 7, 1, '2019-06-19 15:07:10', 'vertical', 'SUPPLIER', -1, -1, -1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', -1, -1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(256) COLLATE utf8_hungarian_ci NOT NULL,
  `password_hash` varchar(256) COLLATE utf8_hungarian_ci NOT NULL,
  `nice_name` varchar(256) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `nice_name`) VALUES
(1, 'lolu', 'a@b.com', 'd6513498428181ba4bf1655f650b2610a59845feeceeba9c615662dce877aeb4', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
