import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBarPerfil from "../NavBarPerfil/NavBarPerfil";
import Navbar from "../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { getUserEvents } from "../../../Redux/actions";

export default function Eventos (){


    const dispatch = useDispatch();
    const user = useSelector((state => state.user))
    const events = useSelector(state => state.userEvents)


    const userId = Object.keys(user).length > 0 ? user.user.id : null

    useEffect(()=> {
        if(userId !== null){

            dispatch(getUserEvents(userId))

        }
        
    },[dispatch, userId]);



    return (

        <div>
            <Navbar/>
            <NavBarPerfil/>

            {events.length > 0 ?

                <div style={{display : 'flex'}}>
                    
                    {events.map(e =>

                    <Link to={'/home/' + e.id}>
                        <div>
                            <img src={e.image} alt="" styles={{'border-radius' : '10px', 'margin-left' : '3vw'}} width={278} height={300}/>
                            <h3>{e.name}</h3>
                        </div>
                    </Link>
                    
                    )}
                    
                </div>
                : 
                <p>No events</p>

            }

        </div>
        
    )
        
}