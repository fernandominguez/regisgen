CREATE USER `regisgen`@`%` IDENTIFIED BY 'negsiger';

GRANT ALL PRIVILEGES ON `regisgen` . * TO `regisgen`@`%`;
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS `regisgen`;

USE `regisgen`;

CREATE TABLE `regisgen`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(9) NOT NULL,
  `mobile` VARCHAR(9) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC)
);

CREATE TABLE `regisgen`.`menus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parent` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `icon` VARCHAR(45) NOT NULL,
  `href` VARCHAR(255) NOT NULL,
  `order` INT NOT NULL,
  `lang` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `order_UNIQUE` (`lang` ASC, `order` ASC)
);

INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'user-menu', 'user-circle', '#!', 100, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'user-menu', 'user-circle', '#!', 100, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Registry Book', 'inbox', '#!/registry', 200, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Libro de Registro', 'inbox', '#!/registry', 200, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Thirdparties', 'users', '#!/registry/thirdparties', 210, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Terceros', 'users', '#!/registry/thirdparties', 210, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Departments', 'building', '#!/registry/departments', 220, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Departamentos', 'building', '#!/registry/departments', 220, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Configuration', 'cog', '#!', 300, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Configuración', 'cog', '#!', 300, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (5, 'Users', 'users', '#!/config/users', 310, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (6, 'Usuarios', 'users', '#!/config/users', 310, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (5, 'Menus permissions', 'flash', '#!/config/permissions', 320, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (6, 'Permisos de Menús', 'flash', '#!/config/permissions', 320, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (5, 'Menus', 'ellipsis-v', '#!/config/menus', 330, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (6, 'Menús', 'ellipsis-v', '#!/config/menus', 330, 'es');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Log out', 'power-off', '#!/logout', 999, 'en');
INSERT INTO `regisgen`.`menus` (`parent`, `name`, `icon`, `href`, `order`, `lang`) VALUES (0, 'Salir', 'power-off', '#!/logout', 999, 'es');

CREATE TABLE `regisgen`.`permissions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lang` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`lang` ASC, `name` ASC)
);

INSERT INTO `regisgen`.`permissions` (`name`, `lang`) VALUES ('Administrator', 'en');
INSERT INTO `regisgen`.`permissions` (`name`, `lang`) VALUES ('Administrador', 'es');
INSERT INTO `regisgen`.`permissions` (`name`, `lang`) VALUES ('User', 'en');
INSERT INTO `regisgen`.`permissions` (`name`, `lang`) VALUES ('Usuario', 'es');

CREATE TABLE `regisgen`.`permissions-menus` (
  `id-permission` INT NOT NULL,
  `id-menu` INT NOT NULL,
  `crude` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id-permission`, `id-menu`)
);

INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 1, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 2, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 3, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 4, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 5, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 6, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 7, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 8, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 9, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 10, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 11, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 12, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 13, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 14, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 15, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 16, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 17, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (1, 18, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 1, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 2, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 3, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 4, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 5, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 6, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 7, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 8, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 9, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 10, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 11, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 12, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 13, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 14, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 15, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 16, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 17, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (2, 18, 'crude');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 1, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 2, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 3, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 4, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 13, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (3, 14, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 1, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 2, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 3, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 4, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 13, 'cre');
INSERT INTO `regisgen`.`permissions-menus` (`id-permission`, `id-menu`, `crude`) VALUES (4, 14, 'cre');

CREATE TABLE `regisgen`.`users-permissions` (
  `id-user` INT NOT NULL,
  `id-permission` INT NOT NULL,
  PRIMARY KEY (`id-user`, `id-permission`)
);

INSERT INTO `regisgen`.`users-permissions` (`id-user`,`id-permission`) VALUES (1, 1);
INSERT INTO `regisgen`.`users-permissions` (`id-user`,`id-permission`) VALUES (1, 2);

CREATE OR REPLACE VIEW `regisgen`.`v-user-menus` AS
  SELECT DISTINCT
    m.`id`     AS menuId,
    m.`parent` AS menuParent,
    m.`name`   AS menuName,
    m.`icon`   AS menuIcon,
    m.`href`   AS menuHref,
    m.`order`  AS menuOrder,
    m.`lang`   AS menuLang,
    pm.`crude` AS permissionCrude,
    u.`id`     AS userId,
    p.`id`     AS permissionId
  FROM `users` u
  LEFT JOIN `users-permissions` up ON u.`id` = up.`id-user`
  LEFT JOIN `permissions` p ON up.`id-permission` = p.`id`
  LEFT JOIN `permissions-menus` pm ON p.`id` = pm.`id-permission`
  LEFT JOIN `menus` m ON pm.`id-menu` = m.`id`;

CREATE OR REPLACE VIEW `regisgen`.`v-menus-tree` AS
  SELECT
    c.`id`   AS childId,
    c.`name` AS childName,
    c.`icon` AS childIcon,
    c.`href` AS childHref,
    c.`lang` AS childLang,
    p.`id`   AS parentId,
    CASE
      WHEN p.`order` IS NULL THEN c.`order` * 10
      ELSE c.`order` + p.`order` * 10
    END AS menuOrder,
    pm.`id-permission` AS role,
    pm.`crude` AS crude
  FROM `menus` c
  LEFT JOIN `menus` p ON c.`parent` = p.`id`
  LEFT JOIN `permissions-menus` pm ON c.`id` = pm.`id-menu`
  ORDER BY menuOrder;

CREATE TABLE `regisgen`.`registry` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(25) NOT NULL,
  `type` VARCHAR(1) NOT NULL,
  `subtype` VARCHAR(1) NOT NULL,
  `date` DATETIME NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT(2000) NOT NULL,
  `origin` INT NOT NULL,
  `destiny` INT NOT NULL,
  `channel` INT NULL,
  `tag` INT NULL,
  `state` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `regisgen`.`files` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `size` DOUBLE NOT NULL,
  `content` MEDIUMBLOB NOT NULL,
  `checksum` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `regisgen`.`registry-files` (
  `id-registry` BIGINT NOT NULL,
  `id-file` BIGINT NOT NULL,
  PRIMARY KEY (`id-registry`, `id-file`)
);

DROP PROCEDURE IF EXISTS createRegistrySequence;

DELIMITER //

CREATE PROCEDURE createRegistrySequence(ptype VARCHAR(1), psubtype VARCHAR(1), pyear INT, pstart INT, pinc INT)
  BEGIN
    CREATE TABLE IF NOT EXISTS _sequences_registry (
      `type` VARCHAR(1) NOT NULL,
      `subtype` VARCHAR(1) NOT NULL,
      `year` INT(4) NOT NULL,
      `next` BIGINT NOT NULL,
      `inc` INT NOT NULL,
      UNIQUE INDEX `_sequences_registry_UNIQUE` (`type`, `subtype`, `year`)
    );
    INSERT INTO _sequences_registry VALUES (ptype, psubtype, pyear, pstart, pinc);
  END
//

DELIMITER ;

DROP PROCEDURE IF EXISTS dropRegistrySequence;

DELIMITER //

CREATE PROCEDURE dropRegistrySequence(ptype VARCHAR(1), psubtype VARCHAR(1), pyear INT)
  BEGIN
    DECLARE vexists INT;

    SELECT IFNULL(COUNT(`table_name`), 0) INTO vexists
      FROM `information_schema`.`tables`
     WHERE `table_schema` = 'regisgen'
       AND `table_name` = '_sequences_registry'
     LIMIT 1;

    IF vexists > 0 THEN
      DELETE FROM _sequences_registry WHERE `type` = ptype AND `subtype` = psubtype AND `year` = pyear;
    END IF;
  END
//

DELIMITER ;

DROP FUNCTION IF EXISTS registryNextNumber;

DELIMITER //

CREATE FUNCTION registryNextNumber(ptype VARCHAR(1), psubtype VARCHAR(1), pyear INT)
    RETURNS BIGINT
  BEGIN
    DECLARE vinc INT;

    SELECT `inc` INTO vinc
      FROM _sequences_registry
     WHERE `type` = ptype
       AND `subtype` = psubtype
       AND `year` = pyear;

    UPDATE _sequences_registry
       SET `next` = (@next := `next`) + vinc
     WHERE `type` = ptype
       AND `subtype` = psubtype
       AND `year` = pyear;

    RETURN @next;
  END
//

DELIMITER ;

DROP PROCEDURE IF EXISTS initRegistrySequence;

DELIMITER //

CREATE PROCEDURE initRegistrySequence(ptype VARCHAR(1), psubtype VARCHAR(1), pyear INT, pstart INT, pinc INT)
  BEGIN
    DECLARE vinit BIGINT;

    SELECT IFNULL(COUNT(`number`), 0) INTO vinit
      FROM registry
     WHERE `type` = ptype
       AND `subtype` = psubtype
       AND `date` BETWEEN
     CONCAT(pyear, '-01-01 00:00:00') AND
     DATE_ADD(CONCAT(pyear, '-01-01 00:00:00'), INTERVAL 1 YEAR);

    IF vinit <= 0 THEN
      CALL dropRegistrySequence(ptype, psubtype, pyear);
      CALL createRegistrySequence(ptype, psubtype, pyear, pstart, pinc);
    END IF;
  END
//

DELIMITER ;

CREATE TABLE `regisgen`.`thirdparties` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(9) NULL,
  `email` VARCHAR(255) NULL,
  `identifier` VARCHAR(20) NULL,
  `islegal` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE OR REPLACE VIEW `v-last-year-registry-max-id` AS
 SELECT IFNULL(MAX(`id`),0) maxid
   FROM `registry`
   WHERE `date` BETWEEN
     CONCAT(YEAR(NOW())-1, '-01-01 00:00:00') AND
     DATE_ADD(CONCAT(YEAR(NOW())-1, '-01-01 00:00:00'), INTERVAL 1 YEAR);

CREATE TABLE `regisgen`.`departments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NOT NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(9) NULL,
  `email` VARCHAR(255) NULL,
  `office` VARCHAR(3) NULL,
  PRIMARY KEY (`id`)
);
