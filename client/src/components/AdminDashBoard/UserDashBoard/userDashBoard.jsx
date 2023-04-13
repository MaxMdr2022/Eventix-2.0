import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from 'react-router-dom';
import { userUpdate } from "../../../Redux/actions";
import Navbar from "../../Navbar/Navbar";
import EventosDashBoard from "./EventosDashBoard";
import TicketDashBoard from "./TicketDashBoard";
import ComentariosDashBoard from "./ComentariosDahsBoard";


export default function UserDashBoard (){


    const dispatch = useDispatch();
    const history = useHistory();

    const users = useSelector(state => state.users);
    const user = useSelector(s => s.user);
    const { id } = useParams();

    const usuario = users?.filter(e => e.id === id);

    const [userEdit, setUserEdit] = useState({
        first_name: "" ,
        last_name: "",
        image: "", 
        nick: "",
    });

    const handleChange = (e)=> {

        if(e){
           
            setUserEdit({
                ...userEdit,
                [e.target.name]: e.target.value
            });
        };
    };

    const handleSubmit =(e) => {

        e.preventDefault();


        const usuarioModificado = {

            first_name: userEdit.first_name.length > 0 ? userEdit.first_name : usuario[0].first_name ,
            last_name: userEdit.last_name.length > 0 ? userEdit.last_name : usuario[0].last_name,
            image: userEdit.image.length > 0 ? userEdit.image :usuario[0].image, 
            nick: userEdit.nick.length > 0 ? userEdit.nick : usuario[0].nick,
            // isAdmin: userEdit.isAdmin.length > 0 ? userEdit.isAdmin : usuario[0].isAdmin,
            // isBanned: userEdit.isBanned.length > 0 ? userEdit.isBanned : usuario[0].isBanned,
        };

        dispatch(userUpdate(id, usuarioModificado));
        alert("Perfil modificado con exito.");
    
    };

    const handleIsAdmin = (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isAdmin: true}));
        // window.location.reload();
        alert("Usuario con Permisos de Administrador");
    };

    const handleRemoveAdmin= (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isAdmin: false}));
   
        // window.location.reload();
        alert("Usuario sin Permisos de Administrador");
    };

    const handleIsBanned = (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isBanned: true}));
        // window.location.reload();
        alert("Usuario Baneado");
    };

    const handleRemoveBanned = (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isBanned: false}));
   
        // window.location.reload();
        alert("Usuario desbaneado");
    };

    const cancel = (e) => {

        e.preventDefault();
        history.push("/admindashboard");
    };

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
                <h1>Acceso restringido 😤 😡 </h1>
            </div>
        )
    }

    return (

        <div>
            <Navbar/>

            {usuario.length > 0  ? usuario.map(e => {

                return (

                    <div className="divCont853">
                        <h2 className="tituloPerfil"> Editar Perfil 📝</h2>

                        <div className="emailCont">

                            <p className="emailP">e-mail: </p>

                            <div className="emailBar">
                                <p className="email2">{e.email}</p>
                            </div> 
                        </div>

                        <form autocomplete="off">

                            <div className="cont654">

                                <div>

                                    <div className="contSet" >
                                        <input className='setInp' placeholder={e.first_name} name={"first_name"} type="text" value={userEdit.first_name} onChange={(e)=>handleChange(e)}  />
                                        <label className='setLab'>Nombre: </label>
                                    
                                    </div>

                                    <div className="contSet" >
                                        <input className='setInp' placeholder={e.last_name} name={"last_name"} type="text" value={userEdit.last_name} onChange={(e)=>handleChange(e)} />
                                        <label className='setLab'>Apellido: </label>
                                    
                                    </div>

                                    <div className="contSet" >
                                        <input className='setInp' placeholder={e.nick} name={"nick"} type="text" value={userEdit.nick} onChange={(e)=>handleChange(e)} />
                                        <label className='setLab'>Nick: </label>
                                    
                                    </div>

                                    <div>
                                    <div className="contSet" >

                                        <input className='setInp' placeholder={e.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
                                        <label className='setLab'>Imagen: </label>
                                    </div>

                                        {e.email === "drum_94@live.com.ar" ? null :

                                            <div className="btnAdmin23">
                                                <label>Admin: </label>
                                                {
                                                    e.isAdmin ? <input className='btnPrice' type={"button"} onClick={(e)=>handleRemoveAdmin(e)} value={"Quitar Admin"}/> :  <input className='btnPrice' type={"button"} onClick={(e)=>handleIsAdmin(e)} value={"Asignar Admin"}/> 
                                                }
                                            </div>
                                        }
                                        
                                    </div>
                                    <div>
                                        {e.email === "drum_94@live.com.ar" ? null :


                                            <div  className="btnAdmin232">
                                                <label >Ban: </label>
                                                {
                                                    e.isBanned ? <input className='btnPrice' type={"button"} onClick={(e)=>handleRemoveBanned(e)} value={"Desbanear Usuario"}/> : <input className='btnPrice' type={"button"}  onClick={(e)=>handleIsBanned(e)} value={"Banear Usuario"}/> 
                                                }
                                            </div>
                                        }
                                        
                                        
                                    </div>

                                </div>
                                
                                <div className="imagenSet">
                                    <img className="imgSet" src={e.image} alt='' />
                                </div>

                                {e.email === "drum_94@live.com.ar" ? null :

                                    <div className="botonesSet">
                                        <input className='btnPrice' type={"submit"} onClick={(e)=>handleSubmit(e)} value={"Guardar Cambios"}/>
                                        <input className='btnPrice' type={"button"} onClick={(e)=>cancel(e)} value={"Cancelar Cambios"}/>
                                        
                                    </div>
                                }
                            </div>
                            
                            
                            
                        </form>
                        
                    </div>
                )
                

                })         
                : 

                <p>No se encuantra Usuario ...</p>
            }

            <div>
                <TicketDashBoard idUser={id}/>

            </div>

            <div>
                <EventosDashBoard idUser={id} />
            </div>

            <div>
                <ComentariosDashBoard idUser={id} />
            </div>
        </div>
    )

};