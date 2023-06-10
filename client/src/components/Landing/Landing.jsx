import { Link } from "react-router-dom/cjs/react-router-dom.min"
import style from "./Landing.module.css"

const Landing = () =>{
    return(
        <div className={style.divContainer}>

            <h1>Pokemons!</h1>
            <Link to="/home">
                <button>Lets Go!</button>
            </Link>
        </div>
    )
}

export default Landing