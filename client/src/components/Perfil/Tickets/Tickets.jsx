import React,{useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "../../Navbar/Navbar"
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil"
import { paymentHandler, notificationPayment} from "../../../Redux/actions"

export default function Tickets (){


    const dispatch = useDispatch();
    const user = useSelector((state => state.user))
    const ticket = useSelector(s => s.dataPago);

    const userId = Object.keys(user).length > 0 ? user.user.id : null

    useEffect(()=> {
        if(userId !== null){

            dispatch(paymentHandler(userId));
            dispatch(notificationPayment(userId))

        }
        
    },[dispatch, userId]);

    
    const ticketsPurchased = ticket.filter(e => e.ticket.pendingPayment === true || e.ticket.paymentMade === true )

    console.log("infoticket", ticketsPurchased);



    return (

        <div>
            <Navbar/>
            <NavBarPerfil/>

            {ticketsPurchased.length > 0 ? 
            
                ticketsPurchased.map(e =>
                    
                    <div>
                        <p>Event: {e.ticket.event}</p> 
                    
                        <p>Precio: {e.ticket.price}</p>

                        <p>Tipo de ticket: {e.ticket.typeTicket}</p>
    
                        { e.ticket.paymentMade === true ? <img src={e.QR} alt='' /> : <p>Pending Payment...</p>}

                    </div>
                ): 
                <p>No tickets</p>
        
            }


        </div>
        
    )
        
};