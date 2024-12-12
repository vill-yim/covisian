import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const router = express.Router();

router.get('/alquileres/carro/:placa/:fechaInicio', async (req, res) => {
  const { placa, fechaInicio } = req.params;
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS cantidad
       FROM alquileres
       WHERE placa = $1 AND fecha >= $2`,
      [placa, fechaInicio]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

router.get('/saldo/fecha/:fecha', async (req, res) => {
  const { fecha } = req.params;
  try {
    const result = await pool.query(
      `SELECT SUM(saldo) AS total_saldo
       FROM alquileres
       WHERE fecha = $1`,
      [fecha]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

router.get('/clientes/alquileres', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.cedula, c.nombre, a.fecha, a.tiempo, a.saldo, a.placa, car.marca
       FROM clientes c
       JOIN alquileres a ON c.cedula = a.cedula
       JOIN carros car ON a.placa = car.placa`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

router.get('/clientes/sin-alquiler/:fechaInicio/:fechaFin', async (req, res) => {
  const { fechaInicio, fechaFin } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM clientes
       WHERE cedula NOT IN (
         SELECT cedula FROM alquileres WHERE fecha BETWEEN $1 AND $2
       )`,
      [fechaInicio, fechaFin]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

router.get('/consolidado/pagos/:fechaInicio', async (req, res) => {
  const { fechaInicio } = req.params;
  try {
    const result = await pool.query(
      `SELECT SUM(p.valor) AS total_pago
       FROM pagos p
       JOIN alquileres a ON p.alquiler_id = a.id
       WHERE a.fecha >= $1`,
      [fechaInicio]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

router.get('/consolidado/carro/:fechaInicio/:fechaFin', async (req, res) => {
  const { fechaInicio, fechaFin } = req.params;
  try {
    const result = await pool.query(
      `SELECT car.placa, car.marca, COUNT(a.id) AS cantidad_alquileres, SUM(a.saldo) AS total_saldo
       FROM alquileres a
       JOIN carros car ON a.placa = car.placa
       WHERE a.fecha BETWEEN $1 AND $2
       GROUP BY car.placa, car.marca`,
      [fechaInicio, fechaFin]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});
router.get('/renta/diaria', async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT COUNT(*) AS cantidad, SUM(saldo) AS total_saldo
         FROM alquileres
         WHERE fecha = CURRENT_DATE`
      );
      res.status(200).json(result.rows[0] || {});  // Cambio a un objeto vacío en vez de un array vacío
    } catch (error) {
      res.status(500).json({ message: 'Error al cargar las estadísticas diarias', error });
    }
  });
  
  router.get('/renta/mensual', async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT COUNT(*) AS cantidad, SUM(saldo) AS total_saldo
         FROM alquileres
         WHERE fecha >= date_trunc('month', CURRENT_DATE)`
      );
      res.status(200).json(result.rows[0] || {});  // Cambio a un objeto vacío en vez de un array vacío
    } catch (error) {
      res.status(500).json({ message: 'Error al cargar las estadísticas mensuales', error });
    }
  });
router.get('/primer-alquiler/:cedula', async (req, res) => {
  const { cedula } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM alquileres
       WHERE cedula = $1
       ORDER BY fecha ASC
       LIMIT 1`,
      [cedula]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la consulta', error });
  }
});

export default router;
