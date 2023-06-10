import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Card = ({ id, name, image, types, attack }) => {
  const uppercaseName = name.toUpperCase();

  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#B6A136",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#705746",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#312D2C",
    steel: "#B7B7CE",
    fairy: "#D685AD",
    unknown:"#312D2A",
    shadow:"#B7B7CD"
  };

  return (
    <Link to={`/details/${id}`}>
    <div className={style.divContainer}>
        <button className={style.name}>{uppercaseName}</button>
        <img className={style.img} src={image} alt={name} />
        <button className={style.name}>Attack: {attack}</button>
        <div>
          <p>
            {types.map((type, index) => {
              const typeName = typeof type === "string" ? type : type.name;
              return (
                <span
                key={index}
                className={style.type}
                style={{ backgroundColor: typeColors[typeName] }}
                >
                  {typeName.toUpperCase()}
                </span>
              );
            })}
          </p>
        </div>
      </div>
            </Link>
  );
};

export default Card;
