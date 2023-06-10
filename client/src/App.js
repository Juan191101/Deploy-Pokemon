import './App.css';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar';
import Details from './components/Details/Details'
import Form from './components/Form/Form';
import {Route} from "react-router-dom"
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import About from './components/About/About';
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3001/'

function App() {
  const location = useLocation();
  const hideNavBar = location.pathname === "/" || location.pathname.startsWith("/details/");

  return (
    <div className="App">
      {!hideNavBar && <NavBar></NavBar>}

      <Route exact path="/">
        <Landing></Landing>
      </Route>

      <Route path="/home">
        <Home></Home>
      </Route>

      <Route path="/create">
        <Form></Form>
      </Route>

      <Route path="/details/:id">
        <Details></Details>
      </Route>

      <Route path="/about">
        <About></About>
      </Route>
    </div>
  );
}


export default App;
