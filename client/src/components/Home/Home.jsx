import React from "react";
// import AboutUs from "../About Us/AboutUs";
import Grid from "../Grid/Grid";
import Navbar from "../Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import "./home.css";
import Carrousel from "../Carousel/Carrousel";
import Filters from "../Filters/Filters";
import { H1 } from "../Styles/Styles";
import UserBanned from "../UserBanned/UserBanned";

import { useSelector } from "react-redux";






function Home() {

  const history = useHistory();
  const { logout } = useAuth0();

  const user = useSelector(s => s.user)
  // console.log("usuario", user)

  function handleClick(){
    logout()
    return history.push("/")
  }

  // console.log("averrr", /unauthorized/.test(window.location.href))
    
  if (/unauthorized/.test(window.location.href)) {

    return (
      <div>
        <p>A verification email has been sent to your email. After verification <a style={{color:"white", textDecoration:"underline"}} href="/">click here</a> to continue :D</p>
        <p>¿Can´t verify? Start over by <button onClick={() => handleClick()}>Clicking here</button></p>
      </div>
    );
  }

  if(user.user?.isBanned){

    return (

      <div>
        <UserBanned/>
      </div>
    )

  }

  return (
    <div>
      <Navbar />
      <Carrousel/>
      <div className="grid">
      <H1>EVENTS</H1>
      <Filters/>
        <Grid />
      </div>
    </div>
  );
  
}

export default Home;
