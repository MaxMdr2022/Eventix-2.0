import React, {useEffect, useState} from 'react'
import { Rating } from 'react-simple-star-rating'
import { H5, FormReview, H1 } from '../Styles/Styles'
import {useForm, } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createReview } from '../../Redux/actions'
import {useSelector} from 'react-redux'
import "./createReview.css"

export default function Review({event, updateComponent}) {
    const dispatch = useDispatch();
    const {register, setValue, handleSubmit, reset} = useForm();
    
    const user = useSelector(state => state.user)

    const userId = Object.keys(user).length > 0 ? user.user.id : null


    const [stars, setStars] = useState(0);
    
    useEffect(() => {
        setValue('userId', userId)
        setValue('stars', stars)
        setValue('eventName', event)
    }, [stars, event, setValue, userId])
    
    
    //Catch Rating Value
    const handleRating = (rate) => {
        setStars(rate);
        
    }
    const handleReset = (e) => {
        // Set the initial value
        e.preventDefault();
        setStars(0);
        reset();
      }
    
    const onSubmit = (data) => {
        e.preventDefault();
        console.log("createReview component....",data)
        dispatch(createReview(data))
        reset()
        setStars(0)
        updateComponent(true)
        window.location.reload();
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

        <h1 className='OpiDE'>Opiniones del evento</h1>
        

        <div className='form_box posCR'>
                            
            <input className='form_input' id='textName' placeholder=' ' type="text" {...register('title')} />
            <label className='form_labelCR' for="textName" >Titulo</label>
        
        </div>
        

        <div className='estrellasP'>
            <Rating initialValue={stars} onClick={handleRating} allowFraction={true} transition={true}/>
        </div>
        
        <div className='form_box posCR'>
                            
            <textarea className='form_input' id='textDescription' placeholder=' ' type="text" {...register('text')}></textarea>
            <label className='form_labelCR' for="textDescription">Description</label>
        </div>

        <div className='form_box posF'>

            <input className='btnPrice ' type="submit" value='Enviar'/>
            <input className='btnPrice' onClick={handleReset} type="submit" value='Cancelar'/>
        </div>
    </form>
  )
}
