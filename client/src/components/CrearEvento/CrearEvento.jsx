// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import {useForm } from 'react-hook-form'
import DatePicker, {registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';

import { useState} from 'react';
// import { Autocomplete } from '@react-google-maps/api';
import {useDispatch} from 'react-redux'
import { createEvent } from '../../Redux/actions';
import Modal from "react-modal";
import {GrClose} from 'react-icons/gr';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
// import './createEvent.css'
import "../createEvent/createEvent.css"
import { H1 } from '../Styles/Styles';
import { useAuth0 } from '@auth0/auth0-react';
import MensajeLogeo from '../MensajeLogeo/MensajeLogeo';
import "./CrearEvento.css"
import Navbar from '../Navbar/Navbar';

export default function CrearEvento () {
    registerLocale('es', es)
    const {register, setValue, handleSubmit, reset, formState: { errors }} = useForm()
    const [selectedDate, setSelectedDate] = useState(null);
    const [price, setPrice] = useState([]);
    const history = useHistory()
    const dispatch = useDispatch()
    const eventype = ["Rock", "Reggeaton", "Electronica", "Cumbia", "Tango", "Folklore", "Pop", "Art", "Ballet"]
    const user = useSelector(state => state.user)
    const { isAuthenticated } = useAuth0();

    const userId = Object.keys(user).length > 0 ? user.user.id : null
    // console.log("date",selectedDate)
    useEffect(() => {
        setValue('userId', userId)
    }, [setValue, userId])
      
    // setValue('userId', userId)

    
    const handleAddItem = (e) => {
        e.preventDefault();
        setPrice(prevPrice => [...prevPrice, { tipoDeTicket: '', precio: '' }]);
        setValue('price', prevPrice => [...prevPrice, { tipoDeTicket: '', precio: '' }]);

        console.log("precio", price)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

        const formattedDate2 = formattedDate.split(" ").reverse();
        formattedDate2.splice(1, 1);
        // console.log("date", formattedDate2.reverse().join(" ").replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()))
        const da ="Fecha " + formattedDate2.reverse().join(" ").replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase())

        setValue("date", da);
    }

    const onSubmit = (data) => {
        // console.log(data)
        dispatch(createEvent(data))
        reset()
        return history.push("/")
    }

    const priceform = price.map((item, index) => (
        <div   key={index}>
            <div className='form_box'>
                
                <input className='form_input' id='textTicketType'
                placeholder=' '
                name={`price[${index}].tipoDeTicket`}
                {...register(`price[${index}].tipoDeTicket`)}
                defaultValue={item.tipoDeTicket}
                />
                <label className='form_label' for="textTicketType">Tipo de Entrada</label>
            </div>
            <div className='form_box'>
                
                <input className='form_input' id='textPrice'
                placeholder=' '
                name={`price[${index}].precio`}
                {...register(`price[${index}].precio`)}
                defaultValue={item.precio}
                />
                <label className='form_label' for="textPrice">Precio de Entrada</label>
            </div>
            
        </div>
    ))
    
        //className='formcontainer'
    return (
        <div>


            <Navbar/>
            <div className='contenedor123'>

                
                <H1>Publicar Evento</H1>
                
                
                <div className='pe'>
                    <p>Completa el siguente formulario con los datos de tu evento. </p>
                </div>
                
                <div className='contenedorForm'>

                    <form autocomplete="off" onSubmit={handleSubmit(onSubmit)}>


                        <div className='form_box'>
                            
                            <input className='form_input' id='textName' placeholder=' ' type="text" {...register('name', {
                            required: true,
                            })} />
                            <label className='form_label' for="textName" >Nombre</label>
                            {errors.name && <span className='errorC'>Este campo es obligatorio</span>}
                        </div>

                        <div className='form_box'>

                            <input className='form_input' id='textImage' placeholder=' ' type="text" {...register('image', { required: true })} />
                            <label className='form_label' for="textImage">URL Imagen</label>
                            {errors.image && <span className='errorC'>Este campo es obligatorio</span>}
                        </div>    
                    
                        <div className='form_box'>

                            <DatePicker 
                            
                            className='form_input_date'
                            name="date"
                            {...register('date', { required: true })}
                            placeholderText='Fecha del Evento '
                            selected={selectedDate}
                            onChange={handleDateChange}
                            withPortal
                            locale="es"/>
                            
                            {selectedDate ? <label className='form_label_date' for="textDate">Fecha</label> : null}
                            {errors.date && <span className='errorC'>Este campo es obligatorio</span>}
                        </div>    

                        <div className='form_box'>

                            
                            <input className='form_input' id='textLocation' placeholder=' ' type="text" {...register('location', { required: true })} />
                            <label className='form_label' for="textLocation">Ubicacion</label>
                            {errors.location && <span className='errorC'>Este campo es obligatorio</span>}
                        </div>

                        <div className='form_box_select'>
                            
                            <select className='form_input' name="" id="">
                                <option value="" selected disabled>seleccionar genero</option>
                                {eventype.map((type, i) => {
                                    return <option key={i} value={type} {...register('typeEvent.genre', {required: true})}>{type}</option>
                                })}
                            </select>
                            <label className='form_label'>Genre</label>
                            {errors.typeEvent && <span className='errorC'>Este campo es obligatorio</span>}
                        </div>
                        
                        <div className='form_box'>
                            
                            <textarea className='form_input' id='textDescription' placeholder=' ' type="text" {...register('description')}></textarea>
                            <label className='form_label' for="textDescription">Description</label>
                        </div>
        
                        {priceform.length > 0 ? null :
                            
                            <div className='form_box'>

                                <button className='btnPrice' onClick={handleAddItem}>Precio de Entrada</button>
                            </div>
                        }
                            
                        {priceform}

                        <div className='form_box'>

                            <input className='btnPrice' type="submit" value='Publicar'/>
                        </div>
                        {/*<button className='btnPrice' type='submit'>Publicar</button>*/}
                    
                    </form>
                </div>
                
            </div>
        </div>
        
    )
};