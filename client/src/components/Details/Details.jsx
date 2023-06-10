import {useParams} from "react-router-dom"
import React from "react"
import style from "./Details.module.css"
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonId } from "../../redux/actions";
const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();

    const {id} = useParams()
    const [detail, setDetail] = React.useState({})
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

    React.useEffect(() => {
      dispatch(getPokemonId(id))
        .then((data) => {
          setDetail(data.payload);
        })
        .catch((error) => console.log(error));
    }, [dispatch, id]);

    const uppercaseName = detail.name ? detail.name.toUpperCase() : "";
    const handleGoBack = () => {
      history.goBack(); // Volver a la página anterior en el historial
    };
  
    return(
        <div className={style.divContainer}>
        <button className={style.button} onClick={handleGoBack}>Home</button>
        <div className={style.divCard}>
        <p className={style.textC}>Id: {detail.id}</p>
        <p className={style.textC}>{uppercaseName}</p>
        <img className={style.img} src={detail.image} alt=""></img>
        <p className={style.textC}>HP: {detail.hp}</p>
        <p className={style.textC}>Attack: {detail.attack}</p>
        <p className={style.textC}>Defense: {detail.defense}</p>
        <p className={style.textC}>Speed: {detail.speed}</p>
        <p className={style.textC}>Height: {detail.height}</p>
        <p className={style.textC}>Weight: {detail.weight}</p>
        {detail.types && (
  <p className={style.textT}>
  Types:{" "}
  {detail.types.map((type, index) => {
    if (typeof type === "string") {
      return (
        <span
          key={index}
          className={style.type}
          style={{ backgroundColor: typeColors[type] }}
        >
          {type.toUpperCase()}
        </span>
      );
    } else if (typeof type === "object" && type.name) {
      return (
        <span
          key={type.id}
          className={style.type}
          style={{ backgroundColor: typeColors[type.name] }}
        >
          {type.name.toUpperCase()}
        </span>
      );
    } else {
      return null;
    }
  })}
</p>
)}
                <button className={style.button} onClick={handleGoBack}>Home</button>
        
            </div>
        </div>
    )
}

export default Detail