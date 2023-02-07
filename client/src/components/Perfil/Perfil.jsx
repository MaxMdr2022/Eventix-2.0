import React, {useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentHandler, notificationPayment, getUserEvents, getUserReviews } from "../../Redux/actions";
import Navbar from "../Navbar/Navbar";
import { PersonalContainer } from "../Styles/Styles";
import './Perfil.css';
import {Rating} from 'react-simple-star-rating';
import { Carousel } from "react-responsive-carousel";
import Modal from '../createEvent/createEvent'
import {Link} from 'react-router-dom'
import NavBarPerfil from "./NavBarPerfil/NavBarPerfil";

export default function Perfil () {
    
    
    const usuario = useSelector((state => state.user))
    // const usuario = Object.keys(user).length > 0 ? user : ""

    
    
    return (

        <div>
            <Navbar/>
            <NavBarPerfil/>

            <div>
                <h2>Perfil de {usuario.user?.nick}</h2>

                <img src={usuario.user?.image} alt='' />

                <p>E-mail: {usuario.user?.email}</p>

                <p>Nombre: {usuario.user?.first_name}</p>
                <p>Apellido: {!usuario.user?.last_name.length > 0 ? "-" : usuario.user.last_name}</p>
                <p>Nick: {usuario.user?.nick}</p>
            </div>

        </div>
        
    )
    
    // user {

    //   isCreated : false,
    //   user : {
    //     // email: "drum_94@live.com.ar"
    //     // first_name: "Administrador"
    //     // id: "51d03316-92d0-4e8f-b470-702da75d0384"
    //     // image: "https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg"
    //     // isAdmin: true
    //     // last_name: "Maxi"
    //     // nick: "Eventix Administrador"
    //   }

    // }
    
    
    
    
    
    
    //-------------------------------------------------------------------------------------------------------------
    
    // const [Render, setRender] = useState(null)

    // const dispatch = useDispatch();
    // const user = useSelector((state => state.user))
    // const ticket = useSelector(s => s.dataPago);
    // const events = useSelector(state => state.userEvents)
    // const reviews = useSelector(state => state.userReviews)

    // const userId = Object.keys(user).length > 0 ? user.user.id : null
 
    // const [isOpen, setIsOpen] = useState(false)

    // const [userEdit, setUserEdit] = useState({
    //     first_name: "" ,
    //     last_name: user.user?.last_name === undefined ? "apellido": user.user.last_name,
    //     image: user.user?.image, 
    //     nick: user.user?.nick
    // });

    // const openIt = () => {
    //   setIsOpen(true)
    // }
  
    // const closeIt = () => {
    //   setIsOpen(false)
    // }

    // useEffect(()=> {
    //     if(userId !== null){

    //         dispatch(paymentHandler(userId));
    //         dispatch(notificationPayment(userId))
    //         dispatch(getUserEvents(userId))
    //         dispatch(getUserReviews(userId))
    //     }
        
    // },[dispatch, userId]);

    
    // const ticketsPurchased = ticket.filter(e => e.ticket.pendingPayment === true || e.ticket.paymentMade === true )

    // // console.log("infoticket", ticketsPurchased);
    // const ticketClick = (e) => {
    //     e.preventDefault();
    //     setRender(ticketsPurchased.length > 0 ? 
            
    //         ticketsPurchased.map(e =>
                
    //             <div>
    //                 <p>Event: {e.ticket.event}</p> 
                
    
    //                 { e.ticket.paymentMade === true ? <img src={e.QR} alt='' /> : <p>Pending Payment...</p>}
    //             </div>
    //         ): 
    //         <p>No tickets</p>)

    // }

    // const reviewClick = (e) => {
    //     e.preventDefault();
    //     setRender(reviews.length > 0 ? 
    //         <Carousel>
    //             {
    //               reviews.map(e =>
                
    //             <div>
    //                 <h3 style={{'text-align' : 'center'}}>{e.title}</h3>
    //                 <Rating readonly={true} initialValue={e.stars} />
    //                 <p style={{'text-align' : 'center'}}>{e.text}</p>
    //             </div>
    //         )  
    //             }
                
    //         </Carousel>
    //         : 
    //         <p>No Reviews</p>)

    // }

    // const eventClick = (e) => {
    //     e.preventDefault();

    //     setRender(events.length > 0 ? 
    //         <div style={{display : 'flex'}}>{events.map(e =>
    //             <Link to={'/home/' + e.id}>
    //                 <div>
    //                     <img src={e.image} alt="" styles={{'border-radius' : '10px', 'margin-left' : '3vw'}} width={278} height={300}/>
    //                     <h3>{e.name}</h3>
    //                 </div>
    //             </Link>
                
    //         ) }
                
    //         </div>
    //        : 
    //         <p>No events</p>)

    // }

    // const handleChange = (e)=> {

    //     if(e){

           
    //         setUserEdit({
    //             ...userEdit,
    //             [e.target.name]: e.target.value
    //         })

    //         console.log("userEdit:",userEdit)
    //     }

        
    // };

    // const handleSubmit =(e) => {

        

    // };

    // const setingsClick = (e) =>{

    //     e.preventDefault();
    //     setRender(Object.keys(user).length > 0  ? 
            
    //         <div>
    //             <h2>Editar Perfil</h2>

    //             <p>e-mail: {user.user.email}</p>

    //             <form >
    //                 <div>
    //                     <label>Nombre: </label>
    //                     <input placeholder={user.user.first_name} name={"first_name"} type="text" value={userEdit.first_name} onChange={(e)=>handleChange(e)}  />
    //                 </div>

    //                 <div>
    //                     <label>Apellido: </label>
    //                     <input placeholder={user.user.last_name} name={"last_name"} type="text" value={userEdit.last_name} onChange={(e)=>handleChange(e)} />
    //                 </div>

    //                 <div>
    //                     <label>Nick: </label>
    //                     <input placeholder={user.user.nick} name={"nick"} type="text" value={userEdit.nick} onChange={(e)=>handleChange(e)} />
    //                 </div>
    //                 <div>
    //                     <label>Imagen: </label>
    //                     <img src={user.user.image} alt='' />
    //                     <input placeholder={user.user.image} name={"image"} type="text" value={userEdit.image} onChange={(e)=>handleChange(e)} />
    //                 </div>

    //                 <button type="submit" onClick={handleSubmit()}>Guardar</button>
    //                 <button>Cancelar</button>
    //             </form>
                
    //         </div>
            
    //         : 
    //         <p>No se encuantra Usuario ...</p>
    //     )

    // };

    // return (

    //     <div>
    //         <Navbar open={openIt}/>
    //         <PersonalContainer>
    //            <nav>
    //                 <button className="btn1" onClick={ticketClick}>Tickets</button> 
    //                 <button className="btn2" onClick={reviewClick}>Reviews</button>
    //                 <button className="btn3" onClick={eventClick}>Events</button>
    //                 <button className="btn3" onClick={setingsClick}>Setings</button>

    //             </nav>
    //             <section>
    //                 {Render}
    //             </section> 
    //         </PersonalContainer>
            
            
            
            
    //         <Modal isopen={isOpen} close={closeIt}/>
    //         {/* { ticketsPurchased.length > 0 ? 

    //             ticketsPurchased.map(e =>
                    
    //                 <div>
    //                     <p>Event: {e.ticket.event}</p> 
                    
        
    //                     { e.ticket.paymentMade === true ? <img src={e.QR} alt='' /> : <p>Pending Payment...</p>}
    //                 </div>
    //             ): 
    //             <p>No tickets</p>
                
    //         } */}
         

    //     </div>
        
    // )

};