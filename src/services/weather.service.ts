import axios from "axios";

const baseURL = "https://api.weatherapi.com/v1";

const weatherService = axios.create({
  baseURL,
  params: {
    key: import.meta.env.VITE_WEATHER_API_KEY,
  },
});

export default weatherService;

export const searchCities = async (searchQuery) => {
  try {
    const response = await weatherService.get(`/search.json?q=${searchQuery}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error.message);
    } else {
      throw new Error("Failed to retrieve data");
    }
  }
};

export const selectCity = async (cityName) => {
  try {
    const response = await weatherService.get(`/current.json?q=${cityName}`);
    return response.data.current;
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error.message);
    } else {
      throw new Error("Failed to retrieve weather data");
    }
  }
};
