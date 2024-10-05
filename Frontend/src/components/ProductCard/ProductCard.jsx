import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext'; // Importar el contexto
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import './product-card.css';

export const ProductCard = ({ title, productItem }) => {
  const { addToCart } = useContext(CartContext); // Usar el contexto
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handleAdd = (productItem) => {
    addToCart(productItem, 1); // Llamar a la función del contexto
    toast.success("¡El producto ha sido añadido al carrito!");
  };

  return (
    <div className='product container'>
      {title === "Combos" ? (
        <span className='discount'>{productItem.discount} Combo 2x1</span>
      ) : null}
      
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.imgUrl}
        alt="imagen del producto"
      />
      
      <div className='product-like'>
        <CiHeart />
      </div>
      
      <div className='product-details'>
        <h3 onClick={handleClick}>{productItem.productName}</h3>
        <div className='rate'>
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className='price'>
          <h4>${productItem.price}</h4>
          <button className='add' aria-label='Add' onClick={() => handleAdd(productItem)}>
            <IoAddCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
};
