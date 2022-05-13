CREATE TABLE `users_actions` (
  `user_id` INT,
  `action_id` INT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
ALTER TABLE `users_actions` ADD FOREIGN KEY (`user_id`) REFERENCES `user_profiles`(`id`) ON DELETE SET NULL;
ALTER TABLE `users_actions` ADD FOREIGN KEY (`action_id`) REFERENCES `actions`(`id`) ON DELETE SET NULL;