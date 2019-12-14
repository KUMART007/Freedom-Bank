DROP DATABASE IF EXISTS freedombank_db;
CREATE DATABASE freedombank_db;
USE freedombank_db;

CREATE TABLE user (
    id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE account (
    balance DECIMAL(10,2)
);

