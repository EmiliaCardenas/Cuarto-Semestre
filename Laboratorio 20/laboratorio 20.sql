-- ===================================================================
-- Sección 1: Consultas Básicas y Select
-- ===================================================================

SELECT * FROM materiales;

SELECT * FROM materiales WHERE clave = 1000;

SELECT clave, rfc, fecha FROM entregan;

SELECT * FROM materiales, entregan WHERE materiales.clave = entregan.clave;

SELECT * FROM entregan, proyectos WHERE entregan.numero <= proyectos.numero;

SELECT * FROM entregan WHERE clave = 1450
UNION
SELECT * FROM entregan WHERE clave = 1300;

SELECT clave FROM entregan WHERE numero = 5001
INTERSECT
SELECT clave FROM entregan WHERE numero = 5018;

SELECT * FROM entregan
MINUS
SELECT * FROM entregan WHERE clave = 1000;

SELECT * FROM entregan, materiales;

-- ===================================================================
-- Sección 2: Consultas Avanzadas con Fechas y Distinct
-- ===================================================================

SET DATEFORMAT dmy;
SELECT descripcion
FROM materiales, entregan
WHERE materiales.clave = entregan.clave
AND entregan.fecha >= '01/01/2000' AND entregan.fecha <= '31/12/2000';

SELECT DISTINCT descripcion
FROM materiales, entregan
WHERE materiales.clave = entregan.clave
AND entregan.fecha >= '01/01/2000' AND entregan.fecha <= '31/12/2000';

SELECT numero, denominacion, fecha, cantidad
FROM entregan, proyectos
WHERE entregan.numero = proyectos.numero
ORDER BY numero ASC, fecha DESC;

-- ===================================================================
-- Sección 3: Expresiones Aritméticas y Operadores de Cadenas
-- ===================================================================

SELECT (Apellido + ', ' + Nombre) AS Nombre FROM Personas;

SELECT * FROM productos WHERE descripcion LIKE 'Si%';

SELECT RFC FROM Entregan WHERE RFC LIKE '[A-D]%';  
SELECT RFC FROM Entregan WHERE RFC LIKE '[^A]%';   
SELECT Numero FROM Entregan WHERE Numero LIKE '___6';

-- ===================================================================
-- Sección 4: Operadores Lógicos y de Comparación
-- ===================================================================

SELECT Clave, RFC, Numero, Fecha, Cantidad
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010;

SELECT * FROM Entregan
WHERE Fecha BETWEEN '01/01/2000' AND '31/12/2000';

SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND EXISTS (SELECT RFC FROM Proveedores WHERE RazonSocial LIKE 'La%' AND Entregan.RFC = Proveedores.RFC);

SELECT RFC, Cantidad, Fecha, Numero
FROM Entregan
WHERE Numero BETWEEN 5000 AND 5010
AND RFC IN (SELECT RFC FROM Proveedores WHERE RazonSocial LIKE 'La%');

-- ===================================================================
-- Sección 5: Modificación de Tablas
-- ===================================================================

ALTER TABLE materiales ADD PorcentajeImpuesto NUMERIC(6,2);

UPDATE materiales SET PorcentajeImpuesto = 2 * clave / 1000;

SELECT * FROM materiales;

-- ===================================================================
-- Sección 6: Consultas Agregadas y Vistas
-- ===================================================================

CREATE VIEW MaterialesProyectoMexico AS
SELECT materiales.clave, materiales.descripcion
FROM materiales, entregan, proyectos
WHERE materiales.clave = entregan.clave
AND entregan.numero = proyectos.numero
AND proyectos.denominacion = 'México sin ti no estamos completos';

SELECT * FROM MaterialesProyectoMexico;

CREATE VIEW ProveedoresAcme AS
SELECT proveedores.rfc, proveedores.razonsocial
FROM proveedores, entregan
WHERE proveedores.rfc = entregan.rfc
AND proveedores.razonsocial = 'Acme tools';

SELECT * FROM ProveedoresAcme;

-- ===================================================================
-- Sección 7: Consultas Complejas con Funciones Agregadas
-- ===================================================================

SELECT entregan.clave, SUM(entregan.cantidad * materiales.costo) AS total
FROM entregan, materiales
WHERE entregan.clave = materiales.clave
AND entregan.fecha BETWEEN '01/01/2000' AND '31/12/2000'
GROUP BY entregan.clave;

CREATE VIEW MaterialesVendidos AS
SELECT entregan.clave, SUM(entregan.cantidad) AS total_vendido
FROM entregan
WHERE entregan.fecha BETWEEN '01/01/2001' AND '31/12/2001'
GROUP BY entregan.clave;

SELECT TOP 1 clave
FROM MaterialesVendidos
ORDER BY total_vendido DESC;

-- ===================================================================
-- Sección 8: Consultas Finales con Subconsultas
-- ===================================================================

CREATE VIEW MaterialesTelevisa AS
SELECT materiales.clave, materiales.descripcion
FROM materiales, entregan, proyectos
WHERE materiales.clave = entregan.clave
AND entregan.numero = proyectos.numero
AND proyectos.denominacion = 'Televisa en acción';

CREATE VIEW MaterialesEducando AS
SELECT materiales.clave
FROM materiales, entregan, proyectos
WHERE materiales.clave = entregan.clave
AND entregan.numero = proyectos.numero
AND proyectos.denominacion = 'Educando en Coahuila';

SELECT * FROM MaterialesTelevisa
WHERE clave NOT IN (SELECT clave FROM MaterialesEducando);

-- ===================================================================
-- Fin del Script
-- ===================================================================
