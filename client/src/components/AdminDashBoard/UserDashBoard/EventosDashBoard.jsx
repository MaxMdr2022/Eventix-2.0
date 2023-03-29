import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEvents, eventUpdate } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import "./EventosDashBoard.css";

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

            <h1 className="tituloADB">Eventos</h1>

            <div className="displayflex">

                <div className="contEventDB">

                    {
                        events.length > 0 ? 

                            events.map(e =>

                                <div className="divEvents346">
                                            
                                    <div className="tituloNEA">{e.name}</div>
                                    <p>Fecha: {e.date}</p>
                                    <p>Ubicacion: {e.location}</p>
                                    <p>Tipo de ticket: {e.price[0].tipoDeTicket}, ${e.price[0].precio}</p>
                                    <div className="m123"><img className="imgADB" src={e.image} alt="" styles={{'border-radius' : '10px', 'margin-left' : '3vw'}} /></div>
                                    <p>{e.description}</p>
                                    <p>Tipo de evento: {e.typeEvent.genre}</p>
            
                                    <div className='divBoton2'>

                                        {e.isDelete ? <input className='btnPrice2' type={"button"} onClick={()=> handlePost(e.id)} value={"Publicar Evento"}/> : <input className='btnPrice2' type={"button"}onClick={()=> handleDelete(e.id)} value={"Eliminar Evento"}/>}
                                        
                                        <Link to={'/home/' + e.id}><input type={"button"} className='btnPrice2' value={"Ir a la publicacion"} /></Link>
                                        
                                    </div>  
                                    
                                </div> )   

                            :
                        
                        <p className="pTP">Usuario sin Eventos</p>
                    }

                </div>
            </div>

                

        </div>
    )
};