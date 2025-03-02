import { useState, FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [city, setCity] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city)
      setCity('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter an Indian city..."
        aria-label="City name"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar