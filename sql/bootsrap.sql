CREATE DATABASE IF NOT EXISTS `shorty`;

USE `shorty`;

DROP TABLE IF EXISTS `contact_type`;
CREATE TABLE `contact_type`
(
    id    INT AUTO_INCREMENT,
    value VARCHAR(20) NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
INSERT INTO `contact_type` (`value`)
VALUES ('name'),
       ('surname'),
       ('role');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`
(
    id              INT AUTO_INCREMENT,
    external_id     VARCHAR(36)  NOT NULL UNIQUE,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR(255) NOT NULL,
    created_at      DATETIME     NOT NULL DEFAULT NOW(),
    last_login      DATETIME              DEFAULT NULL,
    account_enabled TINYINT      NOT NULL DEFAULT FALSE,
    refresh_token   TEXT,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `user_contact`;
CREATE TABLE `user_contact`
(
    user_id         INT(11)      NOT NULL,
    contact_type_id INT(11)      NOT NULL,
    value           VARCHAR(255) NOT NULL,
    FOREIGN KEY fk_user (user_id)
        REFERENCES `user` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY fk_contact_type (contact_type_id)
        REFERENCES `contact_type` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

ALTER TABLE `user_contact`
    ADD UNIQUE (user_id, contact_type_id);

DROP TABLE IF EXISTS `host`;
CREATE TABLE `host`
(
    id          INT AUTO_INCREMENT,
    external_id VARCHAR(36)  NOT NULL UNIQUE,
    full_url    VARCHAR(255) NOT NULL,
    short_url   varchar(25)  NOT NULL UNIQUE,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `url`;
CREATE TABLE `url`
(
    id          INT AUTO_INCREMENT,
    external_id VARCHAR(36)  NOT NULL,
    source_url  VARCHAR(255) NOT NULL,
    target_url  VARCHAR(255) NOT NULL,
    active      TINYINT      NOT NULL DEFAULT TRUE,
    custom_url  TINYINT      NOT NULL DEFAULT FALSE,
    created_at  DATETIME     NOT NULL DEFAULT NOW(),
    author_id   INT          NOT NULL,
    host_id     INT          NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_author (author_id)
        REFERENCES `user` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY fk_host (host_id)
        REFERENCES `host` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `browser`;
CREATE TABLE `browser`
(
    id          INT         NOT NULL AUTO_INCREMENT,
    external_id VARCHAR(36) NOT NULL,
    name        VARCHAR(50),
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `os`;
CREATE TABLE `os`
(
    id          INT         NOT NULL AUTO_INCREMENT,
    external_id VARCHAR(36) NOT NULL,
    name        VARCHAR(50),
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `device_type`;
CREATE TABLE `device_type`
(
    id   INT         NOT NULL AUTO_INCREMENT,
    type varchar(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY id (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

INSERT INTO `device_type` (`type`)
VALUES ('mobile'),
       ('tablet'),
       ('desktop'),
       ('other');

DROP TABLE IF EXISTS `stat`;
CREATE TABLE `stat`
(
    id         INT          NOT NULL AUTO_INCREMENT,
    url_id     INT          NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT NOW(),
    browser_id INT          NOT NULL,
    os_id      INT          NOT NULL,
    device_id  INT          NOT NULL,
    referrer   VARCHAR(255) NOT NULL,
    country    VARCHAR(5)   NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_url (url_id)
        REFERENCES `url` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY fk_browser (browser_id)
        REFERENCES `browser` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY fk_os (os_id)
        REFERENCES `os` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY fk_device (device_id)
        REFERENCES `device_type` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

DROP TABLE IF EXISTS `api_key`;
CREATE TABLE `api_key`
(
    id         INT          NOT NULL AUTO_INCREMENT,
    created_at DATETIME     NOT NULL DEFAULT NOW(),
    `issuer`   VARCHAR(255) NOT NULL UNIQUE,
    `key`      VARCHAR(255) NOT NULL UNIQUE,
    active     TINYINT      NOT NULL DEFAULT FALSE,
    user_id    INT(11)      NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY fk_user (user_id)
        REFERENCES `user` (id)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
