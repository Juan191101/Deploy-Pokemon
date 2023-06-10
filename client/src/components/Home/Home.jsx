import Cards from "../Cards/Cards"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPokemons } from "../../redux/actions"
import style from "./Home.module.css"

const Home = () =>{
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPokemons())
    },[dispatch])
    return(
        <div className={style.divContainer}>
            <Cards></Cards>
        </div>
    )
}

export default Home