import { WeatherData } from '../types/weatherTypes'

interface WeatherDisplayProps {
  weather: WeatherData
}

const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  // Convert temperature from Kelvin to Celsius
  const tempCelsius = Math.round(weather.main.temp - 273.15)
  const feelsLikeCelsius = Math.round(weather.main.feels_like - 273.15)
  const minTempCelsius = Math.round(weather.main.temp_min - 273.15)
  const maxTempCelsius = Math.round(weather.main.temp_max - 273.15)

  // Format date
  const date = new Date()
  const formattedDate = date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Format time
  const formattedTime = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Get weather icon with 2x size for better quality
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div className="weather-display">
      <div className="weather-header">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p className="date-time">{formattedDate} | {formattedTime}</p>
      </div>

      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{tempCelsius}°C</span>
          <div className="weather-description">
            <img 
              src={weatherIcon} 
              alt={weather.weather[0].description} 
            />
            <span>{weather.weather[0].description}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <span className="label">Feels Like</span>
            <span className="value">{feelsLikeCelsius}°C</span>
          </div>
          <div className="detail">
            <span className="label">Min Temp</span>
            <span className="value">{minTempCelsius}°C</span>
          </div>
          <div className="detail">
            <span className="label">Max Temp</span>
            <span className="value">{maxTempCelsius}°C</span>
          </div>
          <div className="detail">
            <span className="label">Humidity</span>
            <span className="value">{weather.main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind</span>
            <span className="value">{Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
          <div className="detail">
            <span className="label">Pressure</span>
            <span className="value">{weather.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay