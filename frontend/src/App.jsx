import React, { useState, useEffect } from 'react';
import useRentalStore from './store/rentalStore';
import DateFilter from './components/DateFilter/DateFilter';
import RentalTable from './components/RentalTable/RentalTable';
import RentalStats from './components/RentalStats/RentalStats';
import styles from './App.module.css';

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { rentals, loading, fetchRentals } = useRentalStore();

  useEffect(() => {
    if (startDate && endDate) {
      fetchRentals(startDate, endDate);
    }
  }, [startDate, endDate, fetchRentals]);

  return (
    <div className={styles.container}>
      <h1>Sistema de Alquiler de Vehículos</h1>
      
      <DateFilter
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      
      <RentalTable rentals={rentals} loading={loading} />
      
      <RentalStats />
    </div>
  );
}

export default App;