import Header from '../components/Header'
import MovieFinder from './MovieFinder'

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8 pt-5">
            <MovieFinder />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
