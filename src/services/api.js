import axios from 'axios';

const api = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19',
});

export const fetchGlobalStats = async () => {
  const { data } = await api.get('/all');
  return data;
};

export const fetchCountries = async () => {
  const { data } = await api.get('/countries');
  return data;
};

export const fetchCountryStats = async (country) => {
  const { data } = await api.get(`/countries/${country}`);
  return data;
};

export const fetchHistoricalData = async (country, days = 30) => {
  const endpoint = country === 'all' ? `/historical/all?lastdays=${days}` : `/historical/${country}?lastdays=${days}`;
  const { data } = await api.get(endpoint);
  return data;
};
