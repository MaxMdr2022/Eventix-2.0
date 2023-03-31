import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { getUserEvents, eventUpdate } from "../../../Redux/actions";
import Modal from "react-modal"
import { useAuth0 } from "@auth0/auth0-react";
import MensajeLogeo from "../../MensajeLogeo/MensajeLogeo";
import UserBanned from "../../UserBanned/UserBanned";
import "./Eventos.css";

export default function Eventos (){


    const dispatch = useDispatch();
    const user = useSelector((state => state.user));
    const events = useSelector(state => state.userEvents);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [eventId, setEventId] = useState();
    const { isAuthenticated } = useAuth0();

    // console.log("event ", events);

    const userId = Object.keys(user).length > 0 ? user.user.id : null;
    const eventsFilter = events.filter(e => !e.isDelete)    

    useEffect(()=> {
        if(userId !== null){

            dispatch(getUserEvents(userId));

        }
        
    },[dispatch, userId]);

    function openModal(id) {
        setIsOpen(true);
        setEventId(id)
        console.log("is", id)
    };

    function closeModal() {
        setIsOpen(false);
    };

    function handleDelete (e){
        e.preventDefault();
        dispatch(eventUpdate(eventId, {isDelete: true}))
        setIsOpen(false);
        alert("Evento Eliminado");
        window.location.reload();
    };

    if(!isAuthenticated){
        return(
            <div>
                <MensajeLogeo/>
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
                    <h2 className="tituloPerfil">Mis Eventos 😎</h2>

                    <div>
                        {eventsFilter.length > 0 ?

                            <div className="cont4319">
                                
                                {eventsFilter.map(e =>

                                    <div className="cont346">
                                            
                                        <h2>{e.name}</h2>
                                        <img src={e.image} alt="" styles={{'border-radius' : '10px', 'margin-left' : '3vw'}} width={278} height={300}/>
                                        <p>Fecha: {e.date}</p>
                                        <p>Ubicacion: {e.location}</p>
                                        <p>Tipo de ticket: {e.price[0].tipoDeTicket}, ${e.price[0].precio}</p>
                                        <p>Tipo de evento: {e.typeEvent.genre}</p>
                                        <p style={{"textAlign":"center"}}>{e.description}</p>

                                        <div className='divBoton'>
                                            <Link to={'/home/' + e.id}><input type={"button"} className='btnPrice' value={"Ir a la publicacion"} /></Link>
                                            <input className='btnPrice' type={"button"} onClick={()=> openModal(e.id)} value={"Eliminar Evento"}/>
                                        
                                        </div>    
                                       
                                        
                                      
                                        
                                    </div>
                                
                                )}
                                
                            </div>
                            : 
                            <p>No events</p>

                        }
                    </div>

                    
                </div>
                
            </div>
            


            <div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal">

                    <div className='modal' >

                        <p> ¿ Quiere eliminar el evento ? :o </p>
                        {console.log("idddd", eventId)}
                        <button onClick={(e)=>handleDelete(e)}>Eliminar Evento</button>
                        <button onClick={(e)=>closeModal(e)}>Cancelar</button>

                    </div>
                    
                </Modal>   
            </div>

        </div>
        
    )
        
}


// events : 

//     createInDB: true
//     date: "2 de enero de 2023"
//     delete: false
//     description:"asdasdasdasd"
//     id: "53cd5414-fa4e-40f2-8e9c-41b969f2d182"
//     image: "https://t2.rg.ltmcdn.com/es/posts/5/6/2/albondigas_con_salsa_agridulce_20265_600.jpg"
//     imageBanner: null
//     location: "colon"
//     name: "maxi"
//     price: [{precio: '1234', tipoDeTicket: 'entrada'}]
//     rating: null
//     typeEvent: {genre: "Rock"}
//     userId: "f70d7daa-54d8-42ba-b146-a86185915b83"