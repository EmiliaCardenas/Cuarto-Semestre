-- Ejemplo 1

DELIMITER $$

CREATE PROCEDURE RegistrarEntrega (
    IN p_clave VARCHAR(10),
    IN p_rfc VARCHAR(13),
    IN p_numeroProyecto INT,
    IN p_fecha DATE,
    IN p_cantidad INT
)
BEGIN
    DECLARE v_existencia INT;

    -- Verificar si el material existe
    SELECT COUNT(*) INTO v_existencia
    FROM Materiales
    WHERE Clave = p_clave;

    IF v_existencia = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El material no existe.';
    ELSE
        INSERT INTO Entregan (Clave, RFC, Numero, Fecha, Cantidad)
        VALUES (p_clave, p_rfc, p_numeroProyecto, p_fecha, p_cantidad);
    END IF;
END$$

DELIMITER ;


-- Ejemplo 2

DELIMITER $$

CREATE PROCEDURE CalcularCostosDesdeTemp ()
BEGIN
    DECLARE fin INT DEFAULT 0;
    DECLARE v_clave VARCHAR(10);
    DECLARE v_costo DECIMAL(10,2);
    DECLARE v_impuesto DECIMAL(5,2);
    DECLARE v_total DECIMAL(10,2);

    DECLARE cur CURSOR FOR
        SELECT Clave FROM MaterialesTemp;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin = 1;

    OPEN cur;

    WHILE fin = 0 DO
        FETCH cur INTO v_clave;

        IF fin = 0 THEN
            SELECT Costo, PorcentajeImpuesto
            INTO v_costo, v_impuesto
            FROM Materiales
            WHERE Clave = v_clave;

            SET v_total = v_costo + (v_costo * v_impuesto / 100);

            SELECT CONCAT('Material: ', v_clave, ' | Total con impuesto: ', v_total) AS Resultado;
        END IF;
    END WHILE;

    CLOSE cur;
END$$

DELIMITER ;


-- Ejemplo 3
DELIMITER $$

CREATE PROCEDURE EntregasPorProveedorYFecha (
    IN p_rfc VARCHAR(13),
    IN p_fecha DATE
)
BEGIN
    SELECT E.Clave, M.Descripcion, E.Numero, P.Denominacion, E.Cantidad
    FROM Entregan E
    JOIN Materiales M ON E.Clave = M.Clave
    JOIN Proyectos P ON E.Numero = P.Numero
    WHERE E.RFC = p_rfc AND E.Fecha = p_fecha;
END$$

DELIMITER ;

