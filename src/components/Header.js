import logo from '../images/logo.svg'

const Header = () => {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container text-center">
          <h2>
            Find movies in
            <img src={logo} className="logo ms-2" alt="logo" />
          </h2>
        </div>
      </div>
    </header>
  )
}

export default Header
