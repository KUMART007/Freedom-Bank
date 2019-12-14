DROP DATABASE IF EXISTS freedombank_db;
CREATE DATABASE freedombank_db;
USE freedombank_db;

CREATE TABLE user (
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

