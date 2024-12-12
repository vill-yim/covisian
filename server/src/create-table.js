import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

//este archivo crea las tablas en la db de railway


dotenv.config();

const pool = new Pool({
  //agregar link de conexion a la db POSTGRES
  connectionString: process.env.DB_URL,
});

(async () => {
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS clientes (
      cedula SERIAL PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      telefono1 VARCHAR(20),
      telefono2 VARCHAR(20)
    );

    CREATE TABLE IF NOT EXISTS carros (
      placa VARCHAR(10) PRIMARY KEY,
      marca VARCHAR(255) NOT NULL,
      modelo VARCHAR(255) NOT NULL,
      costo NUMERIC(10, 2) NOT NULL,
      disponible BOOLEAN DEFAULT TRUE
    );

    CREATE TABLE IF NOT EXISTS alquileres (
      id SERIAL PRIMARY KEY,
      cedula INT NOT NULL,
      placa VARCHAR(10) NOT NULL,
      fecha DATE NOT NULL,
      tiempo INT NOT NULL, -- Tiempo en días
      valor_total NUMERIC(10, 2) NOT NULL,
      saldo NUMERIC(10, 2) NOT NULL,
      abono_inicial NUMERIC(10, 2) NOT NULL,
      devuelto BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (cedula) REFERENCES clientes(cedula),
      FOREIGN KEY (placa) REFERENCES carros(placa)
    );

    CREATE TABLE IF NOT EXISTS pagos (
      id SERIAL PRIMARY KEY,
      alquiler_id INT NOT NULL,
      fecha DATE NOT NULL,
      valor NUMERIC(10, 2) NOT NULL,
      FOREIGN KEY (alquiler_id) REFERENCES alquileres(id)
    );
  `;

    await pool.query(query);
    console.log("Tablas creadas correctamente!");
  } catch (error) {
    console.error("Error creando las tablas:", error);
  } finally {
    pool.end();
  }
})();
