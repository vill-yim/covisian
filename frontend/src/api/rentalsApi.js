const API_BASE_URL = '/api'; // Proxy configurado en vite.config.js

export const fetchRentalsAPI = async (startDate, endDate) => {
  try {
    const queryParams = new URLSearchParams({
      fechaInicio: startDate,
      fechaFin: endDate,
    }).toString();

    const response = await fetch(`${API_BASE_URL}/clientes/alquileres?${queryParams}`);
    if (!response.ok) {
      throw new Error('Error al cargar los alquileres');
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error en fetchRentalsAPI:', error.message);
    throw error;
  }
};

export const fetchRentalStatsAPI = async () => {
  try {
    const [dailyResponse, monthlyResponse] = await Promise.all([
      fetch(`http://localhost:3000/renta/diaria`),
      fetch(`http://localhost:3000/renta/mensual`),
      
    ]);

    if (!dailyResponse.ok || !monthlyResponse.ok) {
      throw new Error('Error al cargar las estadísticas');
    }

    const dailyData = await dailyResponse.json();
    const monthlyData = await monthlyResponse.json();

    return {
      daily: dailyData || {}, 
      monthly: monthlyData || {},  
    };
  } catch (error) {
    console.error('Error en fetchRentalStatsAPI:', error.message);
    throw error;
  }
};