CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    correo VARCHAR(100),
    fecha_registro DATETIME
);

CREATE TABLE auditoria_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(10),
    fecha DATETIME
);


DELIMITER //

CREATE TRIGGER before_insert_usuario
BEFORE INSERT ON usuarios
FOR EACH ROW
BEGIN
  SET NEW.fecha_registro = NOW();
END;
//

DELIMITER ;


DELIMITER //

CREATE TRIGGER after_delete_usuario
AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_usuarios(usuario_id, accion, fecha)
  VALUES (OLD.id, 'DELETE', NOW());
END;
//

DELIMITER ;
