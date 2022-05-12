CREATE TABLE IF NOT EXISTS `user_profiles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(100),
    `last_name` VARCHAR(100),
    `email` VARCHAR(100) UNIQUE,
    `password` VARCHAR(100),
    `street_number` VARCHAR(100),
    `street_name` VARCHAR(255),
    `zip_code` INT,
    `city` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;