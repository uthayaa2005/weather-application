import axios from 'axios'
import { WeatherData } from '../types/weatherTypes'

// Using a free weather API that doesn't require authentication
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // First get coordinates for the city
    const geoResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city},in&limit=1&appid=4d8fb5b93d4af21d66a2948710284366`
    )
    
    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error(`City "${city}" not found. Please try another city.`)
    }
    
    const { lat, lon } = geoResponse.data[0]
    
    // Then get weather data using coordinates
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4d8fb5b93d4af21d66a2948710284366`
    )
    
    return weatherResponse.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('API access issue. Please try again later.')
      } else if (error.response?.status === 404) {
        throw new Error(`City "${city}" not found. Please try another city.`)
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.')
      } else {
        throw new Error(`Weather data fetch failed: ${error.response?.data?.message || error.message}`)
      }
    }
    throw new Error('Failed to fetch weather data. Please try again later.')
  }
}