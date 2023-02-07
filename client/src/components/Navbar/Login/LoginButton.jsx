import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { useHistory } from "react-router-dom";
import { Avatar, IconButton, Modal } from '@mui/material';
import {CiLogin} from 'react-icons/ci';
// import { Link } from "react-router-dom";
// import styled from "styled-components";
//import Modal from "react-modal";


export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  // const history = useHistory();
  const [modalIsOpen, setIsOpen] = useState(false);

  // const Logbut = styled.button`
  //   color: black;
  //   background-color: rgba(255, 255, 255, 1);
  //   border: 1px solid #ab4a8c;
  //   width: 5vw;
  //   transition: color 0.2s ease-out;

  //   &:hover {
  //     cursor: pointer;
  //     color: white;
  //     box-shadow: 0 0 20px rgba(104, 85, 224, 0.6);
  //     background-color: #673c77;
  //   }
  // `;

  function accountHandler() {
    return isAuthenticated ? openModal() : loginWithRedirect();
    
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  // console.log(user)


  return(
    <div>

      {!isAuthenticated ? (
          
        <IconButton  onClick={() => accountHandler()}>

          <CiLogin style={{ fontSize: 45, color: "white" }} color="primary"/>

        </IconButton>

      ):(

        <div>
          <IconButton onClick={() => accountHandler()}>
            
            <Avatar alt="p" src={user?.picture} size="lg"/>

          </IconButton>

          <IconButton  onClick={() => logout()}>

            <CiLogin style={{ fontSize: 45, color: "white" }} />

          </IconButton>

        </div>

      )}


      {/*<Modal
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={modalIsOpen}
        onClose={closeModal}
      >
        <div>
          <img src={user?.picture} alt=''/>
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          <a href="/perfil">Purchase history</a>
        </div>

      </Modal>*/}
    </div>
  );
};



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
