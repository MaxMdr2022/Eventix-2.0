import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

export default function UserBanned (){


    return (

        <div>
            <Navbar />

            <h1>Eventix</h1>

            <h3>Esta cuenta ha sido baneada 😧 😢</h3>
            <p>Contactar con administracion para mas detlles. 😎</p>
            <p> 📧 eventix@hotmail.com 🚀</p>
            {/*<Link to='eventix@gamil.com' onClick={(e) => { window.location.href = "eventix@gamil.com"; e.preventDefault();}}> eventix@gamil.com</Link>*/}

        </div>
    )
};