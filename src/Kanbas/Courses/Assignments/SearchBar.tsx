import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <FaSearch />
        </span>
      </div>
      <input
        id="wd-search-assignment"
        type="text"
        className="form-control"
        placeholder="Search..."
      />
    </div>
  );
}