import React from 'react'
import bannnerImagen from "../../img/Banner.jpg"
import './banner.css'
export const Banner = ({title}) => {
  return (
    <>
    <div className='image-container'>
        <img src={bannnerImagen} alt="Portada banner imagen" />
        <div className='overlay'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>  
    
    </>
  )
}
