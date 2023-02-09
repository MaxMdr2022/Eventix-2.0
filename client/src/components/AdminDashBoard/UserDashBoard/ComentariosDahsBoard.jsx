import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, reviewUpdate } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";


export default function ComentariosDashBoard ({idUser}) {

    const dispatch = useDispatch()
    const reviews = useSelector(s => s.userReviews);

    useEffect(()=> {
        if(idUser !== null){

            dispatch(getUserReviews(idUser))
        }
        
    },[dispatch, idUser]);


    function handleDelete (id){
        // e.preventDefault();

        // console.log("averrr", id)
        dispatch(reviewUpdate(id, {reviewDelete: true}));
        alert("Comentario Eliminado");
        window.location.reload();
    };

    function handlePost (id){
        // e.preventDefault();
        dispatch(reviewUpdate(id, {reviewDelete: false}));
        alert("Comentario publicado");
        window.location.reload();
    };

    return(
        <div>
            <h1>Comentarios</h1>

            {reviews.length > 0 ? 
               

                reviews.map(e =>
               
                    <div>
                        <h3 style={{'text-align' : 'center'}}>{e.title}</h3>
                        <Rating readonly={true} initialValue={e.stars} />
                        <p style={{'text-align' : 'center'}}>{e.text}</p>
                        <Link to={'/home/' + e.eventId}>Ir a la publicacion</Link>
                        {e.reviewDelete ? <button onClick={()=> handlePost(e.id)}>Publicar</button> : <button onClick={()=> handleDelete(e.id)}>Eliminar</button>}
                    </div>
                )
               
          

                :

                <p>Usuario no dejo comentarios</p>

            }
        </div>
    )
};