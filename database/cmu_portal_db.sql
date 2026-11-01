-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 13, 2026 at 04:04 AM
-- Server version: 8.0.45
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cmu_portal_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `LOG_ID` int NOT NULL,
  `USER_ID` int DEFAULT NULL,
  `MESSAGE` text NOT NULL,
  `NOTIFICATION_TYPE` varchar(50) NOT NULL,
  `LOG_DATE` datetime DEFAULT CURRENT_TIMESTAMP,
  `IP_ADDRESS` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_catalog`
--

CREATE TABLE `document_catalog` (
  `CATALOG_ID` int NOT NULL,
  `DOCUMENT_NAME` varchar(100) NOT NULL,
  `DESCRIPTION` text,
  `REQUIRED_CLEARANCE` varchar(100) DEFAULT 'None',
  `PROCESSING_DAYS` int DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_requests`
--

CREATE TABLE `document_requests` (
  `REQUEST_ID` varchar(20) NOT NULL,
  `STUDENT_ID` int NOT NULL,
  `CATALOG_ID` int NOT NULL,
  `PURPOSE` varchar(150) NOT NULL,
  `QUANTITY` int DEFAULT '1',
  `REQUEST_DATE` date NOT NULL,
  `REQUEST_TIME` time NOT NULL,
  `STATUS_DESCRIPTION` varchar(50) DEFAULT 'Submits',
  `PROCESSED_BY` int DEFAULT NULL,
  `RELEASE_DATE` date DEFAULT NULL,
  `RELEASE_METHOD` varchar(50) NOT NULL,
  `RECEIVED_BY` varchar(100) DEFAULT NULL,
  `VERIFICATION_STATUS` varchar(50) DEFAULT 'Pending',
  `REQUIREMENT_SUBMISSION_DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_records`
--

CREATE TABLE `student_records` (
  `STUDENT_ID` int NOT NULL,
  `USER_ID` int DEFAULT NULL,
  `STUDENT_NO` varchar(20) DEFAULT NULL,
  `FIRST_NAME` varchar(50) NOT NULL,
  `LAST_NAME` varchar(50) NOT NULL,
  `EMAIL` varchar(100) DEFAULT NULL,
  `CONTACT_NO` varchar(20) DEFAULT NULL,
  `YEAR_LEVEL` varchar(20) DEFAULT NULL,
  `PROGRAM` varchar(50) DEFAULT NULL,
  `ALUMNI_ID` varchar(30) DEFAULT NULL,
  `IS_ALUMNI` tinyint(1) DEFAULT '0',
  `YEAR_GRADUATED` int DEFAULT NULL,
  `DEGREE_EARNED` varchar(100) DEFAULT NULL,
  `GRADUATION_STATUS` varchar(50) DEFAULT 'Enrolled'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `USER_ID` int NOT NULL,
  `STAFF_NAME` varchar(100) DEFAULT NULL,
  `ROLE` varchar(50) NOT NULL,
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD_HASH` varchar(255) NOT NULL,
  `CREATED_AT` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`LOG_ID`),
  ADD KEY `USER_ID` (`USER_ID`);

--
-- Indexes for table `document_catalog`
--
ALTER TABLE `document_catalog`
  ADD PRIMARY KEY (`CATALOG_ID`);

--
-- Indexes for table `document_requests`
--
ALTER TABLE `document_requests`
  ADD PRIMARY KEY (`REQUEST_ID`),
  ADD KEY `STUDENT_ID` (`STUDENT_ID`),
  ADD KEY `CATALOG_ID` (`CATALOG_ID`),
  ADD KEY `PROCESSED_BY` (`PROCESSED_BY`);

--
-- Indexes for table `student_records`
--
ALTER TABLE `student_records`
  ADD PRIMARY KEY (`STUDENT_ID`),
  ADD UNIQUE KEY `USER_ID` (`USER_ID`),
  ADD UNIQUE KEY `STUDENT_NO` (`STUDENT_NO`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `LOG_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document_catalog`
--
ALTER TABLE `document_catalog`
  MODIFY `CATALOG_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_records`
--
ALTER TABLE `student_records`
  MODIFY `STUDENT_ID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `USER_ID` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE SET NULL;

--
-- Constraints for table `document_requests`
--
ALTER TABLE `document_requests`
  ADD CONSTRAINT `document_requests_ibfk_1` FOREIGN KEY (`STUDENT_ID`) REFERENCES `student_records` (`STUDENT_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_requests_ibfk_2` FOREIGN KEY (`CATALOG_ID`) REFERENCES `document_catalog` (`CATALOG_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `document_requests_ibfk_3` FOREIGN KEY (`PROCESSED_BY`) REFERENCES `users` (`USER_ID`) ON DELETE SET NULL;

--
-- Constraints for table `student_records`
--
ALTER TABLE `student_records`
  ADD CONSTRAINT `student_records_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
