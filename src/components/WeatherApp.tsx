import React, { useState } from "react";
import type { WeatherData } from "../types/weather";
import { getWeatherByCity } from "../service/weatherService";

export function WeatherApp() {
  const [city, setCity] = useState<string>("");
  const [wheather, setWeather] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlerSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    if (!city || /[0-9]+/g.test(city)) return;
    setCity("");
    try {
      const datos = await getWeatherByCity(city);
      if (!datos) {
        throw Error("No weather data found for the specified city");
      }
      setWeather(datos);
    } catch (error: any) {
      setErrorMessage(error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-card">
        <h1 className="app-title">WeatherNow</h1>

        <form className="search" onSubmit={handlerSearch}>
          <input
            type="text"
            placeholder="Ingresa una ciudad"
            value={city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCity(event.target.value);
            }}
          />
          <button type="submit">Buscar</button>
        </form>
        {loading && <p style={{color:"green"}}>Cargando...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {!wheather && !errorMessage && !loading && (
          <p className="hint">Busca una ciudad para ver el clima</p>
        )}

        {wheather && (
          <div className="weather-info">
            <div className="weather-main">
              <img
                src={`https://openweathermap.org/img/wn/${wheather.icon}@2x.png`}
                alt={wheather?.description}
              />
              <div className="weather-text">
                <p className="city">{wheather?.city}</p>
                <p className="description">
                  {wheather?.description
                    ? wheather.description.charAt(0).toUpperCase() +
                      wheather.description.slice(1)
                    : ""}
                </p>
              </div>
            </div>

            <div className="weather-stats">
              <div className="stat">
                <span className="label">Temperatura</span>
                <span className="value">{wheather?.temp}°C</span>
              </div>
              <div className="stat">
                <span className="label">Humedad</span>
                <span className="value">{wheather?.humidity}°</span>
              </div>
              <div className="stat">
                <span className="label">Viento</span>
                <span className="value">{wheather?.wind} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
