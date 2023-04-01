import React, { useEffect, useState }from 'react';
import { searchEventById } from '../../Redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import {  useHistory, useParams } from 'react-router-dom';
import Map from '../Map/Map';
import { payCrypto } from '../../Redux/actions';
import Modal from 'react-modal';
import "./Detail.css";
import Review from '../Reviews/createReview';
import Reviews from '../Reviews/Reviews';
import { Rating } from 'react-simple-star-rating';
import { DetailContainer, DetailEvent, BuyEvent} from '../Styles/Styles';
import Navbar from '../Navbar/Navbar'
import {FcPlus} from 'react-icons/fc'
import { useAuth0 } from '@auth0/auth0-react';


export default function Detail() {

  const eventShowed = useSelector(state => state.events);
  const url = useSelector( s => s.payCryptoURL);
  const userId = useSelector(s => s.user);
  // console.log("userid detaill", userId)
  const { isAuthenticated } = useAuth0();
  
  const history = useHistory()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [reload, setReload] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(false);
  const [info, setInfo] = useState({tipoTicket: "", precio:0 })

  const updateComponent = (message) => {
    setReload(message)
  }

  // console.log(reload)
  useEffect(() => {
    dispatch(searchEventById(id))
    setReload(false)
  }, [id, reload, dispatch])

  function handleBack() {
    eventShowed.shift()
    return history.goBack()
  }

  function submitData (e){

    console.log("eeeeee", e)
    if(e.precio === "Entrada Liberada"){

      return history.push("/");
    };

    let arr = [];

    arr.push( e.tipoDeTicket, "$ "+ e.precio,"cantidad: "+ cantidad + " ticket", eventShowed[0].date[0],"Ubicacion: "+ eventShowed[0].location)

    if(arr.join(" ").length > 200 ){

      arr = [];

      arr.push(  "$ "+ e.precio,"cantidad: "+ cantidad + " ticket", eventShowed[0].date[0])
    };


    // console.log(arr.join(" ").length);

    const datosPago = {
      
      total: (Number(e.precio) * cantidad / 400).toPrecision(3),
      name: eventShowed[0].name,
      description: arr.join(" "),
      typeTicket: e.tipoDeTicket,
      price: e.precio,
      cantidad: cantidad,
      // img: eventShowed[0].image,
      // user:
      id_user: userId.user.id
    };

    setInfo({
      tipoTicket: e.tipoDeTicket,
      precio: e.precio 
    });

    openModal();

    return dispatch(payCrypto(datosPago));

  };

  function buttonRest (){
    
    if(cantidad > 1){
      return setCantidad(cantidad - 1);
    };
  };

  function buttonSum (){

    return setCantidad( cantidad +1);
  };

  function openModal() {
    setIsOpen(true);
    timer();
  };

  function closeModal() {
    setIsOpen(false);
  };

  function timer() {setTimeout(function (){

    setIndex(true)
   
  }, 5000)};

  
  return (
    <div>

      <Navbar/>


      <div className='contGrid209'>
        
       


        <div className='eventD'>

          <h1>{eventShowed.length ? eventShowed[0].name : null}</h1> 
          <div className='imgD'>
            <img  src={eventShowed.length ? eventShowed[0].image : null} alt= ""/>
          </div>
          <Rating readonly={true} initialValue={eventShowed.length ? Math.round(eventShowed[0].rating) : null}/>
          <p>Ubicacion: {eventShowed.length ? eventShowed[0].location : null}</p>
          <div>
            <p> {eventShowed[0]?.description}</p>
          </div>

        </div>


        <div className='ticketD'>

          {isAuthenticated ? <h1>Compra tu entrada</h1> : <h1>Inicia sesión para comprar una entrada</h1>}
            
          {
              
            eventShowed[0] ? eventShowed[0].price.map((e, i) => 
              <div className='eventShowed1' key={i}>
                
                <p>Tipo de Ticket: {e.tipoDeTicket}</p>
                {e.precio === "Entrada Liberada" ? <p>Precio: Gratis</p> :<p>Precio: ${Number(e.precio) * cantidad} | U$D {(Number(e.precio) * cantidad / 400).toPrecision(3)}</p>}
                
                <div className='contBotonesP'>

                {isAuthenticated ? <button className='btn1' onClick={()=>submitData(e)}>comprar</button>  : null}
                  <input className='btnPrice' type={"button"} hidden={cantidad > 1 ? false : true} onClick={()=>buttonRest()} value={"-"}/>
                  <input className='btnPrice' type={"button"} onClick={()=>buttonSum()} value={"+"}/>
                  {cantidad > 1 ? <span> {cantidad} Tickets</span>: <span> {cantidad} Ticket</span>}
                </div>
              </div>
            ) : 
            <p>Tickets Sold Out  :´(</p>
          }
          

        </div>



        <div className='mapD'>
          <Map direction={eventShowed.length ? eventShowed[0].location : null}/>
        </div>
          
        <div className='reviewD'>

          {isAuthenticated ? <Review updateComponent={updateComponent} event={eventShowed.length ? eventShowed[0].name : null}/> : null}
        </div>
        

      </div>

      <Reviews reviews={eventShowed.length ? eventShowed[0].reviews : null}/>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">

        <div className='modal' >

          <h2>Eventix</h2>
          <h3>{eventShowed[0]?.name}</h3>
          <p>Tipo de Ticket: {info.tipoTicket}</p>
          {cantidad > 1 ? <span> {cantidad} Tickets</span>: <span> {cantidad} Ticket</span>}
          <p>ARS$ {info.precio * cantidad}</p>
          <p>US$ {Number(info.precio) * cantidad / 400}</p>
          <p>Usted sera redirigido a la pasarela de pago de Coinbase</p>

          { 
            index? <div>

            <a href={`${url}`}><button>Comprar Entrada</button></a>
            <button onClick={closeModal}>Cancelar</button>
    
            </div> : <p>Generando Link de Pago</p>

          }

        </div>
          
      </Modal>   

    </div>
    
  )
};
{/* <input className='btnPrice' type={"button"} name={"btnCompra"} onClick={(e)=>submitData(e)} value={"Comprar"}/> */}