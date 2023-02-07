import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../../Redux/actions";
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil";
import Navbar from "../../Navbar/Navbar";
import { Carousel } from "react-responsive-carousel";
import { Rating } from "react-simple-star-rating";




export default function ReviewsPerfil (){

    const dispatch = useDispatch();
    const user = useSelector((state => state.user))
    const reviews = useSelector(state => state.userReviews)

    const userId = Object.keys(user).length > 0 ? user.user.id : null

    useEffect(()=> {
        if(userId !== null){

            dispatch(getUserReviews(userId))
        }
        
    },[dispatch, userId]);



    return (

        <div>
            <Navbar/>
            <NavBarPerfil/>

            {reviews.length > 0 ? 
                <Carousel>

                    {reviews.map(e =>
                    
                        <div>
                            <h3 style={{'text-align' : 'center'}}>{e.title}</h3>
                            <Rating readonly={true} initialValue={e.stars} />
                            <p style={{'text-align' : 'center'}}>{e.text}</p>
                        </div>
                    )}
                    
                </Carousel>

                :

                <p>No Reviews</p>

            }

        </div>
        
    )
        
};