import React from 'react'
import { H1, H5 } from '../Styles/Styles';
import { Rating } from 'react-simple-star-rating';
// import {Carousel} from 'react-responsive-carousel'
import {Carousel} from 'react-responsive-carousel'
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { reviewUpdate } from '../../Redux/actions';

export default function Reviews({reviews}) {

  const dispatch = useDispatch()
  const user = useSelector(s => s.user);

  const idUsuario = user.user?.id;
  const admin = user.user?.isAdmin;

  // console.log("review", reviews)

  function handleDelete (id){
    // e.preventDefault();
    dispatch(reviewUpdate(id, {reviewDelete: true}));
    alert("Comentario Eliminado");
    window.location.reload();
  };

  if(reviews !== null) {

    const reviewFilter = reviews.filter(e => !e.reviewDelete)

    return (
    <div>
        <H1>Comentarios</H1>
        
          {
           reviewFilter.length > 0 ?
          <Carousel> 
          {reviewFilter.map((review) => {
            return (
                <div key={review.id}>
                    <h3>{review.title}</h3>
                    <Rating readonly={true} initialValue={review.stars} />
                    <p>{review.text}</p>

                    <div className='form_box posCR'>

                    {idUsuario === review.userId || admin ?<input className='btnPrice' onClick={()=> handleDelete(review.id)} type="submit" value='Eliminar Comentario'/>: null}
                    </div>
                </div>
            )
            
           })} 
           </Carousel>
           : <H5 className='posCR' >Este evento no tiene comentarios</H5>
        }
        
        
    </div>
  )

  } else {
    return <Loading/>
  }
}

// reviews:

// eventId: "670dc820-ebd6-47c4-b636-faabfdedf663"
// id: "e41e873f-a1b4-45c5-88bd-c18f5823ccc5"
// stars: 3
// text:"maximeder18"
// title: "sdfzdfsv"
// userId: "e21efdff-c8c9-4582-8e8d-9da506702c28"
// reviewDelete:false