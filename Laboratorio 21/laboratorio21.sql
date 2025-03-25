use laboratorio;
--Problema 1.1
SELECT 
  SUM(E.cantidad) AS SumaCantidades,
  SUM(E.cantidad * M.precio * (1 + M.impuesto)) AS ImporteTotal
FROM 
  Entregan E, Materiales M
WHERE E.clave = M.clave AND
  YEAR(e.fecha) = 1997;

--Problema 1.2
SELECT 
  P.razonsocial AS RazonSocial,
  COUNT(E.numero) AS NumeroDeEntregas,
  SUM(E.cantidad * M.precio * (1 + M.impuesto)) AS ImporteTotal
FROM 
  Entregan E, Proveedores P, Materiales M
WHERE 
  E.rfc = P.rfc AND
  E.clave = M.clave
GROUP BY 
  P.rfc;

--Problema 1.3
SELECT 
  M.clave AS ClaveMaterial,
  M.descripcion AS DescripcionMaterial,
  SUM(E.cantidad) AS CantidadTotalEntregada,
  MIN(E.cantidad) AS CantidadMinimaEntregada,
  MAX(E.cantidad) AS CantidadMaximaEntregada,
  SUM(E.cantidad * M.precio * (1 + M.impuesto)) AS ImporteTotal
FROM 
  Entregan E, Materiales M
WHERE 
  E.clave = M.clave
GROUP BY 
  M.clave
HAVING 
  AVG(E.cantidad) > 400;

--Problema 1.4
SELECT 
  P.razonsocial AS RazonSocial,
  M.clave AS ClaveMaterial,
  M.descripcion AS DescripcionMaterial,
  AVG(E.cantidad) AS CantidadPromedio
FROM 
  Entregan E, Proveedores P, Materiales M
WHERE 
  E.rfc = P.rfc AND
  E.clave = M.clave
GROUP BY 
  P.rfc, M.clave
HAVING 
  AVG(E.cantidad) >= 500;

--Problema 1.5
SELECT 
  P.razonsocial AS RazonSocial,
  M.clave AS ClaveMaterial,
  M.descripcion AS DescripcionMaterial,
  AVG(E.cantidad) AS CantidadPromedio,
  CASE
    WHEN AVG(E.cantidad) < 370 THEN 'PromedioMenorA370'
    WHEN AVG(E.cantidad) > 450 THEN 'PromedioMayorA450'
    ELSE 'EnRango'
  END AS Grupo
FROM 
  Entregan E, Proveedores P, Materiales M
WHERE 
  E.rfc = P.rfc AND
  E.clave = M.clave
GROUP BY 
  P.rfc, M.clave
HAVING 
  AVG(E.cantidad) < 370 OR AVG(E.cantidad) > 450;

--Insertar Nuevos Materiales
INSERT INTO materiales (clave, descripcion, precio, impuesto) VALUES 
(1, 'Material A', 100.50, 0.16),
(2, 'Material B', 200.75, 0.16),
(3, 'Material C', 150.30, 0.18),
(4, 'Material D', 250.20, 0.15),
(5, 'Material E', 120.00, 0.10);

--Problema 2.1
SELECT 
  M.clave AS ClaveMaterial,
  M.descripcion AS DescripcionMaterial
FROM 
  Materiales M
WHERE 
  M.clave NOT IN (SELECT E.clave FROM Entregan E);

--Problema 2.2
SELECT 
  P.razonsocial AS RazonSocial
FROM 
  Proveedores P
WHERE 
  P.rfc IN (
    SELECT E.rfc
    FROM Entregan E
    JOIN Proyectos PR ON E.numero = PR.numero
    WHERE PR.denominacion IN ('Vamos México', 'Querétaro Limpio')
    GROUP BY E.rfc
    HAVING COUNT(DISTINCT PR.denominacion) = 2
  );

--Problema 2.3
SELECT 
  M.descripcion AS DescripcionMaterial
FROM 
  Materiales M
WHERE 
  M.clave NOT IN (
    SELECT E.clave
    FROM Entregan E
    JOIN Proyectos PR ON E.numero = PR.numero
    WHERE PR.denominacion = 'CIT Yucatán'
  );

--Problema 2.4
SELECT 
  P.razonsocial AS RazonSocial,
  AVG(E.cantidad) AS PromedioCantidadEntregada
FROM 
  Entregan E
JOIN 
  Proveedores P ON E.rfc = P.rfc
GROUP BY 
  P.rfc
HAVING 
  AVG(E.cantidad) > (
    SELECT AVG(E2.cantidad)
    FROM Entregan E2
    WHERE E2.rfc = 'VAGO780901'
  );

--Problema 2.5
SELECT 
  P.rfc AS RFC,
  P.razonsocial AS RazonSocial
FROM 
  Proveedores P
WHERE 
  P.rfc IN (
    SELECT E.rfc
    FROM Entregan E
    JOIN Proyectos PR ON E.numero = PR.numero
    WHERE PR.denominacion = 'Infonavit Durango'
    GROUP BY E.rfc
    HAVING 
      SUM(CASE WHEN YEAR(E.fecha) = 2000 THEN E.cantidad ELSE 0 END) > 
      SUM(CASE WHEN YEAR(E.fecha) = 2001 THEN E.cantidad ELSE 0 END)
  );

