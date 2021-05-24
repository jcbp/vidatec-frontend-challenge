import { useState } from 'react'
import { searchMovie }  from '../api'
import { groupByGenres } from '../utils/helpers'
import ErrorAlert from '../components/ErrorAlert'
import SearchBar from '../components/SearchBar'
import GridMovies from '../components/GridMovies'
import MovieCard from '../components/MovieCard'

const MovieFinder = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleSearch = (search) => {
    setLoading(true)
    searchMovie(search, {posterSize: 'l'}).then((movies) => {
      setMovies(
        groupByGenres(movies)
      )
    })
    .catch(e => setError(e))
    .finally(() => setLoading(false))
  }

  return (
    <>
      <div className="mb-4">
        <SearchBar
          placeholder="Search movie"
          minLength={3}
          debounceTime={300}
          onChange={handleSearch}
          onClear={() => setMovies([])}
          loading={loading}
        />
      </div>
      {Object.entries(movies).map(([genre, movies], index) => (
        <div key={`genre-${index}`}>
          <h4 className="fw-bold">{genre}</h4>
          <div className="py-1 mb-4">
            <GridMovies>
              {movies.map(movie => (
                <MovieCard
                  key={`g${index}-m${movie.id}`}
                  title={movie.title}
                  year={movie.year}
                  poster={movie.poster_abs_path}
                  director={movie.directors}
                  stars={movie.stars}
                />
              ))}
            </GridMovies>
          </div>
        </div>
      ))}
      <ErrorAlert message={error} />
    </>
  )
}

export default MovieFinder
