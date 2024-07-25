

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


CREATE SCHEMA IF NOT EXISTS `db_projeto_integrador` DEFAULT CHARACTER SET utf8 ;
USE `db_projeto_integrador` ;

CREATE TABLE IF NOT EXISTS `db_projeto_integrador`.`tb_usuario` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `usuario` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(255) NOT NULL,
  `foto` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `db_projeto_integrador`.`tb_categoria` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(255) NOT NULL,
  `cargo` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS `db_projeto_integrador`.`tb_servico` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(500) NOT NULL,
  `contador` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `data` DATE NOT NULL,
  `status` TINYINT NOT NULL,
  `usuario_id` BIGINT NOT NULL,
  `categoria_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Serviço_Usuário_idx` (`usuario_id` ASC) VISIBLE,
  INDEX `fk_Serviço_Categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_Serviço_Usuário`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `db_projeto_integrador`.`tb_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Serviço_Categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `db_projeto_integrador`.`tb_categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
