import React from 'react'
import { Sliders } from '../components/SliderCart/Sliders'
import {Wrapper} from '../components/wrapper/Wrapper'
import {Section} from '../components/section/Section'
import { products,discoutProducts } from '../utils/products'
export const Home = () => {
const nuevosprodutcos = products.filter(
  (productoo)=> productoo.category === 'Licores' || productoo.category === 'Vinos' 
)
  const productocervesa = products.filter((productoo)=> productoo.category === 'Cervezas')
  return (
    <>
      <Sliders/>
      <Wrapper/>
      <Section
        title = 'Productos en Promociones'
        bgColor='#f6f9fc'
        productItems={discoutProducts}
      />


<Section
        title = 'Productos nuevos'
        bgColor='white'
        productItems={nuevosprodutcos}
      />


<Section
        title = 'cervezas'
        bgColor='#f6f9fc'
        productItems={productocervesa}
      />
    </>
  )
}
