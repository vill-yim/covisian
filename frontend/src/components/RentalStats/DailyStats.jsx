import React from 'react';
import styles from './RentalStats.module.css';

const DailyStats = ({ dailyRentals }) => {
  if (!Array.isArray(dailyRentals)) return null;

  return (
    <div className={styles.statsSection}>
      <h3>Alquileres por Día</h3>
      <div className={styles.statsList}>
        {dailyRentals.map((stat) => (
          <div key={stat.fecha} className={styles.statItem}>
            <span>{new Date(stat.fecha).toLocaleDateString()}</span>
            <span>{stat.cantidad}</span>
          </div>
        ))}
        {dailyRentals.length === 0 && (
          <div className={styles.emptyState}>No hay datos disponibles</div>
        )}
      </div>
    </div>
  );
};

export default DailyStats;