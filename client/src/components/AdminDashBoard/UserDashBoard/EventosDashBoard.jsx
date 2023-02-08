import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEvents, eventUpdate } from "../../../Redux/actions";
import { Link } from "react-router-dom";

export default function EventosDashBoard ({idUser}){

    // console.log("iduser", idUser);


    const dispatch = useDispatch();
    const events = useSelector(state => state.userEvents);

    // const [eventId, setEventId] = useState();

    useEffect(()=> {

        if(idUser !== null){

            dispatch(getUserEvents(idUser));
        }
        
    },[dispatch, idUser]);

    function handleDelete (id){
        // e.preventDefault();
        dispatch(eventUpdate(id, {isDelete: true}));
        alert("Evento Eliminado");
        window.location.reload();
    };

    function handlePost (id){
        // e.preventDefault();
        dispatch(eventUpdate(id, {isDelete: false}));
        alert("Evento publicado");
        window.location.reload();
    };

    return(

        <div>

            <h1>Eventos</h1>

            <span>Nombre</span>
            <span>Fecha</span>
            <span>Ubicacion</span>
            <span>Precio</span>
            <span>Imagen</span>
            <span>Descripcion</span>
            <span>tipo Evento</span>
            <span>Publicado/Eliminado</span>

            {
                events.length > 0 ? 

                    events.map(e =>

                        <div>
                                
                            <h3>{e.name}</h3>
                            <p>Fecha: {e.date}</p>
                            <p>Ubicacion: {e.location}</p>
                            <p>Tipo de ticket: {e.price[0].tipoDeTicket}, ${e.price[0].precio}</p>
                            <img src={e.image} alt="" styles={{'border-radius' : '10px', 'margin-left' : '3vw'}} width={278} height={300}/>
                            <p>{e.description}</p>
                            <p>Tipo de evento: {e.typeEvent.genre}</p>
                            {e.isDelete ? <button onClick={()=> handlePost(e.id)}>Publicar Evento</button> :<button onClick={()=> handleDelete(e.id)}>Eliminar Evento</button>}
                            
                            <Link to={'/home/' + e.id}>Ver Más</Link>
   
                        </div>)

                    :
                
                <p>Usuario sin Eventos</p>
            }
                

        </div>
    )
};