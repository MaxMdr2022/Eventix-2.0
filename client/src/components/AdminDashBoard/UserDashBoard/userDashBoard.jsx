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
        window.location.reload();
    };

    const handleRemoveAdmin= (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isAdmin: false}));
   
        window.location.reload();
    };

    const handleIsBanned = (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isBanned: true}));
        window.location.reload();
    };

    const handleRemoveBanned = (e)=> {

        e.preventDefault();

        dispatch(userUpdate(id, {isBanned: false}));
   
        window.location.reload();
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

                    <div>
                        <h2>Editar Perfil</h2>

                        <p>e-mail: {e.email}</p>

                        <form >
                            <div>
                                <label>Nombre: </label>
                                <input placeholder={e.first_name} name={"first_name"} type="text" value={userEdit.first_name} onChange={(e)=>handleChange(e)}  />
                            </div>

                            <div>
                                <label>Apellido: </label>
                                <input placeholder={e.last_name} name={"last_name"} type="text" value={userEdit.last_name} onChange={(e)=>handleChange(e)} />
                            </div>

                            <div>
                                <label>Nick: </label>
                                <input placeholder={e.nick} name={"nick"} type="text" value={userEdit.nick} onChange={(e)=>handleChange(e)} />
                            </div>
                            <div>
                                {e.email === "drum_94@live.com.ar" ? null :

                                    <div>
                                        <label>Admin: </label>
                                        {
                                            e.isAdmin ? <button onClick={(e)=>handleRemoveAdmin(e)}>Quitar Admin</button> : <button onClick={(e)=>handleIsAdmin(e)}>Asignar Admin</button>
                                        }
                                    </div>
                                }
                                
                            </div>
                            <div>
                                {e.email === "drum_94@live.com.ar" ? null :


                                    <div>
                                        <label>Ban: </label>
                                        {
                                            e.isBanned ? <button onClick={(e)=>handleRemoveBanned(e)}>Desbanear Usuario</button> : <button onClick={(e)=>handleIsBanned(e)}>Banear Usuario</button>
                                        }
                                    </div>
                                }
                                
                                
                            </div>
                            <div>
                                <label>Imagen: </label>
                                <img src={e.image} alt='' />
                                <input placeholder={e.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
                            </div>

                            {e.email === "drum_94@live.com.ar" ? null :

                                <div>

                                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Guardar</button>
                                    <button onClick={(e)=>cancel(e)}>Cancelar</button>
                                </div>
                            }
                            
                            
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