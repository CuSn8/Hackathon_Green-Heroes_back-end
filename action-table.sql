CREATE TABLE IF NOT EXISTS `user_profiles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100),
    `description` VARCHAR(100),
    `author` INT,
    `start_date` DATETIME,
    `end_date` DATETIME,

    `email` VARCHAR(100) UNIQUE,
    `password` VARCHAR(100),
    `street_number` VARCHAR(100),
    `street_name` VARCHAR(255),
    `zip_code` INT,
    `city` VARCHAR(255),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;