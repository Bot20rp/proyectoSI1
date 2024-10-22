import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import 'font-awesome/css/font-awesome.min.css';
import './product-card.css';

export const ProductCard = ({ title, productItem }) => {
  const { addToCart } = useContext(CartContext);
  const router = useNavigate();

  const handleClick = () => {
    router(`/shop/${productItem.id}`);
  };

  const handleAdd = (productItem) => {
    addToCart(productItem, 1);
    toast.success("¡El producto ha sido añadido al carrito!");
  };

  return (
    <div className='product'>
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
        <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className='price'>
          <h4>Bs{productItem.price}</h4>
          <button className='add' aria-label='Add' onClick={() => handleAdd(productItem)}>
            <IoAddCircleOutline />
          </button>
        </div>
      </div>
    </div>
  );
};
