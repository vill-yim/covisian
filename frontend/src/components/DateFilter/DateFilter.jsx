import React from 'react';
import { validateDateRange } from '../../utils/dateUtils';
import styles from './DateFilter.module.css';

const DateFilter = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    if (validateDateRange(newStartDate, endDate)) {
      onStartDateChange(newStartDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (validateDateRange(startDate, newEndDate)) {
      onEndDateChange(newEndDate);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItem}>
        <label htmlFor="startDate">Fecha Inicial:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          max={endDate}
        />
      </div>
      <div className={styles.filterItem}>
        <label htmlFor="endDate">Fecha Final:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
        />
      </div>
    </div>
  );
};

export default DateFilter;