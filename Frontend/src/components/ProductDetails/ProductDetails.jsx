import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext'; // Importar el contexto
import { toast } from 'react-toastify';
import './productDetails.css';
import { FaStar } from "react-icons/fa";
import 'font-awesome/css/font-awesome.min.css';
export const ProductDetails = ({ selectedProduct }) => {
  const { addToCart } = useContext(CartContext); // Usar el contexto
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAdd = () => {
    addToCart(selectedProduct, quantity); // Llamar a la función del contexto
    toast.success("¡El producto ha sido añadido al carrito!");
  };

  return (
    <section className='product-page'>
      <div className='container'>
        <div className='fila'>
          <div className='col'>
            <img loading='lazy' src={selectedProduct?.imgUrl} alt="detalle del producto" />
          </div>
          <div className='col2'>
            <h2>{selectedProduct?.productName}</h2>
            <div className='rate'>
              <div className='stars'>
              <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgrating} calificaciones</span>
            </div>
            <div className='info'>
              <span>categoría: {selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.shortDesc}</p>
            <input
              type="number"
              className='qty-input'
              value={quantity}
              onChange={handleQuantity}
              min="1"
            />
            <button aria-label='Add' className='add' onClick={handleAdd}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
