/*
CREATE TABLE `sureserve`.`users` ( 
    `id` INT NOT NULL AUTO_INCREMENT ,
    `username` VARCHAR(40) NOT NULL ,
    `email` VARCHAR(255) NOT NULL ,
    `password` VARCHAR(80) NOT NULL ,
    `creation_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (`id`),
    UNIQUE (`username`),
    UNIQUE (`email`))
*/