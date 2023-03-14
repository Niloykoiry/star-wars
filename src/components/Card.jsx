import React from "react";

const Card = ({ film, handleFilmSelect }) => {
  return (
    <div key={film.title} className="col-lg-3">
      <div className="card h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">Title: {film.title}</h5>
          <p>Director: {film.director}</p>
          <button
            onClick={() => handleFilmSelect(film)}
            className="btn btn-warning mt-auto"
          >
            View Characters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
