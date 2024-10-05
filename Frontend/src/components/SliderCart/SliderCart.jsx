import React from 'react'
import './SliderCart.css'
/* pasamos las props .. osea este es el padre ... y el que lo recibe es el hijo y el hijo usara la base de datos 
 */
export const SliderCart = ({title , desc , cover}) => {
  return (
    <>
    {/* este es el div container  */}
    <div className='slider-container  box'>
      <div className='fila '>
        <div className='col'>
            <h1 >{title}</h1>
            <p>{desc}</p>
            <button className='btn-primary'>Visitanos</button>
        </div>
        <div className='col'>
            <img src={cover} alt="#" />
        </div>
      </div>
    </div>
    
    </>
  )
}
