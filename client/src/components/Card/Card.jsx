import React from "react";
import { Link } from "react-router-dom";
import "./card.modules.css";

const Card = ({ id, name, image, rating, genres }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="image" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-info">Rating: {rating}</p>
        <p className="card-info">Genres: {genres.join(", ")}</p>
        <Link to={`/videogame/${id}`}>
          <button className="btn">More Details</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
