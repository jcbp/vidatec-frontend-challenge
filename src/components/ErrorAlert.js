const ErrorAlert = ({message}) => {
  return (
    <>
      {message &&
        <div className="alert alert-danger">
          {message}
        </div>
      }
    </>
  )
}

export default ErrorAlert

