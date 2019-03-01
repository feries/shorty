CREATE DATABASE `shorty`;

USE `shorty`;

DROP TABLE users;
CREATE TABLE users (
	id INT AUTO_INCREMENT,
	external_id VARCHAR(36) NOT NULL UNIQUE,
	email VARCHAR(100) NOT NULL UNIQUE,
	password BLOB NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	last_login TIMESTAMP,
	account_enabled TINYINT NOT NULL DEFAULT FALSE,
	refresh_token VARCHAR(250),
	PRIMARY KEY (id)
) ENGINE=INNODB;

DROP TABLE hosts;
CREATE TABLE hosts (
  id INT AUTO_INCREMENT,
	external_id VARCHAR(36) NOT NULL UNIQUE,
	full_url VARCHAR(255) NOT NULL,
	short_url varchar(25) NOT NULL UNIQUE,
	PRIMARY KEY (id),
) ENGINE=INNODB;

DROP TABLE urls;
CREATE TABLE urls(
	id INT AUTO_INCREMENT,
	external_id VARCHAR(36) NOT NULL,
	source_url VARCHAR(255) NOT NULL,
	target_url VARCHAR(255) NOT NULL,
	active TINYINT NOT NULL DEFAULT TRUE,
	custom_url TINYINT NOT NULL DEFAULT FALSE,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	author_id INT NOT NULL,
	host_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY fk_author(author_id)
		REFERENCES users(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	FOREIGN KEY fk_host(host_id)
		REFERENCES hosts(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
) ENGINE=INNODB;

DROP TABLE browsers;
CREATE TABLE browsers (
	id INT NOT NULL AUTO_INCREMENT,
	external_id VARCHAR(36) NOT NULL,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

DROP TABLE oss;
CREATE TABLE oss (
	id INT NOT NULL AUTO_INCREMENT,
	external_id VARCHAR(36) NOT NULL,
	name VARCHAR(50),
	PRIMARY KEY (id)
);

DROP TABLE stats;
CREATE TABLE stats (
	id INT NOT NULL AUTO_INCREMENT,
	url_id INT NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	browser_id INT NOT NULL,
	os_id INT NOT NULL,
	is_mobile BOOLEAN NOT NULL,
	referrer VARCHAR(255) NOT NULL,
	country VARCHAR(5) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY fk_url(url_id)
		REFERENCES urls(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	FOREIGN KEY fk_browser(browser_id)
		REFERENCES browsers(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION,
	FOREIGN KEY fk_os(os_id)
		REFERENCES oss(id)
		ON UPDATE NO ACTION
		ON DELETE NO ACTION
) ENGINE=INNODB;

DROP TABLE `keys`;
CREATE TABLE `keys` (
	id INT NOT NULL AUTO_INCREMENT,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`issuer` VARCHAR(255) NOT NULL UNIQUE,
	`key` VARCHAR(255) NOT NULL UNIQUE,
	PRIMARY KEY (id)
) ENGINE=INNODB;
