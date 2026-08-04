-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2026 at 09:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expense_tracking_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `loan_type` enum('given','borrowed') NOT NULL,
  `person_name` varchar(255) NOT NULL,
  `original_amount` decimal(10,2) NOT NULL,
  `remaining_amount` decimal(10,2) NOT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('active','completed') DEFAULT 'active',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `user_id`, `loan_type`, `person_name`, `original_amount`, `remaining_amount`, `due_date`, `status`, `notes`, `created_at`) VALUES
(2, 1, 'given', 'Ali Khan', 5000.00, 5000.00, '2026-06-05', 'active', 'Business support loan', '2026-07-10 07:38:24'),
(3, 1, 'borrowed', 'Sara Ahmed', 2500.00, 2500.00, '2026-06-10', 'active', 'Short-term personal loan', '2026-07-10 07:38:24'),
(4, 1, 'given', 'Usman Raza', 1200.00, 1200.00, '2026-06-12', 'active', 'Family help', '2026-07-10 07:38:24'),
(5, 1, 'borrowed', 'Hassan Ali', 1800.00, 1800.00, '2026-06-15', 'active', 'Laptop repair money', '2026-07-10 07:38:24'),
(6, 1, 'given', 'Ayesha Noor', 3000.00, 3000.00, '2026-06-18', 'active', 'Medical emergency support', '2026-07-10 07:38:24'),
(7, 1, 'borrowed', 'Bilal Shah', 1500.00, 1500.00, '2026-06-20', 'active', 'Rent adjustment', '2026-07-10 07:38:24'),
(8, 1, 'given', 'Fahad Iqbal', 2200.00, 2200.00, '2026-06-22', 'active', 'Car repair loan', '2026-07-10 07:38:24'),
(9, 1, 'borrowed', 'Mariam Khan', 900.00, 900.00, '2026-06-24', 'active', 'Travel expenses', '2026-07-10 07:38:24'),
(10, 1, 'given', 'Zain Malik', 4000.00, 4000.00, '2026-06-26', 'active', 'Equipment purchase support', '2026-07-10 07:38:24'),
(11, 1, 'borrowed', 'Hira Javed', 1600.00, 1600.00, '2026-06-28', 'active', 'Education expenses', '2026-07-10 07:38:24'),
(12, 1, 'given', 'Kashif Bashir', 2750.00, 2750.00, '2026-06-29', 'active', 'Temporary cash support', '2026-07-10 07:38:24'),
(13, 1, 'borrowed', 'Noor Fatima', 2100.00, 2100.00, '2026-06-30', 'active', 'Weekend emergency loan', '2026-07-10 07:38:24');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('expense','allowance','income','gift') NOT NULL,
  `category` enum('Food','Coffee','Beer','Dates','Petrol','Bike Servicing','Shopping','Academic') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `transaction_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `type`, `category`, `title`, `amount`, `transaction_date`, `created_at`) VALUES
(68, 1, 'income', NULL, 'Monthly Salary', 4500.00, '2026-06-01', '2026-07-10 07:31:50'),
(69, 1, 'expense', 'Food', 'Groceries', 320.50, '2026-06-01', '2026-07-10 07:31:50'),
(70, 1, 'expense', 'Coffee', 'Morning Coffee', 18.00, '2026-06-02', '2026-07-10 07:31:50'),
(71, 1, 'expense', 'Petrol', 'Fuel Top-Up', 65.00, '2026-06-03', '2026-07-10 07:31:50'),
(72, 1, 'expense', 'Shopping', 'T-Shirt and Essentials', 210.75, '2026-06-04', '2026-07-10 07:31:50'),
(73, 1, 'expense', 'Academic', 'Books and Study Notes', 145.00, '2026-06-05', '2026-07-10 07:31:50'),
(74, 1, 'expense', 'Dates', 'Dinner Date', 280.00, '2026-06-06', '2026-07-10 07:31:50'),
(75, 1, 'expense', 'Beer', 'Weekend Drinks', 95.00, '2026-06-07', '2026-07-10 07:31:50'),
(76, 1, 'expense', 'Bike Servicing', 'Bike Service', 180.00, '2026-06-08', '2026-07-10 07:31:50'),
(77, 1, 'expense', 'Food', 'Lunch and Snacks', 125.20, '2026-06-09', '2026-07-10 07:31:50'),
(78, 1, 'allowance', NULL, 'Travel Allowance', 300.00, '2026-06-10', '2026-07-10 07:31:50'),
(79, 1, 'expense', 'Coffee', 'Cafe Visit', 24.50, '2026-06-11', '2026-07-10 07:31:50'),
(80, 1, 'expense', 'Shopping', 'Phone Accessories', 160.00, '2026-06-12', '2026-07-10 07:31:50'),
(81, 1, 'expense', 'Petrol', 'Fuel Top-Up', 72.30, '2026-06-13', '2026-07-10 07:31:50'),
(82, 1, 'expense', 'Academic', 'Online Course Fee', 220.00, '2026-06-14', '2026-07-10 07:31:50'),
(83, 1, 'gift', NULL, 'Birthday Gift Received', 150.00, '2026-06-15', '2026-07-10 07:31:50'),
(84, 1, 'expense', 'Dates', 'Movie and Dinner', 340.00, '2026-06-16', '2026-07-10 07:31:50'),
(85, 1, 'expense', 'Food', 'Weekly Groceries', 410.80, '2026-06-17', '2026-07-10 07:31:50'),
(86, 1, 'expense', 'Beer', 'Night Out', 130.00, '2026-06-18', '2026-07-10 07:31:50'),
(87, 1, 'expense', 'Coffee', 'Coffee with Friends', 35.00, '2026-06-19', '2026-07-10 07:31:50'),
(88, 1, 'expense', 'Shopping', 'Clothing Purchase', 275.90, '2026-06-20', '2026-07-10 07:31:50'),
(89, 1, 'expense', 'Petrol', 'Fuel Top-Up', 68.40, '2026-06-21', '2026-07-10 07:31:50'),
(90, 1, 'expense', 'Academic', 'Exam Registration', 300.00, '2026-06-22', '2026-07-10 07:31:50'),
(91, 1, 'expense', 'Bike Servicing', 'Tire and Chain Service', 240.00, '2026-06-23', '2026-07-10 07:31:50'),
(92, 1, 'expense', 'Dates', 'Coffee Date', 110.00, '2026-06-24', '2026-07-10 07:31:50'),
(93, 1, 'income', NULL, 'Freelance Payment', 1200.00, '2026-06-25', '2026-07-10 07:31:50'),
(94, 1, 'expense', 'Food', 'Takeaway Dinner', 155.75, '2026-06-26', '2026-07-10 07:31:50'),
(95, 1, 'expense', 'Coffee', 'Cafe Breakfast', 22.00, '2026-06-27', '2026-07-10 07:31:50'),
(96, 1, 'expense', 'Shopping', 'Household Items', 190.00, '2026-06-28', '2026-07-10 07:31:50'),
(99, 8, 'expense', 'Food', 'haluwa swari', 100.00, '2026-07-29', '2026-07-29 11:17:12'),
(100, 8, 'expense', 'Food', 'aluchop and coffee at library', 230.00, '2026-07-29', '2026-07-29 11:17:55'),
(101, 8, 'income', NULL, 'weekly one', 3000.00, '2026-07-29', '2026-07-29 11:58:53'),
(102, 8, 'expense', 'Coffee', 'peach tea at yala chai', 60.00, '2026-07-30', '2026-07-30 08:00:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'abhi', 'abhi@gmail.com', '$2b$10$nxBz/2NHvATOrvePY0nhgOTm8xMSVOD0UcnZIqsNbLVa2Krrm3d8e', '2026-07-10 07:28:03'),
(8, 'avi', 'avi@gmail.com', '$2b$10$mHXenX79tr2gwpMYA08R2u.mW6r.u3X6hHUpCchuZil7KDHpBMnzC', '2026-07-29 11:12:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loans`
--
ALTER TABLE `loans`
  ADD CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
