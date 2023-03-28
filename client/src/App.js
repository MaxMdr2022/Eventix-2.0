import React from 'react'
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import aboutUs from './components/About Us/AboutUs';
import createEvent from './components/createEvent/createEvent';
import Perfil from './components/Perfil/Perfil';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser, getUsers } from "./Redux/actions/index";
import Eventos from './components/Perfil/Events/Eventos';
import Setings from './components/Perfil/Setings/Setings';
import ReviewsPerfil from './components/Perfil/ReviewsPerfil/ReviewsPerfil';
import Tickets from './components/Perfil/Tickets/Tickets';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import UserDashBoard from './components/AdminDashBoard/UserDashBoard/userDashBoard';
import CrearEvento from './components/CrearEvento/CrearEvento';
import ScrollButton from './components/ScrollButton/ScrollButton';
import axios from "axios";

axios.defaults.baseURL ="http://localhost:3001/" //";//http://localhost:3001/ "https://eventix-production.up.railway.app/"

function App() {

  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  // console.log("userr- app.js: ",user)

  useEffect(() => {
    const createUserFromDispatch = () => {
      if (isAuthenticated) {
        dispatch(createUser(user));
        dispatch(getUsers())
      }
    };
    createUserFromDispatch();
  }, [user, dispatch]);

  //user :
  // email: "juanmatgom@hotmail.com"
  // email_verified: false
  // name: "juanmatgom@hotmail.com"
  // nickname: "juanmatgom"
  // picture: "https://s.gravatar.com/avatar/a5745a6ef2519de003a77933f839b69a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
  // sub: "auth0|63dd3b9d641e1d30b85c53a5"
  // updated_at: "2023-02-03T16:51:41.305Z"
  
  return (
    <div>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/home/:id"} component={Detail} />
        <Route exact path={"/aboutUs"} component={aboutUs} />
        <Route exact path={"/createevents"} component={CrearEvento} />
        <Route exact path={"/perfil"} component={Perfil} />
        <Route exact path={"/perfil/tickets"} component={Tickets} />
        <Route exact path={"/perfil/eventos"} component={Eventos} />
        <Route exact path={"/perfil/reviews"} component={ReviewsPerfil} />
        <Route exact path={"/perfil/setings"} component={Setings} />
        <Route exact path={"/admindashboard"} component={AdminDashBoard} />
        <Route exact path={"/userdashboard/:id"} component={UserDashBoard} />
      </Switch>
      <ScrollButton />
    </div>
  );
}

export default App;
