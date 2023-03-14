import React, { useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Card from "./components/Card";
import Search from "./components/Search";
import "./App.css";
import Loader from "./components/Loader";
import logo from "./images/logo.webp";
function App() {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [characters, setCharacters] = useState([]);

  const [cardError, setCardError] = useState(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [tableError, setTableError] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const reset = () => {
    setFilms([]);
    setSelectedFilm(null);
    setCharacters([]);
    setCardError(null);
    setCardLoading(true);
  };
  const handleSearch = async (query) => {
    reset();
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?search=${query}`
      );

      setFilms(response.data.results);
      if (response.data.results.length === 0) {
        setCardError({ message: "No films found" });
      }
      if (response.data.results.length === 1) {
        handleFilmSelect(response.data.results[0]);
      }
    } catch (error) {
      setCardError(error);
    } finally {
      setCardLoading(false);
    }
  };

  const handleFilmSelect = async (film) => {
    setTableLoading(true);
    try {
      setSelectedFilm(film);
      const characterUrls = film.characters;
      const characterPromises = characterUrls.map((url) =>
        fetch(url).then((response) => response.json())
      );
      const characterData = await Promise.allSettled(characterPromises);
      setCharacters(
        characterData
          .filter((character) => character.status === "fulfilled")
          .map((character) => character.value)
      );
    } catch (error) {
      setTableError(error);
    } finally {
      setTableLoading(false);
    }
  };

  return (
    <main className="py-5 container">
      <img className="logo mb-5" src={logo} alt="star-wars" />
      <Search handleSearch={handleSearch} />
      {!cardError && !cardLoading && (
        <div className="row g-4">
          {films.map((film) => (
            <Card film={film} handleFilmSelect={handleFilmSelect} />
          ))}
        </div>
      )}
      {cardLoading && <Loader />}
      {cardError && <p className="error">{cardError.message}</p>}

      {selectedFilm && (
        <React.Fragment>
          <h3 className="text-white my-5 fs-1">
            Characters in{" "}
            <span className="text-warning">{selectedFilm.title}</span>
          </h3>
          {!tableError && !tableLoading && <Table characters={characters} />}
          {tableLoading && <Loader />}
          {tableError && <p className="error">{tableError.message}</p>}
        </React.Fragment>
      )}
    </main>
  );
}

export default App;
