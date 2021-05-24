import { getYear } from './utils/helpers'

const posterSizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'original']

const getRequest = async (resource, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: process.env.REACT_APP_API_KEY,
    ...params
  })
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/` +
    `${process.env.REACT_APP_API_VERSION}/` +
    `${resource}?${queryParams}`,
    {
      method: 'GET'
    }
  )
  return response.json()
}

const getPoster = (config, relPath, size) => {
  const width = config.images.poster_sizes[posterSizes.indexOf(size)]
  return {
    width,
    image: relPath && (config.images.base_url + width + relPath)
  }
}

const getDirectors = (crew) => {
  return crew
    .filter(person => person.job === 'Director')
    .map(director => director.name)
    .join(', ')
}

const getStars = (cast) => {
  return cast
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)
    .map(person => person.name)
    .join(', ')
}

let config;
const getConfig = async () => {
  config = config || getRequest('configuration')
  return config
}

export const getMovieDetails = async movieId => {
  return await getRequest(
    `movie/${movieId}`,
    {append_to_response: 'credits'}
  )
}

export const searchMovie = async (query, options = {}) => {
  const config = await getConfig()
  const response = await getRequest('search/movie', {query})

  return Promise.all(
    response.results.map(async movie => {
      const poster = getPoster(
        config,
        movie.poster_path,
        options.posterSize || 'm'
      )
      const movieDetails = await getMovieDetails(movie.id)
      const directors = getDirectors(movieDetails.credits.crew)
      const stars = getStars(movieDetails.credits.cast)

      return {
        ...movie,
        genres: movieDetails.genres,
        year: getYear(movie.release_date),
        poster_abs_path: poster.image,
        poster_width: poster.width.replace(/\D/g, ''),
        directors: directors,
        stars: stars
      }
    })
  )
}
