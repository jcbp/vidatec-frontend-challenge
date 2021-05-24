import posterNotAvailable from '../images/poster-not-available.svg'

const MovieCard = ({title, year, poster, director, stars}) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={poster || posterNotAvailable}
          className="card-img-top"
          alt="Movie poster"
        />
        
        <div className="card-body bg-light border-top border-light">
          <h4 className="card-title overflow-wrap-normal text-dark mb-3">
            {title}
            {year &&
              <span className="text-muted ms-2">
                ({year})
              </span>
            }
          </h4>
          {director &&
            <p className="card-text mb-2">
              <span className="text-black-50 fw-bold">Directors: </span>
              <span className="text-primary">{director}</span>
            </p>
          }
          {stars &&
            <p className="card-text">
              <span className="text-black-50 fw-bold">Stars: </span>
              <span className="text-primary">{stars}</span>
            </p>
          }
        </div>
      </div>
    </div>
  )
}

export default MovieCard