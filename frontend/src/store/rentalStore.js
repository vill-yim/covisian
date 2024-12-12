import { create } from 'zustand';
import { fetchRentalsAPI, fetchRentalStatsAPI } from '../api/rentalsApi';

const useRentalStore = create((set) => ({
  rentals: [],
  dailyRentals: [],
  monthlyRentals: [],
  loading: false,
  error: null,

  fetchRentals: async (startDate, endDate) => {
    set({ loading: true });
    try {
      const data = await fetchRentalsAPI(startDate, endDate);
      set({ rentals: data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false, rentals: [] });
    }
  },

  fetchRentalStats: async () => {
    set(state => ({ ...state, loading: true }));
    try {
      const { daily, monthly } = await fetchRentalStatsAPI();
      set({
        dailyRentals: daily,
        monthlyRentals: monthly,
        loading: false,
        error: null
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
        dailyRentals: [],
        monthlyRentals: []
      });
    }
  }
}));

export default useRentalStore;