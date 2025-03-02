import { useState, useEffect } from 'react'
import './App.css'
import WeatherDisplay from './components/WeatherDisplay'
import SearchBar from './components/SearchBar'
import { fetchWeatherData } from './services/weatherService'
import { WeatherData } from './types/weatherTypes'
import popularCities from './data/indianCities'

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [city, setCity] = useState<string>('New Delhi')

  useEffect(() => {
    getWeatherData(city)
  }, [])

  const getWeatherData = async (cityName: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherData(cityName)
      setWeather(data)
      setCity(cityName)
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch weather data. Please try another city.'
      setError(errorMessage)
      console.error('Error in getWeatherData:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (cityName: string) => {
    getWeatherData(cityName)
  }

  const handleCitySelect = (cityName: string) => {
    getWeatherData(cityName)
  }

  return (
    <div className="weather-app">
      <h1>India Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      
      <div className="popular-cities">
        <h3>Popular Cities</h3>
        <div className="city-buttons">
          {popularCities.map((cityName) => (
            <button 
              key={cityName} 
              onClick={() => handleCitySelect(cityName)}
              className={city === cityName ? 'active' : ''}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>
      
      {loading && <div className="loading">Loading weather data...</div>}
      {error && <div className="error">{error}</div>}
      {weather && !loading && <WeatherDisplay weather={weather} />}
    </div>
  )
}

export default App