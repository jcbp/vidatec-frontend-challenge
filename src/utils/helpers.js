export const debounce = (func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const getYear = fullDateStr => {
  const parts = fullDateStr?.match(/\d{4}/)
  return parts && parts.shift()
}

export const groupByGenres = movies => {
  return movies.reduce((genres, movie) => {
    movie.genres.forEach(genre => {
      genres[genre.name] = genres[genre.name] || []

      if(!genres[genre.name].includes(movie)) {
        genres[genre.name].push(movie)
      }
    })
    return genres
  }, {})
}