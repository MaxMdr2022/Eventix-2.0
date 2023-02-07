import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar"
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil"
import { userUpdate } from "../../../Redux/actions";
import { useHistory } from "react-router-dom";

export default function Setings (){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state => state.user));
    const userId = Object.keys(user).length > 0 ? user.user.id : null;

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
    

    return (

        <div>
            <Navbar/>
            <NavBarPerfil/>

            {Object.keys(user).length > 0  ? 
            
                <div>
                    <h2>Editar Perfil</h2>

                    <p>e-mail: {user.user.email}</p>

                    <form >
                        <div>
                            <label>Nombre: </label>
                            <input placeholder={user.user.first_name} name={"first_name"} type="text" value={userEdit.first_name} onChange={(e)=>handleChange(e)}  />
                        </div>

                        <div>
                            <label>Apellido: </label>
                            <input placeholder={user.user.last_name} name={"last_name"} type="text" value={userEdit.last_name} onChange={(e)=>handleChange(e)} />
                        </div>

                        <div>
                            <label>Nick: </label>
                            <input placeholder={user.user.nick} name={"nick"} type="text" value={userEdit.nick} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div>
                            <label>Imagen: </label>
                            <img src={user.user.image} alt='' />
                            <input placeholder={user.user.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
                        </div>

                        <button type="submit" onClick={(e)=>handleSubmit(e)}>Guardar</button>
                        <button onClick={(e)=>cancel(e)}>Cancelar</button>
                    </form>
                    
                </div>
                
                : 
                <p>No se encuantra Usuario ...</p>
            }
        </div>
        
    )
        
};