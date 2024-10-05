import React from 'react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import './Section.css'; // Asegúrate de crear este archivo CSS

export const Section = ({ title, bgColor, productItems }) => {
  return (
    <section style={{ background: bgColor }} className="section">
      <div className="container">
        <div className="heading">
          <h1>{title}</h1>
        </div>
        <div className="fila">
          {productItems.map((productItem) => {
            return (
              <ProductCard
                key={productItem.id}
                title={title}
                productItem={productItem}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};