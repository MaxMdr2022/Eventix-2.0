import React from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import "./UserBanned.css"

export default function UserBanned (){


    return (

        <div>
            <Navbar />
            
            <div className="ban">

                <h2>Esta cuenta ha sido baneada 😧 😢</h2>
                <p>Contactar con administracion para mas detlles. 😎</p>
                <p> 📧 eventix@hotmail.com 🚀</p>
                {/*<Link to='eventix@gamil.com' onClick={(e) => { window.location.href = "eventix@gamil.com"; e.preventDefault();}}> eventix@gamil.com</Link>*/}
            </div>

        </div>
    )
};