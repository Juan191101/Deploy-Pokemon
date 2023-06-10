import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import logo from "../../assets/pokeFondoNegro.jpg";

const NavBar = () => {
  return (
    <div className={style.divContainer}>
      <img className={style.img} src={logo} alt=""></img>
      <Link to="/home" className={style.link}>
        <button className={style.button}>Home</button>
      </Link>
      <Link to="/create" className={style.link}>
        <button className={style.button}>Create!</button>
      </Link>
      <Link to="/about" className={style.link}>
        <button className={style.button}>About</button>
      </Link>
      <Link to="/" className={style.link}>
        <button className={style.button}>Landing</button>
      </Link>
    </div>
  );
};

export default NavBar;
