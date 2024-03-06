// useCompanies.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/company/');
        setCompanies(response.data.companies);
      } catch (error) {
        console.error('Error al cargar las empresas:', error);
      }
    };

    fetchCompanies();
  }, []);

  return companies;
};
