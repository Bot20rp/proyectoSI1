import React from 'react'
import { RotatingLines } from 'react-loader-spinner';
import './loader.css'
export const Loader = () => {
  return (
    <>
    <div className='spinner-container'>

     <RotatingLines
  visible={true}
  /* height="96"
  width="96" */
  color="#0f3460"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
    </div>

    
    </>
  )
}
