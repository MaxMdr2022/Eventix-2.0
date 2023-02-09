import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../../Redux/actions";
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil";
import Navbar from "../../Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import { Rating } from "react-simple-star-rating";
import { reviewUpdate } from "../../../Redux/actions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import MensajeLogeo from "../../MensajeLogeo/MensajeLogeo";
import UserBanned from "../../UserBanned/UserBanned";

export default function ReviewsPerfil (){

    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth0();
    const user = useSelector((state => state.user));
    const reviews = useSelector(state => state.userReviews);
    // console.log("reviews", reviews);
    const reviewFilter = reviews.filter(e=> !e.reviewDelete);
    const userId = Object.keys(user).length > 0 ? user.user.id : null

    useEffect(()=> {
        if(userId !== null){

            dispatch(getUserReviews(userId))
        }
        
    },[dispatch, userId]);

    function handleDelete (id){
        // e.preventDefault();
        dispatch(reviewUpdate(id, {reviewDelete: true}));
        alert("Comentario Eliminado");
        window.location.reload();
    };

    if(!isAuthenticated){
        return(
            <div>
                <MensajeLogeo />
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
            <NavBarPerfil/>

            <h2> 🤓 Mis Comentarios 🤪</h2>
            {reviewFilter.length > 0 ? 
               

                reviewFilter.map(e =>
                
                    <div>
                        <h3 style={{'text-align' : 'center'}}>{e.title}</h3>
                        <Rating readonly={true} initialValue={e.stars} />
                        <p style={{'text-align' : 'center'}}>{e.text}</p>
                        <Link to={'/home/' + e.eventId}>Ir a la publicacion</Link>
                        <button onClick={()=> handleDelete(e.id)}>Eliminar Comentario</button>
                    </div>
                )

                :

                <p>No Reviews</p>

            }

        </div>
        
    )
        
};


// reviews:

// eventId: "670dc820-ebd6-47c4-b636-faabfdedf663"
// id: "e41e873f-a1b4-45c5-88bd-c18f5823ccc5"
// stars: 3
// text:"maximeder18"
// title: "sdfzdfsv"
// userId: "e21efdff-c8c9-4582-8e8d-9da506702c28"