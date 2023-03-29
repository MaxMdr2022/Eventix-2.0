import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUsers } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import MensajeLogeo from "../MensajeLogeo/MensajeLogeo";
import { Link } from "react-router-dom";
import "./AdminDashBoard.css"






export default function AdminDashBoard (){


    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth0();

    const users = useSelector(state => state.users);
    const user = useSelector(s => s.user)

    console.log("usuarios", users)
    // useEffect( ()=> {

    //     dispatch(getUsers());

    // }, [dispatch]);

    if(!isAuthenticated){
        return(
            <div>
                <MensajeLogeo />
            </div>
        )
    }


    if(!user.user){

        return(

            <div>
                <Navbar/>
                <p>Cargando...</p>
            </div>
        )
    }

    if(!user.user?.isAdmin){

        return (

            <div>
                <Navbar/>
                <h1>Acceso restringido 😤 😡 ☠</h1>
            </div>
        )
    }

    return (

        <div>
            <Navbar/>

            <h1 className="tituloAdmPan">Panel Administrador</h1>

            <div className="contNavAd">

                <div>Nombre </div>
                <div> Apellido </div>
                <div> Nick </div>
                <div> E-mail </div>
                <div> Administrador </div>
                <div> Imagen </div>
                <div>Usuario Baneado</div>
                <div> Ver más </div>
            </div>
            
            <div >

                {
                    users.length > 0 ? users.map((e, i) => {

                        return(

                            <div className="contAdm" key={i}>
    
                                <div><p className="puntitoss">{e.first_name}</p></div>
                                <div><p className="puntitoss">{e.last_name}</p></div>
                                <div><p className="puntitoss">{e.nick}</p>  </div>
                                <div ><p className="puntitoss">{e.email}</p>  </div>
                                {e.isAdmin ? <div>true</div> :<div>false</div> } 
                                <div><img className="imgAdm"  src={e.image} alt='' /></div>
                                {e.isBanned ? <div>true</div> : <div> false</div>}
                                <div className='divBoton'><Link to={`/userdashboard/${e.id}`}><input type={"button"} className='btnPrice' value={"Ver más"}/></Link></div>
                                
                            </div>
                        )
                        
                        
                    })
                    :
                    <p>cargando...</p>
                }
            </div>

        </div>
    );


};


// users:[
//     {
//         email: "drum_94@live.com.ar"
//         first_name: "Administrador"
//         id: "bd200259-83e1-4a67-9b93-86891bf0e102"
//         image: "https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
//         isAdmin:true
//         last_name: "Maxi"
//         nick: "Eventix Administrador",
//         isBanned: false
//     },
//     {
//         email: "juanmatgom@hotmail.com"
//         first_name: "juan"
//         id: "601a1c2a-1794-4300-b663-ad052d466268"
//         image: "https://s.gravatar.com/avatar/a5745a6ef2519de003a77933f839b69a?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
//         isAdmin: false
//         last_name: "gutierrz"
//         nick: "maxguti777",
//         isBanned: false
//     } 

// ]