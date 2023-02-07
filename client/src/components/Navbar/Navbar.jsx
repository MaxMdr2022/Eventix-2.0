import React, {useState} from "react";
import { LoginButton } from "./Login/LoginButton";
import {NavBar, Menu, Leftbar, Rightbar, H1, H3} from '../Styles/Styles'
import "./navbar.css";
import Modal from '../createEvent/createEvent'
// import Filters from "../Filters/Filters";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // const [logeado, setLogeado] = useState(false)

  const user = useSelector(s => s.user)

  // console.log("user navbar", user.user?.isAdmin);
  // const islog = () => {
  //   setLogeado(true)
  // }
  const openIt = () => {
    setIsOpen(true)
  }

  const closeIt = () => {
    setIsOpen(false)
  }

  const {isAuthenticated} = useAuth0();

  // console.log("Navbar-isautenticated:::", isAuthenticated);


  return (

    <Menu>

      <NavBar>

        <Leftbar>

          <a href="/">
            <H1>Eventix</H1>
          </a>
          <a href="/aboutUs">
            <H3>About us</H3>
          </a>
          
          {!isAuthenticated ? null : !user.user?.isBanned ? <a style={{cursor : 'pointer'}} onClick={openIt}>Create Events</a> : null}
          {!isAuthenticated ? null : !user.user?.isBanned ? <a href="/perfil">Profile</a> : null}
          {!isAuthenticated ? null : user.user?.isAdmin ? <a href="/admindashboard">Panel Administrador</a>: null}
        </Leftbar>

        <Rightbar>
          
          <LoginButton />

        </Rightbar>

      </NavBar>



      <Modal isopen={isOpen} close={closeIt}/>
    </Menu>
  );
}



// user {

//   isCreated : false,
//   user : {
//     // email: "drum_94@live.com.ar"
//     // first_name: "Administrador"
//     // id: "51d03316-92d0-4e8f-b470-702da75d0384"
//     // image: "https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
//     // isAdmin: true
//     // last_name: "Maxi"
//     // nick: "Eventix Administrador"
//   }

// }