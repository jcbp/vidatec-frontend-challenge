import Spinner from '../components/Spinner'
import { Search } from 'react-feather'
import { debounce } from '../utils/helpers'

const SearchBar = ({
  placeholder,
  minLength,
  debounceTime,
  onChange,
  onClear,
  loading
}) => {

  const handleChange = debounce((searchStr) => {
    if(searchStr.length >= minLength) {
      onChange(searchStr)
    }
    if(searchStr.length === 0) {
      onClear()
    }
  }, debounceTime)

  return (
    <div className="d-flex align-items-center">
      <Search
        size={36}
        className="text-muted position-absolute ps-3"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="form-control form-control-lg ps-5"
        onChange={(e) => handleChange(e.target.value)}
      />
      <div
        className="position-relative"
        style={{marginLeft: '-52px'}}
      >
        <Spinner loading={loading} />
      </div>
    </div>
  )
}

export default SearchBar

