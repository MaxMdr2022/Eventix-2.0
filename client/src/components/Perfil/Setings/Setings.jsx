import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar"
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil"
import { userUpdate } from "../../../Redux/actions";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MensajeLogeo from "../../MensajeLogeo/MensajeLogeo";
import UserBanned from "../../UserBanned/UserBanned";
import "./Setings.css"

export default function Setings (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state => state.user));
    const userId = Object.keys(user).length > 0 ? user.user.id : null;
    const { isAuthenticated } = useAuth0();

    // console.log("user_", user);

    const [userEdit, setUserEdit] = useState({
        first_name: "" ,
        last_name: "",
        image: "", 
        nick: ""
    })

  
    // useEffect(()=> {
        


    // },[dispatch, userEdit]);


    const handleChange = (e)=> {

        if(e){
           
            setUserEdit({
                ...userEdit,
                [e.target.name]: !e.target.value.length > 0 ? user.user.name : e.target.value
            });
        };
    };

    const handleSubmit =(e) => {

        e.preventDefault();


        const usuario = {

            first_name: userEdit.first_name.length > 0 ? userEdit.first_name : user.user.first_name ,
            last_name: userEdit.last_name.length > 0 ? userEdit.last_name : user.user.last_name,
            image: userEdit.image.length > 0 ? userEdit.image : user.user.image, 
            nick: userEdit.nick.length > 0 ? userEdit.nick : user.user.nick
        };

        dispatch(userUpdate(userId, usuario));
        alert("Perfil modificado con exito.");
    
    };

    const cancel = (e) => {

        e.preventDefault();
        history.push("/perfil");
    };
    
    if(!isAuthenticated){
        return (
            <div>
                <MensajeLogeo />
            </div>
        )
    }

    if(user.user?.isBanned){
        return(
            <div>
                <UserBanned />
            </div>
        )
    }

    return (

        <div>
            <Navbar/>

            <div className="contPerfil">
                <NavBarPerfil/>

                <div>

                    <h2 className="tituloPerfil"> Editar Perfil 📝</h2>

                    <div>

                        {Object.keys(user).length > 0  ? 
                        
                            <div>
                            
                                
                                <div className="emailCont">

                                    <p className="emailP">e-mail: </p>

                                    <div className="emailBar">
                                        <p className="email2">{user.user.email}</p>
                                    </div> 
                                </div>

                                <form autocomplete="off" >

                                    <div className="cont654">

                                        <div>

                                            <div className="contSet" >
                                                
                                                <input className='setInp' placeholder={user.user.first_name} name={"first_name"} type="text" value={userEdit.first_name} onChange={(e)=>handleChange(e)}  />
                                                <label className='setLab'>Nombre: </label>
                                            </div>

                                            <div className="contSet">
                                                
                                                <input className='setInp' placeholder={user.user.last_name} name={"last_name"} type="text" value={userEdit.last_name} onChange={(e)=>handleChange(e)} />
                                                <label className='setLab'>Apellido: </label>
                                            </div>

                                            <div className="contSet">
                                                
                                                <input className='setInp' placeholder={user.user.nick} name={"nick"} type="text" value={userEdit.nick} onChange={(e)=>handleChange(e)} />
                                                <label className='setLab'>Nick: </label>
                                            </div>
                                            <div className="contSet">

                                                <input className='setInp'  placeholder={user.user.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
                                                <label className='setLab'>Imagen: </label>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="imagenSet">
                                            <img className="imgSet" src={user.user.image} alt='' />
                                        </div>
                                        
                                        <div className="botonesSet">
                                            <input className='btnPrice' type={"submit"} onClick={(e)=>handleSubmit(e)} value={"Guardar Cambios"}/>
                                            <input className='btnPrice' type={"button"} onClick={(e)=>cancel(e)} value={"Cancelar Cambios"}/>

                                        </div> 
                                    </div>
                                    
        
                                </form>
                                
                            </div>
                            
                            : 
                            <p>No se encuantra Usuario ...</p>
                        }
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        
    )
        
};