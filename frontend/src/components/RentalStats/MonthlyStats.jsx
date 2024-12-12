import React from 'react';
import styles from './RentalStats.module.css';

const MonthlyStats = ({ monthlyRentals }) => {
  if (!Array.isArray(monthlyRentals)) return null;

  return (
    <div className={styles.statsSection}>
      <h3>Alquileres por Mes</h3>
      <div className={styles.statsList}>
        {monthlyRentals.map((stat) => (
          <div key={stat.mes} className={styles.statItem}>
            <span>{stat.mes}</span>
            <span>{stat.cantidad}</span>
          </div>
        ))}
        {monthlyRentals.length === 0 && (
          <div className={styles.emptyState}>No hay datos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default MonthlyStats;