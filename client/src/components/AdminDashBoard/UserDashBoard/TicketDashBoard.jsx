import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../../Redux/actions";



export default function TicketDashBoard ({userId}) {

    const dispatch = useDispatch();
    const ticket = useSelector(s => s.dataPago);

    useEffect(()=> {

        if(userId !== null){

            dispatch(paymentHandler(userId));
        }
        
    },[dispatch, userId]);

    const ticketPago = ticket.filter(e => e.ticket.paymentMade === true );

    const ticketPendiente = ticket.filter(e => e.ticket.pendingPayment === true && e.ticket.paymentMade === false);

    const ticketCancelado = ticket.filter(e => e.ticket.cancelPayment === true);

    return(

        <div>

            <h1>Tickets del Usuario</h1>


            {
                ticket.length > 0 ? 

                    <div>

                        <div>

                            <h3>Tickets Pagos</h3>
                            {
                                ticketPago.length > 0 ? 

                                    ticketPago.map(e => 
                                        <div>
                                            <p>Event: {e.ticket.event}</p> 
                                        
                                            <p>Precio: {e.ticket.price}</p>

                                            <p>Tipo de ticket: {e.ticket.typeTicket}</p>
                        
                                            <img src={e.QR} alt='' /> 

                                        </div>
                                    ): 

                                <p>Usuario sin tickets pagos</p>
                            }

                        </div>


                        <div>

                            <h3>Tickets Pendientes de Pago</h3>
                            {
                                ticketPendiente.length > 0 ? 

                                    ticketPendiente.map(e => 
                                        <div>
                                            <p>Event: {e.ticket.event}</p> 
                                        
                                            <p>Precio: {e.ticket.price}</p>

                                            <p>Tipo de ticket: {e.ticket.typeTicket}</p>

                                            <img src={e.QR} alt='' /> 

                                        </div>
                                    ): 

                                <p>Usuario sin tickets pendientes</p>
                            }

                        </div>


                        <div>
                            <h3>Tickets Pago Cancelado</h3>
                            {
                                ticketCancelado.length > 0 ? 

                                    ticketCancelado.map(e => 
                                        <div>
                                            <p>Event: {e.ticket.event}</p> 
                                        
                                            <p>Precio: {e.ticket.price}</p>

                                            <p>Tipo de ticket: {e.ticket.typeTicket}</p>

                                            <img src={e.QR} alt='' /> 

                                        </div>
                                    ): 

                                <p>Usuario sin tickets Cancelados</p>
                            }

                        </div>

                    </div> 

                    
                  :
                  
                <p>Usuario sin tickets</p>
            }

        </div>
    )
};