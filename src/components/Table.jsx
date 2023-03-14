import { Pagination } from "@mui/material";
import React, { useState } from "react";

const Table = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(10);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  return (
    <React.Fragment>
      <table className="table char-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Height</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr key={character.name}>
              <td>{character.name}</td>
              <td>{character.gender}</td>
              <td>{character.height}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        className="char-pagination"
        color="warning"
        count={Math.ceil(characters.length / charactersPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default Table;
