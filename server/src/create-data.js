import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';



dotenv.config();

const pool = new Pool({
  //agregar link de conexion a la db POSTGRES
  connectionString: process.env.DB_URL,
});

//este archivo crea datos en la base 



(async()=> {
  try {
    const clientesQuery = `
      INSERT INTO clientes (nombre, telefono1, telefono2) 
      VALUES 
        ('Juan Pérez', '3123456789', '3129876543'),
        ('Ana Gómez', '3102345678', '3108765432');
    `;
    
    await pool.query(clientesQuery);
    console.log("Clientes insertados correctamente.");

    const carrosQuery = `
      INSERT INTO carros (placa, marca, modelo, costo, disponible) 
      VALUES 
        ('ABC123', 'Toyota', 'Corolla', 20000.00, true),
        ('XYZ456', 'Honda', 'Civic', 25000.00, true);
    `;
    
    await pool.query(carrosQuery);
    console.log("Carros insertados correctamente.");

    const alquileresQuery = `
      INSERT INTO alquileres (cedula, placa, fecha, tiempo, valor_total, saldo, abono_inicial, devuelto) 
      VALUES 
        (1, 'ABC123', '2024-12-10', 5, 1000.00, 500.00, 200.00, false),
        (2, 'XYZ456', '2024-12-11', 3, 750.00, 350.00, 150.00, false);
    `;
    
    await pool.query(alquileresQuery);
    console.log("Alquileres insertados correctamente.");

    const pagosQuery = `
      INSERT INTO pagos (alquiler_id, fecha, valor) 
      VALUES 
        (1, '2024-12-10', 200.00),
        (2, '2024-12-11', 150.00);
    `;
    
    await pool.query(pagosQuery);
    console.log("Pagos insertados correctamente.");

  } catch (error) {
    console.error("Error insertando datos:", error);
  } finally {
    pool.end();
  }})();
