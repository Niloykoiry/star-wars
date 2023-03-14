import React from "react";

const Search = ({ handleSearch }) => {
  return (
    <header className="mb-5">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        className="form-control "
        placeholder="Search..."
      />
    </header>
  );
};

export default Search;
