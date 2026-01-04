

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!response.ok) {
      throw Error("Error fetching weather data" + response.status);
    }
    const data = await response.json();
    return {
        city: data.name,
        temp: Math.round(data.main.temp), 
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind: data.wind.speed
    }
  } catch (error) {
    
    console.error("Error fetching weather:", error);
    throw error;
  }
};
