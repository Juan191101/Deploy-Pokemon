import style from "./About.module.css"
const About = ()=>{
  return (
    
    <div className={style.container}>
        <div className={style.container_about}>
           <p>Proyecto Individual, culmine de la cursada del bootcamp de SoyHenry, 
            para la carrera Full Stack Developer en la modalidad Full Time,
            realizado por Juan Ruarte, consiste en una 
            Single Page Application capaz de requerir datos de una API o una BDD, y guardar 
            informacion en esta ultima, y como consiguiente mostrarla en dicha aplicacion.
           </p>
        </div>
        <div className={style.container_about}>
           <p>Tecnologias utilizadas: Node, Sequelize, PostgreSQL, React, Redux, Javascript, HTML, Css.
           </p>
        </div>
      </div>
      );
}
export default About