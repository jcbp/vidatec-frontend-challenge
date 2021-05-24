const Spinner = ({loading}) => {
  return (
    <>
      {loading &&
        <div className="d-flex align-items-center">
          <div
            className="spinner-border"
            role="status">
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </div>
      }
    </>
  )
}

export default Spinner
