import React, { memo, useEffect } from 'react';
import {ProductCard} from '../ProductCard/ProductCard';
import './ShopList.css'; // Asegúrate de crear e importar el archivo CSS

export const ShopList = ({ productItems }) => {
  useEffect(() => {}, [productItems]);

  if (productItems.length === 0) {
    return <h1 className='not-found'>Producto no encontrado!!!!!</h1>;
  }

  return (
    <div className='shop-list'>
      {productItems.map((productItem) => (
        <ProductCard
          key={productItem.id}
          title={null}
          productItem={productItem}
        />
      ))}
    </div>
  );
};

export default memo(ShopList);