import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useParams } from 'react-router-dom';
import { userUpdate } from "../../../Redux/actions";
import Navbar from "../../Navbar/Navbar";

export default function UserDashBoard (){


    const dispatch = useDispatch();

    const users = useSelector(state => state.users);
    const user = useSelector(s => s.user);
    const { id } = useParams();

    const usuario = users?.filter(e => e.id === id);

    const [userEdit, setUserEdit] = useState({
        first_name: "" ,
        last_name: "",
        image: "", 
        nick: "",
        isAdmin: false,
        isBanned: false
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


        const usuario = {

            first_name: userEdit.first_name.length > 0 ? userEdit.first_name : usuario[0].first_name ,
            last_name: userEdit.last_name.length > 0 ? userEdit.last_name : usuario[0].last_name,
            image: userEdit.image.length > 0 ? userEdit.image :usuario[0].image, 
            nick: userEdit.nick.length > 0 ? userEdit.nick : usuario[0].nick,
            isAdmin: userEdit.isAdmin.length > 0 ? userEdit.isAdmin : usuario[0].isAdmin,
            isBanned: userEdit.isBanned.length > 0 ? userEdit.isBanned : usuario[0].isBanned,
        };

        dispatch(userUpdate(id, usuario));
        alert("Perfil modificado con exito.");
    
    };

    const handleIsBanned = (e)=> {

        e.preventDefault();

        console.log("e banned:", e)

        // const usuario = {

        //     // first_name: userEdit.first_name.length > 0 ? userEdit.first_name : usuario[0].first_name ,
        //     // last_name: userEdit.last_name.length > 0 ? userEdit.last_name : usuario[0].last_name,
        //     // image: userEdit.image.length > 0 ? userEdit.image :usuario[0].image, 
        //     // nick: userEdit.nick.length > 0 ? userEdit.nick : usuario[0].nick,
        //     // isAdmin: userEdit.isAdmin.length > 0 ? userEdit.isAdmin : usuario[0].isAdmin,
        //     isBanned: e,
        // };

        dispatch(userUpdate(id, {isBanned: e}));
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
                <h>Acceso restringido {">:("} </h>
            </div>
        )
    }

    return (

        <div>
            <Navbar/>

            {usuario.length > 0  ? usuario.map(e => {


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
                            <label>Admin: </label>
                            <input placeholder={e.isAdmin ? "true" : "false"} name={"isAdmin"} type="text" value={userEdit.isAdmin} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div>
                            <label>Ban: </label>
                            {
                                e.isBanned ? <button onClick={handleIsBanned(false)}>Desbanear Usuario</button> : <button onClick={handleIsBanned(true)}>Banear Usuario</button>
                                /*e.isBanned ? <input name={"isBanned"} type="button" value={true} onClick={(e)=>handleIsBanned(e)} /> : <input name={"isBanned"} type="button" value={userEdit.isBanned} onClick={(e)=>handleChange(e)} />*/
                            }
                            
                        </div>
                        <div>
                            <label>Imagen: </label>
                            <img src={e.image} alt='' />
                            <input placeholder={e.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
                        </div>

                        <button type="submit" onClick={(e)=>handleSubmit(e)}>Guardar</button>
                        <button onClick={(e)=>cancel(e)}>Cancelar</button>
                    </form>
                    
                </div>

                })         
                : 

                <p>No se encuantra Usuario ...</p>
            }

        </div>
    )

};