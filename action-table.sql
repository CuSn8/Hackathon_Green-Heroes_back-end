CREATE TABLE IF NOT EXISTS `actions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100),
    `description` TEXT,
    `type` VARCHAR(100),
    `author` INT,
    `start_date` DATE,
    `start_hour` TIME,
    `x_coor` DOUBLE(8, 6),
    `y_coor` DOUBLE(8, 6),
    `street_number` VARCHAR(10),
    `street_name` VARCHAR(255),
    `zip_code` VARCHAR(20),
    `city` VARCHAR(100),
    `country` VARCHAR(100),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;