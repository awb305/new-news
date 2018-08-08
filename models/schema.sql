DROP DATABASE IF EXISTS new_db
CREATE DATABASE news_db;
USE news_db;

CREATE TABLE users
(
	user_id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(75) NOT NULL,
	last_name VARCHAR (75) NOT NULL,
    email VARCHAR (100) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE articles
(
	article_id INT NOT NULL AUTO_INCREMENT,
	article_url VARCHAR(300),
    article_title VARCHAR (200) NOT NULL,
    number_of_ups INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE bundles
(
	id int NOT NULL AUTO_INCREMENT,
    user_id INT,
    article_id INT,
	article_title VARCHAR (200) NOT NULL,
	PRIMARY KEY (id)
);