import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler } from "../../../Redux/actions";
import "./TicketDashBoard.css";


export default function TicketDashBoard ({userId}) {

    const dispatch = useDispatch();
    const ticket = useSelector(s => s.dataPago);

    console.log("userid ", userId)

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

            <h2 className="tituloTP">Tickets del Usuario</h2>


            {
                ticket.length > 0 ?

                    <div>

                        <div>
                            <h2 className="tickPagos">Tickets Pagos</h2>
                            
                            <div className="contTP">

                                {/*<div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>

                                }{
                                <div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>*/}
                              

                                {
                                    ticketPago.length > 0 ? 

                                        ticketPago.map(e => 
                                            <div className="contTickPago">
                                                <p>Event: {e.ticket.event}</p> 
                                            
                                                <p>Precio: {e.ticket.price}</p>

                                                <p>Tipo de ticket: {e.ticket.typeTicket}</p>
                            
                                                <img className="qr" src={e.QR} alt='' /> 

                                            </div>
                                        ): 

                                    <p className="pTP">Usuario sin tickets pagos</p>
                                }

                            </div>
                        </div>    


                        <div>

                            <h2 className="tickPagos">Tickets Pendientes de Pago</h2>
                            <div className="contTP">

                                {/*<div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>

                                }{
                                <div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>
                                */}

                                {
                                    ticketPendiente.length > 0 ? 

                                        ticketPendiente.map(e => 
                                            <div className="contTickPago">
                                                <p>Event: {e.ticket.event}</p> 
                                            
                                                <p>Precio: {e.ticket.price}</p>

                                                <p>Tipo de ticket: {e.ticket.typeTicket}</p>

                                                <img className="qr" src={e.QR} alt='' /> 

                                            </div>
                                        ): 

                                    <p className="pTP">Usuario sin tickets pendientes</p>
                                }
                            </div>    


                        </div>


                        <div>
                            <h2 className="tickPagos">Tickets Pago Cancelado</h2>

                            <div className="contTP">

                                {/*<div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>

                                }{
                                <div className="contTickPago">

                                    <p>Evento: soda stereo</p> 
                                
                                    <p>Precio: $4000</p>

                                    <p>Tipo de ticket: Entrada general</p>

                                    <img className="qr" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png"} alt='' /> 
                                    
                                    
                                </div>
                                */}

                                {
                                    ticketCancelado.length > 0 ? 

                                        ticketCancelado.map(e => 
                                            <div className="contTickPago">
                                                <p>Event: {e.ticket.event}</p> 
                                            
                                                <p>Precio: {e.ticket.price}</p>

                                                <p>Tipo de ticket: {e.ticket.typeTicket}</p>

                                                <img className="qr" src={e.QR} alt='' /> 

                                            </div>
                                        ): 

                                    <p className="pTP">Usuario sin tickets Cancelados</p>
                                }
                            </div>

                        </div>

                    </div> 

                    
                    :
                  
                <p className="pTP1">Usuario sin tickets</p>
            }

        </div>
    )
};