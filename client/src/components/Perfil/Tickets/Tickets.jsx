import React,{useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "../../Navbar/Navbar"
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil"
import { paymentHandler, notificationPayment} from "../../../Redux/actions"
import { useAuth0 } from "@auth0/auth0-react"
import MensajeLogeo from "../../MensajeLogeo/MensajeLogeo"
import UserBanned from "../../UserBanned/UserBanned"
import "./Tickets.css";

export default function Tickets (){


    const dispatch = useDispatch();
    const user = useSelector((state => state.user))
    const ticket = useSelector(s => s.dataPago);

    const { isAuthenticated } = useAuth0();

    const userId = Object.keys(user).length > 0 ? user.user.id : null

    useEffect(()=> {
        if(userId !== null){

            dispatch(paymentHandler(userId));
            dispatch(notificationPayment(userId))

        }
        
    },[dispatch, userId]);

    
    const ticketsPurchased = ticket.filter(e => e.ticket.pendingPayment === true || e.ticket.paymentMade === true )

    console.log("infoticket", ticketsPurchased);

    if(!isAuthenticated){

        return(

            <div>
                <MensajeLogeo />
            </div>
        )
        
    };

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

                    <div>

                        <h2 className="tituloPerfil">🤩 Mis Entradas 🎟 😄</h2>

                        <div className="contTicket">


                            {/*<div>
                                <p>Evento: soda stereo</p> 
                            
                                <p>Precio: $4000</p>

                                <p>Tipo de ticket: Entrada general</p>

                                <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                  
                                <p>Pago pendiente...</p>

                            </div>

                            <p>Sin tickets</p>*/}

                            {ticketsPurchased.length > 0 ? 

                                ticketsPurchased.map(e =>
                                    
                                    <div>
                                        <p>Evento: {e.ticket.event}</p> 
                                    
                                        <p>Precio: {e.ticket.price}</p>

                                        <p>Tipo de ticket: {e.ticket.typeTicket}</p>

                                        { e.ticket.paymentMade === true ? <img src={e.QR} alt='' /> : <p>Pago pendiente...</p>}

                                    </div>
                                ): 


                                <p>Sin tickets</p>

                            }
                        </div>


                    </div>

                </div>

            </div>

        </div>
        
    )
        
};