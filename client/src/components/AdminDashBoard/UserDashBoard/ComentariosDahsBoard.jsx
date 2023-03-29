import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, reviewUpdate } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import "./ComentariosDashBoard.css";

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
        <div className="cont428">
            <h1 className="tituloADB">Comentarios</h1>

            {reviews.length > 0 ? 
               

                reviews.map(e =>
               
                    <div className="cont429">
                        <div><h3 style={{'text-align' : 'center'}}>{e.title}</h3></div>
                        <div className="start1"><Rating readonly={true} initialValue={e.stars} /></div>
                        <p style={{'text-align' : 'center'}}>{e.text}</p>
                       
                        <div className='divBoton3'>

                            {e.reviewDelete ? <input className='btnPrice2' type={"button"} onClick={()=> handlePost(e.id)} value={"Publicar Comentario"}/> : <input className='btnPrice2' type={"button"}onClick={()=> handleDelete(e.id)} value={"Eliminar Comentario"}/>}
                            
                            <Link to={'/home/' + e.id}><input type={"button"} className='btnPrice2' value={"Ir a la publicacion"} /></Link>
                            
                        </div> 
                    </div>
                )
               
          

                :

                <p className="pTP">Usuario no dejo comentarios</p>

            }
        </div>
    )
};