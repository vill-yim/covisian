import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import styles from './RentalTable.module.css';

const RentalTable = ({ rentals, loading }) => {
  if (loading) return <div className={styles.loading}>Cargando...</div>;
  
  if (!rentals.length) {
    return <div className={styles.emptyState}>No hay alquileres para mostrar</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Tiempo</th>
            <th>Saldo</th>
            <th>Placa</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={`${rental.cedula}-${rental.fecha}`}>
              <td>{rental.cedula}</td>
              <td>{rental.nombre}</td>
              <td>{formatDate(rental.fecha)}</td>
              <td>{rental.tiempo} días</td>
              <td>${rental.saldo.toLocaleString()}</td>
              <td>{rental.placa}</td>
              <td>{rental.marca}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalTable;