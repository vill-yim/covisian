import React, { useEffect } from 'react';
import useRentalStore from '../../store/rentalStore';
import DailyStats from './DailyStats';
import MonthlyStats from './MonthlyStats';
import styles from './RentalStats.module.css';

const RentalStats = () => {
  const { dailyRentals, monthlyRentals, loading, error, fetchRentalStats } = useRentalStore();

  useEffect(() => {
    const fetchStats = () => {
      fetchRentalStats();
    };

    fetchStats();
    const interval = setInterval(fetchStats, 60000);

    return () => clearInterval(interval);
  }, [fetchRentalStats]);

  if (loading) {
    return <div className={styles.loading}>Cargando estadísticas...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.statsContainer}>
      <DailyStats dailyRentals={dailyRentals} />
      <MonthlyStats monthlyRentals={monthlyRentals} />
    </div>
  );
};

export default RentalStats;